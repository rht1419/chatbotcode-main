import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const healthTopics = [
    { id: 'alcohol', label: '🍷 Alcohol', icon: 'Wine' },
    { id: 'diet', label: '🥗 Diet', icon: 'Apple' },
    { id: 'exercise', label: '💪 Exercise', icon: 'Dumbbell' },
    { id: 'sleep', label: '😴 Sleep', icon: 'Moon' },
    { id: 'stress', label: '🧘 Stress', icon: 'Brain' },
    { id: 'hydration', label: '💧 Hydration', icon: 'Droplets' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  const handleTopicClick = (topic) => {
    const topicMessages = {
      alcohol: "How does alcohol affect my body?",
      diet: "What should I eat for better health?",
      exercise: "How much exercise do I need daily?",
      sleep: "How can I improve my sleep quality?",
      stress: "How can I manage stress better?",
      hydration: "How much water should I drink daily?"
    };
    
    if (!disabled) {
      onSendMessage(topicMessages?.[topic?.id]);
    }
  };

  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
      {/* Quick Topic Chips */}
      <div className="flex flex-wrap gap-2 mb-3 overflow-x-auto pb-2">
        {healthTopics?.map((topic) => (
          <button
            key={topic?.id}
            onClick={() => handleTopicClick(topic)}
            disabled={disabled}
            className="
              flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-muted/80 
              rounded-full text-sm font-body transition-smooth flex-shrink-0
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-ring
            "
          >
            <span>{topic?.label}</span>
          </button>
        ))}
      </div>
      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your health... (Press Enter to send, Shift+Enter for new line)"
            disabled={disabled}
            className="
              w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12
              bg-input border border-border rounded-bubble resize-none
              font-body text-sm text-foreground placeholder:text-muted-foreground
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-smooth
            "
            rows={1}
          />
          
          {/* Character Counter */}
          <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
            {message?.length}/500
          </div>
        </div>

        <Button
          type="submit"
          size="icon"
          disabled={!message?.trim() || disabled}
          className="h-11 w-11 rounded-full flex-shrink-0"
          aria-label="Send message"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>
      {/* Health Disclaimer */}
      <div className="flex items-center justify-center mt-3 px-4">
        <div className="flex items-center space-x-2 text-center">
          <Icon name="Info" size={12} className="text-muted-foreground" />
          <p className="font-caption text-xs text-muted-foreground">
            This is for educational purposes only. Consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;