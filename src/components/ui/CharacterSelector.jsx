import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CharacterSelector = ({ 
  selectedCharacter = 'heart',
  onCharacterChange = () => {},
  isVisible = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const characters = [
    {
      id: 'heart',
      name: 'Heart',
      personality: 'Passionate & Caring',
      icon: 'Heart',
      emoji: '❤️',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      description: 'Your cardiovascular health guide'
    },
    {
      id: 'liver',
      name: 'Liver',
      personality: 'Wise & Protective',
      icon: 'Filter',
      emoji: '🧽',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Your detox and metabolism expert'
    },
    {
      id: 'stomach',
      name: 'Stomach',
      personality: 'Energetic & Friendly',
      icon: 'Apple',
      emoji: '🍽️',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      description: 'Your digestion and nutrition buddy'
    },
    {
      id: 'skin',
      name: 'Skin',
      personality: 'Gentle & Nurturing',
      icon: 'Fingerprint',
      emoji: '🌸',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      description: 'Your beauty and protection advisor'
    },
    {
      id: 'kidney',
      name: 'Kidney',
      personality: 'Calm & Balanced',
      icon: 'FlaskConical',
      emoji: '💧',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      description: 'Your filtration and balance keeper'
    },
    {
      id: 'brain',
      name: 'Brain',
      personality: 'Intelligent & Analytical',
      icon: 'Brain',
      emoji: '🧠',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Your cognitive health and mental wellness expert'
    }
  ];

  const currentCharacter = characters?.find(c => c?.id === selectedCharacter);

  const handleCharacterSelect = (characterId) => {
    onCharacterChange(characterId);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!isVisible) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Current Character Display */}
      <Button
        variant="outline"
        onClick={toggleDropdown}
        className="flex items-center space-x-3 px-4 py-3 w-full sm:w-auto min-w-[200px] justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full ${currentCharacter?.bgColor} flex items-center justify-center animate-breathing relative`}>
            <Icon
              name={currentCharacter?.icon}
              size={12}
              className={currentCharacter?.color}
            />
            <span className="absolute -top-1 -right-1 text-sm">{currentCharacter?.emoji}</span>
          </div>
          <div className="text-left">
            <p className="font-heading font-semibold text-sm text-foreground">
              {currentCharacter?.name}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              {currentCharacter?.personality}
            </p>
          </div>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground transition-transform"
        />
      </Button>
      {/* Character Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-80 mt-2 bg-popover border border-border rounded-lg shadow-warm-lg z-50">
            <div className="p-2">
              <div className="pb-2 px-2 border-b border-border">
                <p className="font-heading font-semibold text-sm text-foreground">
                  Choose Your Organ Guide
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  Each organ has a unique personality and expertise
                </p>
              </div>
              
              <div className="mt-2 space-y-1">
                {characters?.map((character) => (
                  <button
                    key={character?.id}
                    onClick={() => handleCharacterSelect(character?.id)}
                    className={`
                      w-full flex items-center space-x-3 p-3 rounded-lg transition-smooth
                      hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring
                      ${selectedCharacter === character?.id 
                        ? 'bg-muted ring-1 ring-ring' :''
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-full ${character?.bgColor}
                      flex items-center justify-center relative
                      ${selectedCharacter === character?.id ? 'animate-pulse-gentle' : 'animate-breathing'}
                    `}>
                      <Icon
                        name={character?.icon}
                        size={14}
                        className={character?.color}
                      />
                      <span className="absolute -top-1 -right-1 text-base">{character?.emoji}</span>
                    </div>
                    
                    <div className="flex-1 text-left">
                      <p className="font-heading font-semibold text-sm text-foreground">
                        {character?.name}
                      </p>
                      <p className="font-caption text-xs text-muted-foreground">
                        {character?.personality}
                      </p>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        {character?.description}
                      </p>
                    </div>
                    
                    {selectedCharacter === character?.id && (
                      <Icon 
                        name="Check" 
                        size={16} 
                        className="text-primary"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterSelector;
