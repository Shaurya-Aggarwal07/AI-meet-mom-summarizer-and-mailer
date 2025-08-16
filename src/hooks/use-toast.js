"use client";

import { useState, useCallback } from 'react';

const TOAST_TIMEOUT = 3000;

const useToast = () => {
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

  return { toast, dismiss, toasts };
};

export { useToast };
