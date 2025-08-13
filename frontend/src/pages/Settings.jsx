import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const { theme, toggleTheme, colorScheme, setColorScheme } = useTheme();

  const colorOptions = ['default', 'ocean', 'sunset', 'forest', 'cosmic', 'cherry'];

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div>
        <h2 className="font-semibold mb-2">Theme Mode</h2>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>

      <div>
        <h2 className="font-semibold mb-2 mt-6">Color Scheme</h2>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => setColorScheme(color)}
              className={`w-12 h-12 rounded-full border-2 ${
                colorScheme === color ? 'border-primary' : 'border-gray-300'
              }`}
              style={{ backgroundColor: `var(--color-scheme-${color})` }}
              aria-label={`Select ${color} color scheme`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
