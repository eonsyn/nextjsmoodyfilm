"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for search term
const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("searchTerm") || ""
      : "";
  });

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
