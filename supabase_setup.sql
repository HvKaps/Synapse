-- Exécutez ce script dans le **SQL Editor** de votre tableau de bord Supabase

-- 1. Table Profiles (Utilisateurs et Rôles)
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name text,
  last_name text,
  role text CHECK (role IN ('entreprise', 'apporteur', 'freelance', 'admin')),
  company_name text,
  siret text,
  iban text,
  avatar_seed text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table Projects (Missions/Contrats et Escrow)
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  company_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  apporteur_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  freelance_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  budget numeric NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'matched', 'active', 'pending_verification', 'completed', 'disputed')),
  escrow_secured boolean DEFAULT false,
  hours_tracked numeric DEFAULT 0,
  max_hours numeric DEFAULT 35,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table Messages (Messagerie Inbox)
CREATE TABLE messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id text NOT NULL, -- Format: 'dm_freelance_xxx' ou 'proj_yyy'
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  text text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table Notifications (Historique Cloche)
CREATE TABLE notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text,
  type text CHECK (type IN ('success', 'error', 'info', 'escrow')),
  read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies (Permet la lecture/écriture publique pour le prototype afin d'éviter les soucis RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all actions for authenticated users" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Enable read for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable insert/update for involved parties" ON projects FOR ALL USING (true);
CREATE POLICY "Enable messages for involved parties" ON messages FOR ALL USING (true);
CREATE POLICY "Enable notifications for user" ON notifications FOR ALL USING (auth.uid() = user_id);
