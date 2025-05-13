import React, { createContext, useContext, ReactNode } from 'react';

export type Language = {
  code: string;
  name: string;
  flag: string;
};

// Just keeping English as the only language
const defaultLanguage: Language = { code: 'en', name: 'English', flag: '🇬🇧' };

type LanguageContextType = {
  currentLanguage: Language;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LanguageContext.Provider value={{ currentLanguage: defaultLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
