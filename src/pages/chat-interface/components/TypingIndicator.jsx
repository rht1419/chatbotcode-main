import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = ({ character, mode }) => {
  const getCharacterConfig = (characterId) => {
    const configs = {
      heart: {
        name: 'Heart',
        icon: 'Heart',
        color: 'text-red-500',
        bgColor: 'bg-red-50'
      },
      liver: {
        name: 'Liver',
        icon: 'Shield',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50'
      },
      stomach: {
        name: 'Stomach',
        icon: 'Zap',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50'
      },
      skin: {
        name: 'Skin',
        icon: 'Sun',
        color: 'text-pink-500',
        bgColor: 'bg-pink-50'
      },
      kidney: {
        name: 'Kidney',
        icon: 'Droplets',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50'
      }
    };
    return configs?.[characterId] || configs?.heart;
  };

  const getLifestyleConfig = () => ({
    name: 'Lifestyle Coach',
    icon: 'Sparkles',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  });

  const config = mode === 'lifestyle' ? getLifestyleConfig() : getCharacterConfig(character);

  return (
    <div className="flex items-start space-x-3 mb-4">
      {/* Character Avatar */}
      <div className={`
        w-10 h-10 rounded-full ${config?.bgColor} 
        flex items-center justify-center flex-shrink-0
        animate-pulse-gentle
      `}>
        <Icon 
          name={config?.icon} 
          size={18} 
          className={config?.color}
        />
      </div>
      {/* Typing Animation */}
      <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-heading font-semibold text-sm text-foreground">
            {config?.name}
          </span>
          <span className="font-caption text-xs text-muted-foreground">
            is typing...
          </span>
        </div>
        
        <div className="bg-muted rounded-bubble px-4 py-3 shadow-subtle">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="font-caption text-xs text-muted-foreground ml-2">
              Thinking...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;