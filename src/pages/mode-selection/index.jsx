import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import ModeCard from './components/ModeCard';
import WelcomeHeader from './components/WelcomeHeader';
import TopicTags from './components/TopicTags';
import LearnMoreSection from './components/LearnMoreSection';

const ModeSelection = () => {
  const [selectedMode, setSelectedMode] = useState(null);

  // Mock data for organ characters
  const organCharacters = [
    {
      id: 'liver',
      name: 'Liver',
      icon: 'Shield',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 'heart',
      name: 'Heart',
      icon: 'Heart',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'stomach',
      name: 'Stomach',
      icon: 'Zap',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'skin',
      name: 'Skin',
      icon: 'Sun',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'kidney',
      name: 'Kidney',
      icon: 'Droplets',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  // Mock data for topic tags
  const organTopics = [
    { name: 'Alcohol Effects', icon: 'Wine' },
    { name: 'Nutrition', icon: 'Apple' },
    { name: 'Exercise', icon: 'Dumbbell' },
    { name: 'Skincare', icon: 'Sparkles' },
    { name: 'Hydration', icon: 'Droplets' },
    { name: 'Detox', icon: 'Shield' }
  ];

  const lifestyleTopics = [
    { name: 'Sleep Quality', icon: 'Moon' },
    { name: 'Stress Management', icon: 'Brain' },
    { name: 'Fitness Goals', icon: 'Target' },
    { name: 'Mental Health', icon: 'Heart' },
    { name: 'Habit Building', icon: 'TrendingUp' },
    { name: 'Wellness Tips', icon: 'Lightbulb' }
  ];

  // Mode configurations
  const modes = [
    {
      mode: 'organs',
      title: 'Organs Chat',
      description: 'Chat with your organ personalities',
      icon: 'Users',
      gradient: 'bg-gradient-to-br from-primary to-red-500',
      features: [
        'Meet 5 unique organ personalities with distinct voices',
        'Get organ-specific health advice and tips',
        'Learn through humor and relatable conversations',
        'Understand how lifestyle affects each organ',
        'Receive personalized recommendations'
      ],
      characters: organCharacters
    },
    {
      mode: 'lifestyle',
      title: 'Lifestyle Chat',
      description: 'Get supportive health coaching',
      icon: 'Sparkles',
      gradient: 'bg-gradient-to-br from-secondary to-green-500',
      features: [
        'Comprehensive lifestyle and wellness guidance',
        'Evidence-based health recommendations',
        'Goal setting and habit tracking support',
        'Stress management and mental health tips',
        'Personalized wellness action plans'
      ],
      characters: null
    }
  ];

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  useEffect(() => {
    // Auto-scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Choose Your Health Journey - OrganTalkMa</title>
        <meta 
          name="description" 
          content="Select between Organs Chat and Lifestyle Chat modes for personalized health education and wellness guidance." 
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        
        <main className="pt-20 pb-12">
          <div className="container mx-auto px-4 lg:px-6">
            {/* Welcome Header */}
            <WelcomeHeader />

            {/* Mode Selection Cards */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
                  Choose Your Health Journey
                </h2>
                <p className="font-body text-muted-foreground">
                  Select the conversation style that resonates with you
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {modes?.map((mode) => (
                  <ModeCard
                    key={mode?.mode}
                    mode={mode?.mode}
                    title={mode?.title}
                    description={mode?.description}
                    features={mode?.features}
                    characters={mode?.characters}
                    icon={mode?.icon}
                    gradient={mode?.gradient}
                    isSelected={selectedMode === mode?.mode}
                    onSelect={() => handleModeSelect(mode?.mode)}
                  />
                ))}
              </div>
            </div>

            {/* Topic Tags */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TopicTags 
                  topics={organTopics}
                  title="Popular Organ Chat Topics"
                />
                <TopicTags 
                  topics={lifestyleTopics}
                  title="Popular Lifestyle Topics"
                />
              </div>
            </div>

            {/* Learn More Section */}
            <div className="max-w-4xl mx-auto">
              <LearnMoreSection />
            </div>

            {/* Health Disclaimer */}
            <div className="max-w-4xl mx-auto mt-12 p-6 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-warning text-sm font-bold">!</span>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm text-foreground mb-2">
                    Health Disclaimer
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    OrganTalkMa provides educational health information and should not replace professional medical advice. 
                    Always consult with healthcare providers for medical concerns. This app is designed for educational 
                    and entertainment purposes to promote health awareness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ModeSelection;