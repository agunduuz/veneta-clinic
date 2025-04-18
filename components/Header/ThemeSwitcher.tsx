'use client';
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full hover:bg-muted transition-colors duration-200 text-accent-foreground'
      aria-label='Toggle theme'
    >
      {isDark ? (
        <Sun className='w-5 h-5' />
      ) : (
        <Moon className='w-5 h-5' />
      )}
    </button>
  );
};
