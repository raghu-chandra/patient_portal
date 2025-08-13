import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'MS Dhoni',
    email: 'MS.Dhoni@gmail.com',
    joinDate: new Date().toISOString(),
    allergies: [],
    medications: [],
  });

  const [isAuthenticated] = useState(true); // For demo purposes

  useEffect(() => {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
