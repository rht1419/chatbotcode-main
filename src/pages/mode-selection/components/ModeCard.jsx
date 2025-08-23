import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModeCard = ({ 
  mode, 
  title, 
  description, 
  features, 
  characters, 
  icon, 
  gradient, 
  isSelected, 
  onSelect 
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleStartChat = () => {
    if (mode === 'organs') {
      navigate('/character-selection');
    } else {
      navigate('/chat-interface');
    }
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'border-primary shadow-warm-lg scale-[1.02]' 
          : 'border-border hover:border-primary/50 hover:shadow-warm'
        }
        bg-card
      `}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${gradient} opacity-5`} />
      {/* Content */}
      <div className="relative p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`
              w-12 h-12 lg:w-16 lg:h-16 rounded-2xl ${gradient} 
              flex items-center justify-center shadow-subtle
              ${isHovered ? 'animate-pulse-gentle' : 'animate-breathing'}
            `}>
              <Icon name={icon} size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl lg:text-2xl text-foreground mb-1">
                {title}
              </h3>
              <p className="font-body text-sm lg:text-base text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
          
          {isSelected && (
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-heading font-semibold text-sm text-foreground mb-3">
            What you'll get:
          </h4>
          <div className="space-y-2">
            {features?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="font-body text-sm text-muted-foreground">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Characters Preview (for Organs mode) */}
        {characters && (
          <div className="mb-6">
            <h4 className="font-heading font-semibold text-sm text-foreground mb-3">
              Meet your organ guides:
            </h4>
            <div className="flex flex-wrap gap-2">
              {characters?.map((character, index) => (
                <div 
                  key={character?.id}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-full border
                    ${character?.bgColor} ${character?.borderColor}
                    transition-all duration-200
                    ${isHovered ? 'animate-pulse-gentle' : ''}
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon 
                    name={character?.icon} 
                    size={14} 
                    className={character?.color}
                  />
                  <span className="font-caption text-xs font-medium text-foreground">
                    {character?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Dialogue */}
        <div className="mb-6">
          <h4 className="font-heading font-semibold text-sm text-foreground mb-3">
            Sample conversation:
          </h4>
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            {mode === 'organs' ? (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={12} className="text-blue-600" />
                  </div>
                  <div className="bg-background rounded-lg px-3 py-2 shadow-subtle">
                    <p className="font-body text-sm text-foreground">
                      "I had too much to drink last night..."
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={12} className="text-amber-600" />
                  </div>
                  <div className="bg-primary/10 rounded-lg px-3 py-2">
                    <p className="font-body text-sm text-foreground">
                      "Oh great, another party! 🎉 Don't worry, I'm working overtime to clean up your mess. Maybe some water next time?"
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={12} className="text-blue-600" />
                  </div>
                  <div className="bg-background rounded-lg px-3 py-2 shadow-subtle">
                    <p className="font-body text-sm text-foreground">
                      "How can I improve my sleep quality?"
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={12} className="text-secondary" />
                  </div>
                  <div className="bg-secondary/10 rounded-lg px-3 py-2">
                    <p className="font-body text-sm text-foreground">
                      "Great question! Let's create a personalized sleep routine. Start with consistent bedtime, limit screens 1 hour before sleep..."
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          size="lg"
          onClick={handleStartChat}
          className="w-full"
          iconName="ArrowRight"
          iconPosition="right"
        >
          {mode === 'organs' ? 'Choose Your Guide' : 'Start Lifestyle Chat'}
        </Button>
      </div>
    </div>
  );
};

export default ModeCard;