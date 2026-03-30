import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialFreelances, initialProjects, initialApporteurs, initialCompanies, initialMessages } from './mockDataSeed';

const DataContext = createContext(null);

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  // Use localStorage as the database to share state across roles (mocking backend)
  const getInitialState = (key, defaultData) => {
    const saved = localStorage.getItem(`bni_data_${key}`);
    if (saved) return JSON.parse(saved);
    return defaultData;
  };

  const [freelances, setFreelances] = useState(() => getInitialState('freelances', initialFreelances));
  const [projects, setProjects] = useState(() => getInitialState('projects', initialProjects));
  const [apporteurs, setApporteurs] = useState(() => getInitialState('apporteurs', initialApporteurs));
  const [companies, setCompanies] = useState(() => getInitialState('companies', initialCompanies));
  const [messages, setMessages] = useState(() => getInitialState('messages', initialMessages));
  const [notifications, setNotifications] = useState(() => getInitialState('notifications', []));

  // Sync to local storage on change
  useEffect(() => { localStorage.setItem('bni_data_freelances', JSON.stringify(freelances)); }, [freelances]);
  useEffect(() => { localStorage.setItem('bni_data_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('bni_data_apporteurs', JSON.stringify(apporteurs)); }, [apporteurs]);
  useEffect(() => { localStorage.setItem('bni_data_companies', JSON.stringify(companies)); }, [companies]);
  useEffect(() => { localStorage.setItem('bni_data_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('bni_data_notifications', JSON.stringify(notifications)); }, [notifications]);

  // Global actions
  const addNotification = (notif) => {
    setNotifications(prev => [{ id: Date.now(), timestamp: new Date().toISOString(), read: false, ...notif }, ...prev]);
  };

  const updateProjectStatus = (projectId, newStatus) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: newStatus } : p));
  };

  return (
    <DataContext.Provider value={{
      freelances, setFreelances,
      projects, setProjects, updateProjectStatus,
      apporteurs, setApporteurs,
      companies, setCompanies,
      messages, setMessages,
      notifications, setNotifications, addNotification
    }}>
      {children}
    </DataContext.Provider>
  );
};
