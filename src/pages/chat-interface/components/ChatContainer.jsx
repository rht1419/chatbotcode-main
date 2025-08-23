import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatContainer = ({ 
  messages, 
  isTyping, 
  currentMode, 
  selectedCharacter 
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {/* Welcome Message */}
      {messages?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-breathing">
            <span className="text-2xl">👋</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-lg text-foreground">
              Welcome to OrganTalkMa!
            </h3>
            <p className="font-body text-sm text-muted-foreground max-w-md">
              {currentMode === 'organs' 
                ? `Start chatting with your ${selectedCharacter} to learn about your health in a fun, engaging way!`
                : 'Get personalized lifestyle coaching and wellness tips from your AI health companion!'
              }
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-muted rounded-full text-xs font-caption text-muted-foreground">
              Ask health questions
            </span>
            <span className="px-3 py-1 bg-muted rounded-full text-xs font-caption text-muted-foreground">
              Get personalized tips
            </span>
            <span className="px-3 py-1 bg-muted rounded-full text-xs font-caption text-muted-foreground">
              Learn with fun
            </span>
          </div>
        </div>
      )}
      {/* Messages */}
      {messages?.map((message) => (
        <MessageBubble
          key={message?.id}
          message={message}
          isUser={message?.isUser}
          character={selectedCharacter}
          mode={currentMode}
        />
      ))}
      {/* Typing Indicator */}
      {isTyping && (
        <TypingIndicator 
          character={selectedCharacter}
          mode={currentMode}
        />
      )}
      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;