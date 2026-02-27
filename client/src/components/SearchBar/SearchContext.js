import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [statusTerm, setStatusTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, locationTerm, setLocationTerm, statusTerm, setStatusTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
