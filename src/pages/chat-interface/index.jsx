import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';
import SettingsModal from './components/SettingsModal';
import { generateResponse, generateWelcomeMessage } from '../../services/geminiService';

const ChatInterface = () => {
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState('lifestyle');
  const [selectedCharacter, setSelectedCharacter] = useState('heart');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize with welcome message based on mode using Gemini API
  useEffect(() => {
    const initializeChat = async () => {
      setMessages([]); // Clear messages first
      setIsTyping(true);
      
      try {
        const welcomeContent = await generateWelcomeMessage(currentMode, selectedCharacter);
        
        const welcomeMessage = {
          id: Date.now(),
          content: welcomeContent,
          isUser: false,
          timestamp: new Date(),
          isEducational: true
        };
        
        setMessages([welcomeMessage]);
      } catch (error) {
        console.error('Error generating welcome message:', error);
        // Fallback message if API fails
        const fallbackMessage = {
          id: Date.now(),
          content: currentMode === 'organs' ? "Hello! I'm here to help you understand your body better. What would you like to know?" : "Hello! I'm your lifestyle coach, ready to help with your wellness journey. What can I help you with today?",
          isUser: false,
          timestamp: new Date(),
          isEducational: true
        };
        setMessages([fallbackMessage]);
      } finally {
        setIsTyping(false);
      }
    };

    initializeChat();
  }, [currentMode, selectedCharacter]);

  const handleModeChange = (newMode) => {
    setCurrentMode(newMode);
    // Messages will be cleared and reinitialized by useEffect
  };

  const handleCharacterChange = (newCharacter) => {
    setSelectedCharacter(newCharacter);
    // Messages will be cleared and reinitialized by useEffect
  };

  const handleSendMessage = async (messageContent) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      content: messageContent,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Generate AI response using Gemini
      const aiResponse = await generateResponse(
        messageContent,
        currentMode,
        selectedCharacter,
        messages
      );
      
      const aiMessage = {
        id: Date.now() + 1,
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        isEducational: currentMode === 'organs' // Mark organ responses as educational
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback error message
      const errorMessage = {
        id: Date.now() + 1,
        content: "I\'m having trouble responding right now. Please try again in a moment!",
        isUser: false,
        timestamp: new Date(),
        isEducational: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <ChatHeader
        currentMode={currentMode}
        onModeChange={handleModeChange}
        selectedCharacter={selectedCharacter}
        onCharacterChange={handleCharacterChange}
        onSettingsClick={handleSettingsClick}
      />

      {/* Chat Container */}
      <ChatContainer
        messages={messages}
        isTyping={isTyping}
        currentMode={currentMode}
        selectedCharacter={selectedCharacter}
      />

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleSettingsClose}
      />
    </div>
  );
};

export default ChatInterface;