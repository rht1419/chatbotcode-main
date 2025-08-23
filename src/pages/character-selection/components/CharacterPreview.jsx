import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CharacterPreview = ({ 
  character = null, 
  isVisible = false, 
  onClose = () => {},
  onChatNow = () => {},
  className = ''
}) => {
  if (!character) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Preview Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`
                bg-background border border-border rounded-2xl shadow-warm-lg
                w-full max-w-2xl max-h-[90vh] overflow-hidden
                ${className}
              `}
              onClick={(e) => e?.stopPropagation()}
            >
              {/* Header */}
              <div className={`relative ${character?.bgGradient} p-6`}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                >
                  <Icon name="X" size={20} />
                </Button>

                {/* Character Info */}
                <div className="relative flex items-center space-x-4">
                  <div className={`w-20 h-20 rounded-full ${character?.bgColor} flex items-center justify-center border-4 border-white shadow-lg animate-breathing`}>
                    <Icon 
                      name={character?.icon} 
                      size={40} 
                      className={character?.color}
                    />
                  </div>
                  
                  <div className="text-white">
                    <h2 className="font-heading font-bold text-2xl">
                      Meet {character?.name}
                    </h2>
                    <p className="font-body text-lg opacity-90">
                      {character?.personality}
                    </p>
                    <p className="font-caption text-sm opacity-75 mt-1">
                      Your {character?.name?.toLowerCase()} health expert
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                {/* Description */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    About {character?.name}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {character?.fullDescription}
                  </p>
                </div>

                {/* Expertise Areas */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                    Health Expertise
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {character?.expertise?.map((area, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 p-2 rounded-lg ${character?.bgColor}/20`}
                      >
                        <Icon 
                          name="CheckCircle" 
                          size={16} 
                          className={character?.color}
                        />
                        <span className="font-body text-sm text-foreground">
                          {area}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Conversations */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                    Sample Conversations
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="font-caption text-xs text-muted-foreground mb-1">
                        You might ask:
                      </p>
                      <p className="font-body text-sm text-foreground italic">
                        "{character?.sampleQuestion}"
                      </p>
                    </div>
                    
                    <div className={`${character?.bgColor}/30 rounded-lg p-3`}>
                      <p className="font-caption text-xs text-muted-foreground mb-1">
                        {character?.name} might respond:
                      </p>
                      <p className="font-body text-sm text-foreground italic">
                        "{character?.sampleResponse}"
                      </p>
                    </div>

                    {character?.moreQuestions?.slice(0, 2)?.map((question, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-3">
                        <p className="font-caption text-xs text-muted-foreground mb-1">
                          Or try asking:
                        </p>
                        <p className="font-body text-sm text-foreground italic">
                          "{question}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border bg-muted/20">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Browse More Characters
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => onChatNow(character?.id)}
                    className="flex-1"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Start Chatting with {character?.name}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CharacterPreview;