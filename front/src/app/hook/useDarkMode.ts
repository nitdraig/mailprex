"use client";
import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode, mounted]);

  return { darkMode, setDarkMode };
};
