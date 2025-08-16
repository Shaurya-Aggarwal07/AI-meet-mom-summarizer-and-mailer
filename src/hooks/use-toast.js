"use client";

import { createContext, useContext, useState, useCallback } from 'react';

const TOAST_TIMEOUT = 3000;

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = "default", duration = TOAST_TIMEOUT }) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant }]);
    
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
    
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { useToast };
