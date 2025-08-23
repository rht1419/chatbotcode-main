import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ModeToggle from '../../../components/ui/ModeToggle';
import CharacterSelector from '../../../components/ui/CharacterSelector';

const ChatHeader = ({ 
  currentMode, 
  onModeChange, 
  selectedCharacter, 
  onCharacterChange,
  onSettingsClick 
}) => {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-4 lg:px-6">
        {/* Left Section - Brand and Mode Toggle */}
        <div className="flex items-center space-x-4">
          {/* OrganTalkMa Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-breathing">
              <Icon name="HeartHandshake" size={16} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-lg text-foreground">
                OrganTalkMa
              </h1>
              <p className="font-caption text-xs text-muted-foreground -mt-1">
                Your Health Companion
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="font-heading font-bold text-base text-foreground">
                OrganTalkMa
              </h1>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="hidden md:block">
            <ModeToggle
              currentMode={currentMode}
              onModeChange={onModeChange}
            />
          </div>
        </div>

        {/* Center Section - Character Selector (Organs Mode Only) */}
        <div className="flex-1 flex justify-center">
          {currentMode === 'organs' && (
            <CharacterSelector
              selectedCharacter={selectedCharacter}
              onCharacterChange={onCharacterChange}
              isVisible={true}
            />
          )}
          {currentMode === 'lifestyle' && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center animate-breathing">
                <Icon name="Sparkles" size={16} color="white" />
              </div>
              <div className="hidden sm:block">
                <p className="font-heading font-semibold text-sm text-foreground">
                  Lifestyle Coach
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  Your wellness companion
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Section - Mode Toggle (mobile), Organs Toggle Button and Settings */}
        <div className="flex items-center space-x-2">
          {/* Mode Toggle for Mobile */}
          <div className="md:hidden">
            <ModeToggle
              currentMode={currentMode}
              onModeChange={onModeChange}
            />
          </div>

          {/* Organs Chatbot Toggle Button */}
          {currentMode === 'lifestyle' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onModeChange('organs')}
              className="flex items-center space-x-2 px-3 py-2"
              aria-label="Switch to Organs Chatbot"
            >
              <Icon name="Heart" size={16} className="text-red-500" />
              <span className="hidden sm:inline text-sm font-medium">Organs Chat</span>
              <span className="sm:hidden text-sm font-medium">Organs</span>
            </Button>
          )}

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            aria-label="Chat settings"
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
