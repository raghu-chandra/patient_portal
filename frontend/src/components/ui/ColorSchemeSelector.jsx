import React from 'react';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';

const ColorSchemeSelector = ({ onClose }) => {
  const { colorScheme, setColorScheme } = useTheme();

  const colorSchemes = [
    { id: 'default', name: 'Purple Dream', colors: ['#8B5CF6', '#A78BFA'] },
    { id: 'ocean', name: 'Ocean Blue', colors: ['#0EA5E9', '#38BDF8'] },
    { id: 'sunset', name: 'Sunset Orange', colors: ['#F97316', '#FB923C'] },
    { id: 'forest', name: 'Forest Green', colors: ['#10B981', '#34D399'] },
    { id: 'cosmic', name: 'Cosmic Pink', colors: ['#EC4899', '#F472B6'] },
    { id: 'cherry', name: 'Cherry Red', colors: ['#EF4444', '#F87171'] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative w-full max-w-md mx-4 p-6 bg-card/95 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Choose Color Theme</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => setColorScheme(scheme.id)}
              className="relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105"
              style={{
                borderColor: colorScheme === scheme.id ? scheme.colors[0] : 'transparent',
                background: `linear-gradient(135deg, ${scheme.colors[0]}, ${scheme.colors[1]})`,
              }}
            >
              <div className="text-center">
                <div className="text-white font-medium text-sm mb-1">{scheme.name}</div>
                {colorScheme === scheme.id && (
                  <Check className="h-4 w-4 text-white mx-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Color theme will be applied throughout the application
        </p>
      </Card>
    </div>
  );
};

export default ColorSchemeSelector;
