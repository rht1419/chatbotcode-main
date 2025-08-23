import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ModeToggle = ({ 
  currentMode = 'organs', 
  onModeChange = () => {},
  className = '' 
}) => {
  const modes = [
    {
      id: 'organs',
      label: 'Organs Chat',
      description: 'Chat with organ personalities',
      icon: 'Heart',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'lifestyle',
      label: 'Lifestyle Chat',
      description: 'Get lifestyle coaching',
      icon: 'Sparkles',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const handleModeChange = (modeId) => {
    if (modeId !== currentMode) {
      onModeChange(modeId);
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Desktop Toggle */}
      <div className="hidden sm:flex bg-muted rounded-bubble p-1">
        {modes?.map((mode) => (
          <Button
            key={mode?.id}
            variant={currentMode === mode?.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleModeChange(mode?.id)}
            className={`
              rounded-bubble transition-smooth px-4 py-2
              ${currentMode === mode?.id 
                ? 'bg-background shadow-subtle' 
                : 'hover:bg-background/50'
              }
            `}
          >
            <Icon 
              name={mode?.icon} 
              size={16} 
              className={`mr-2 ${currentMode === mode?.id ? mode?.color : 'text-muted-foreground'}`}
            />
            <span className="font-body font-medium text-sm">
              {mode?.label}
            </span>
          </Button>
        ))}
      </div>
      {/* Mobile Dropdown */}
      <div className="sm:hidden relative">
        <select
          value={currentMode}
          onChange={(e) => handleModeChange(e?.target?.value)}
          className="
            appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8
            font-body font-medium text-sm text-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
            transition-smooth
          "
        >
          {modes?.map((mode) => (
            <option key={mode?.id} value={mode?.id}>
              {mode?.label}
            </option>
          ))}
        </select>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
      {/* Mode Indicator */}
      <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
        <div className={`w-2 h-2 rounded-full ${modes?.find(m => m?.id === currentMode)?.bgColor}`} />
        <span className="font-caption text-xs text-muted-foreground">
          {modes?.find(m => m?.id === currentMode)?.description}
        </span>
      </div>
    </div>
  );
};

export default ModeToggle;