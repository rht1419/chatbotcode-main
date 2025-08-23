import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CharacterCard = ({ 
  character, 
  isSelected = false, 
  onSelect = () => {}, 
  onChatNow = () => {},
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    onSelect(character?.id);
    setIsExpanded(!isExpanded);
  };

  const handleChatNow = (e) => {
    e?.stopPropagation();
    onChatNow(character?.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 shadow-subtle hover:shadow-warm-lg
        ${isSelected ? 'ring-2 ring-primary shadow-warm-lg' : ''}
        ${className}
      `}
      onClick={handleCardClick}
    >
      {/* Character Image */}
      <div className={`relative h-32 sm:h-40 ${character?.bgGradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
        <div className="absolute top-4 right-4">
          <div className={`w-12 h-12 rounded-full ${character?.bgColor} flex items-center justify-center animate-breathing`}>
            <Icon 
              name={character?.icon} 
              size={24} 
              className={character?.color}
            />
          </div>
        </div>
        
        {/* Character Avatar */}
        <div className="absolute bottom-4 left-4">
          <div className={`w-16 h-16 rounded-full ${character?.bgColor} flex items-center justify-center border-4 border-white shadow-lg`}>
            <Icon 
              name={character?.icon} 
              size={32} 
              className={character?.color}
            />
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
          >
            <Icon name="Check" size={16} color="white" />
          </motion.div>
        )}
      </div>
      {/* Character Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-heading font-bold text-lg text-foreground">
            {character?.name}
          </h3>
          <p className={`font-body text-sm ${character?.color} font-medium`}>
            {character?.personality}
          </p>
        </div>

        <p className="font-body text-sm text-muted-foreground line-clamp-2">
          {character?.description}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-1">
          {character?.expertise?.slice(0, 2)?.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${character?.bgColor} ${character?.color}`}
            >
              {tag}
            </span>
          ))}
          {character?.expertise?.length > 2 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              +{character?.expertise?.length - 2}
            </span>
          )}
        </div>

        {/* Sample Conversation Starter */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="font-caption text-xs text-muted-foreground mb-1">
            Sample question:
          </p>
          <p className="font-body text-sm text-foreground italic">
            "{character?.sampleQuestion}"
          </p>
        </div>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          className="overflow-hidden"
        >
          {isExpanded && (
            <div className="space-y-3 pt-3 border-t border-border">
              {/* More Expertise */}
              <div>
                <p className="font-heading font-semibold text-sm text-foreground mb-2">
                  Health Focus Areas:
                </p>
                <div className="flex flex-wrap gap-1">
                  {character?.expertise?.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${character?.bgColor} ${character?.color}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* More Sample Questions */}
              <div>
                <p className="font-heading font-semibold text-sm text-foreground mb-2">
                  More conversation starters:
                </p>
                <div className="space-y-2">
                  {character?.moreQuestions?.map((question, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-2">
                      <p className="font-body text-xs text-foreground italic">
                        "{question}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Now Button */}
              <Button
                variant="default"
                onClick={handleChatNow}
                className="w-full"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Chat with {character?.name} Now
              </Button>
            </div>
          )}
        </motion.div>

        {/* Quick Chat Button (when not expanded) */}
        {!isExpanded && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleChatNow}
            className="w-full"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Start Chat
          </Button>
        )}
      </div>
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default CharacterCard;