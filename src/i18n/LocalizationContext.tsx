import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { translations, Translations } from './translations';
import { storageService } from '../services/storage.service';

interface LocalizationContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  formatCurrency: (amount: number) => string;
  formatDate: (dateStr: string, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (timeStr: string) => string;
  formatNumber: (num: number) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => storageService.getLanguage());

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<SupportedLanguage>;
      if (customEvent.detail) {
        setLanguageState(customEvent.detail);
      }
    };
    window.addEventListener('language-change', handleLangChange);
    return () => window.removeEventListener('language-change', handleLangChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    storageService.setLanguage(lang);
  };

  const t = translations[language] || translations.en;

  const getLocaleTag = (): string => {
    switch (language) {
      case 'te': return 'te-IN';
      case 'hi': return 'hi-IN';
      case 'en':
      default: return 'en-IN';
    }
  };

  const formatCurrency = (amount: number): string => {
    try {
      const locale = getLocaleTag();
      // Using standard Indian currency format: ₹1,250
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const formatDate = (dateStr: string, options?: Intl.DateTimeFormatOptions): string => {
    try {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      
      const locale = getLocaleTag();
      const defaultOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        ...options
      };
      return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string): string => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);
    if (isNaN(h) || isNaN(m)) return timeStr;

    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    const displayM = m < 10 ? `0${m}` : m;
    return `${displayH}:${displayM} ${ampm}`;
  };

  const formatNumber = (num: number): string => {
    try {
      return new Intl.NumberFormat(getLocaleTag()).format(num);
    } catch {
      return num.toString();
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatCurrency,
        formatDate,
        formatTime,
        formatNumber
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
