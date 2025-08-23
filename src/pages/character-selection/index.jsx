import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import CharacterGrid from './components/CharacterGrid';
import CharacterPreview from './components/CharacterPreview';
import QuickStartSection from './components/QuickStartSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CharacterSelection = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [previewCharacter, setPreviewCharacter] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Mock character data
  const characters = [
    {
      id: 'liver',
      name: 'Liver',
      personality: 'Sarcastic Party Police',
      description: 'Your detox expert with a sharp wit and no-nonsense attitude about alcohol and toxins.',
      fullDescription: `Meet your liver - the ultimate multitasker who's tired of cleaning up after your weekend adventures. With a sarcastic sense of humor and protective instincts, Liver will give you the straight talk about detox, alcohol consumption, and maintaining optimal metabolic health. Don't expect sugar-coating - this organ tells it like it is!`,
      icon: 'Shield',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      bgGradient: 'bg-gradient-to-br from-amber-400 to-orange-500',
      expertise: ['Detoxification', 'Alcohol Processing', 'Metabolism', 'Fat Processing', 'Toxin Removal', 'Bile Production'],
      sampleQuestion: 'Is it okay to drink alcohol every weekend?',
      sampleResponse: 'Oh, weekend warrior, are we? Look, I can handle your party habits, but give me a break once in a while. Your liver needs recovery time too!',
      moreQuestions: [
        'What foods help with liver detox?',
        'How do I know if my liver is overworked?',
        'Can I reverse fatty liver disease?'
      ]
    },
    {
      id: 'heart',
      name: 'Heart',
      personality: 'Emotional Cardio Advisor',
      description: 'Your passionate cardiovascular guide who cares deeply about your heart health and emotional wellbeing.',
      fullDescription: `Your heart beats with passion and emotion, pumping life through every moment. As your cardiovascular advisor, Heart combines medical wisdom with emotional intelligence to guide you toward better heart health. Whether it's exercise, stress management, or matters of the heart, this caring organ is here to support your journey with warmth and understanding.`,icon: 'Heart',color: 'text-red-500',bgColor: 'bg-red-50',bgGradient: 'bg-gradient-to-br from-red-400 to-pink-500',
      expertise: ['Cardiovascular Health', 'Exercise Guidance', 'Stress Management', 'Blood Pressure', 'Emotional Wellbeing', 'Heart Disease Prevention'],
      sampleQuestion: 'How much exercise do I need for a healthy heart?',sampleResponse: 'Darling, your heart craves movement! Just 150 minutes of moderate activity per week makes me sing with joy. Let\'s start with what you love - dancing, walking, swimming - I\'m not picky!',
      moreQuestions: [
        'What foods are best for heart health?',
        'How does stress affect my heart?',
        'What are the warning signs of heart problems?'
      ]
    },
    {
      id: 'stomach',
      name: 'Stomach',
      personality: 'Dramatic Food Critic',
      description: 'Your theatrical digestive expert who has strong opinions about what you eat and when.',
      fullDescription: `Welcome to the theater of digestion! Your stomach is a dramatic performer who takes food very seriously. With flair for the theatrical and expertise in all things digestive, Stomach will guide you through the complex world of nutrition, meal timing, and digestive health. Expect passionate opinions about your food choices and dramatic reactions to poor eating habits!`,
      icon: 'Zap',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      bgGradient: 'bg-gradient-to-br from-orange-400 to-red-500',
      expertise: ['Digestion', 'Nutrition', 'Meal Timing', 'Food Sensitivities', 'Acid Balance', 'Gut Health'],
      sampleQuestion: 'Why do I get bloated after eating?',
      sampleResponse: 'Oh, the DRAMA! You\'ve overwhelmed me with too much, too fast, or the wrong combinations! Let me teach you the art of mindful eating, darling.',
      moreQuestions: [
        'What should I eat for better digestion?',
        'Is intermittent fasting good for me?',
        'How can I reduce stomach acid?'
      ]
    },
    {
      id: 'skin',
      name: 'Skin',
      personality: 'Fashionable Beauty Expert',
      description: 'Your elegant protection specialist who knows all about skincare, beauty, and environmental defense.',
      fullDescription: `Darling, your skin is your largest organ and your first line of defense against the world! With an eye for beauty and expertise in protection, Skin will guide you through skincare routines, sun protection, and maintaining that healthy glow. From acne to aging, hydration to protection, this fashionable organ knows how to keep you looking and feeling fabulous.`,
      icon: 'Sun',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      bgGradient: 'bg-gradient-to-br from-pink-400 to-rose-500',
      expertise: ['Skincare', 'Sun Protection', 'Anti-Aging', 'Acne Treatment', 'Hydration', 'Environmental Protection'],
      sampleQuestion: 'What\'s the best skincare routine for my age?',
      sampleResponse: 'Honey, skincare is an art! Let\'s start with the basics: cleanse, moisturize, and ALWAYS wear SPF. Your skin type and age determine the rest of our beautiful routine!',
      moreQuestions: [
        'How do I prevent wrinkles naturally?',
        'What causes acne in adults?',
        'Which ingredients should I avoid in skincare?'
      ]
    },
    {
      id: 'kidney',
      name: 'Kidney',
      personality: 'Wise Filter-Master',
      description: 'Your calm and balanced filtration expert who maintains your body\'s perfect equilibrium.',
      fullDescription: `Greetings, I am your kidney - the wise guardian of balance and purity. With quiet strength and ancient wisdom, I filter your blood, balance your fluids, and maintain the delicate equilibrium that keeps you healthy. My approach is calm and measured, focusing on long-term health through proper hydration, balanced nutrition, and mindful living.`,
      icon: 'Droplets',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      bgGradient: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      expertise: ['Filtration', 'Hydration', 'Blood Pressure', 'Electrolyte Balance', 'Waste Removal', 'Fluid Balance'],
      sampleQuestion: 'How much water should I drink daily?',
      sampleResponse: 'Ah, the eternal question of hydration. Listen to your body\'s wisdom - clear, pale urine is your guide. Generally, 8 glasses serve most well, but your needs may vary with activity and climate.',
      moreQuestions: [
        'What foods support kidney health?',
        'How do I know if my kidneys are healthy?',
        'Can kidney stones be prevented?'
      ]
    }
  ];

  const handleCharacterSelect = (characterId) => {
    setSelectedCharacter(characterId);
    const character = characters?.find(c => c?.id === characterId);
    setPreviewCharacter(character);
    setShowPreview(true);
  };

  const handleChatNow = (characterId) => {
    // Store selected character in localStorage for chat interface
    localStorage.setItem('selectedCharacter', characterId);
    navigate('/chat-interface');
  };

  const handleQuickStart = (type) => {
    // Store quick start type and navigate to chat
    localStorage.setItem('quickStartType', type);
    navigate('/chat-interface');
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setPreviewCharacter(null);
  };

  const handleBackToModes = () => {
    navigate('/mode-selection');
  };

  return (
    <>
      <Helmet>
        <title>Choose Your Organ Guide - OrganTalkMa</title>
        <meta name="description" content="Select your organ personality guide for personalized health conversations. Each organ has unique expertise and personality traits." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        
        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 lg:py-16">
            <div className="container mx-auto px-4 lg:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToModes}
                    className="lg:hidden"
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Back to Modes
                  </Button>
                </div>

                <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                  Meet Your Organ Guides
                </h1>
                
                <p className="font-body text-lg text-muted-foreground mb-6">
                  Each organ has a unique personality and expertise. Choose your guide for personalized health conversations that are both educational and entertaining.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span>5 Unique Personalities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Brain" size={16} className="text-secondary" />
                    <span>AI-Powered Conversations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="BookOpen" size={16} className="text-accent" />
                    <span>Educational & Fun</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Character Selection Grid */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 lg:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-2">
                  Choose Your Health Companion
                </h2>
                <p className="font-body text-muted-foreground text-center">
                  Tap any character to learn more about their personality and expertise
                </p>
              </motion.div>

              <CharacterGrid
                characters={characters}
                selectedCharacter={selectedCharacter}
                onCharacterSelect={handleCharacterSelect}
                onChatNow={handleChatNow}
                className="mb-12"
              />
            </div>
          </section>

          {/* Quick Start Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 lg:px-6">
              <QuickStartSection
                onQuickStart={handleQuickStart}
                className="max-w-4xl mx-auto"
              />
            </div>
          </section>

          {/* Tips Section */}
          <section className="py-12">
            <div className="container mx-auto px-4 lg:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                  How It Works
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="MousePointer" size={24} className="text-primary" />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">
                      1. Select Your Guide
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Choose an organ based on your health focus or curiosity
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="MessageCircle" size={24} className="text-secondary" />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">
                      2. Start Chatting
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Ask questions and get personalized health advice
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="Lightbulb" size={24} className="text-accent" />
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">
                      3. Learn & Improve
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Get actionable tips for better health and wellness
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Character Preview Modal */}
        <CharacterPreview
          character={previewCharacter}
          isVisible={showPreview}
          onClose={handleClosePreview}
          onChatNow={handleChatNow}
        />
      </div>
    </>
  );
};

export default CharacterSelection;