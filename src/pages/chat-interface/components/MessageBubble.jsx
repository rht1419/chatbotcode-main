import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isUser, character, mode }) => {
  const getCharacterConfig = (characterId) => {
    const configs = {
      heart: {
        name: 'Heart',
        icon: 'Heart',
        emoji: '❤️',
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        bubbleColor: 'bg-red-100',
        personality: 'Passionate & Caring'
      },
      liver: {
        name: 'Liver',
        icon: 'Filter',
        emoji: '🧽',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        bubbleColor: 'bg-amber-100',
        personality: 'Sarcastic Party Police'
      },
      stomach: {
        name: 'Stomach',
        icon: 'Apple',
        emoji: '🍽️',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        bubbleColor: 'bg-orange-100',
        personality: 'Dramatic Food Critic'
      },
      skin: {
        name: 'Skin',
        icon: 'Fingerprint',
        emoji: '🌸',
        color: 'text-pink-500',
        bgColor: 'bg-pink-50',
        bubbleColor: 'bg-pink-100',
        personality: 'Fashionable Beauty Expert'
      },
      kidney: {
        name: 'Kidney',
        icon: 'FlaskConical',
        emoji: '💧',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        bubbleColor: 'bg-blue-100',
        personality: 'Wise Filter Master'
      },
      brain: {
        name: 'Brain',
        icon: 'Brain',
        emoji: '🧠',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        bubbleColor: 'bg-purple-100',
        personality: 'Passionate & Caring'
      }
    };
    return configs?.[characterId] || configs?.heart;
  };

  const getLifestyleConfig = () => ({
    name: 'Lifestyle Coach',
    icon: 'Sparkles',
    emoji: '✨',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    bubbleColor: 'bg-secondary/20',
    personality: 'Supportive Wellness Guide'
  });

  const config = mode === 'lifestyle' ? getLifestyleConfig() : getCharacterConfig(character);
  const timestamp = new Date(message.timestamp)?.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-xs sm:max-w-md lg:max-w-lg">
          <div className="bg-primary text-primary-foreground rounded-bubble px-4 py-3 shadow-subtle">
            <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">
              {message?.content}
            </p>
          </div>
          <div className="flex justify-end mt-1">
            <span className="font-caption text-xs text-muted-foreground">
              {timestamp}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 mb-4">
      {/* Character Avatar */}
      <div className={`
        w-10 h-10 rounded-full ${config?.bgColor}
        flex items-center justify-center flex-shrink-0 relative
        animate-breathing
      `}>
        <Icon
          name={config?.icon}
          size={14}
          className={config?.color}
        />
        <span className="absolute -top-1 -right-1 text-base">{config?.emoji}</span>
      </div>
      {/* Message Content */}
      <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-heading font-semibold text-sm text-foreground">
            {config?.name}
          </span>
          <span className="font-caption text-xs text-muted-foreground">
            {config?.personality}
          </span>
        </div>
        
        <div className={`${config?.bubbleColor} rounded-bubble px-4 py-3 shadow-subtle`}>
          <p className="font-body text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {message?.content}
          </p>
          
          {/* Educational Badge */}
          {message?.isEducational && (
            <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-border/50">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span className="font-caption text-xs text-success">
                Health Fact Verified
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <span className="font-caption text-xs text-muted-foreground">
            {timestamp}
          </span>
          
          {/* Reaction Buttons */}
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-muted rounded-full transition-smooth">
              <Icon name="ThumbsUp" size={12} className="text-muted-foreground hover:text-success" />
            </button>
            <button className="p-1 hover:bg-muted rounded-full transition-smooth">
              <Icon name="ThumbsDown" size={12} className="text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
