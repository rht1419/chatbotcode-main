import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import FeatureHighlight from './FeatureHighlight';

const LearnMoreSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    {
      icon: 'Brain',
      title: 'AI-Powered Conversations',
      description: 'Advanced AI creates natural, educational dialogues tailored to your health questions',
      color: 'text-purple-500'
    },
    {
      icon: 'BookOpen',
      title: 'Evidence-Based Information',
      description: 'All health advice is backed by scientific research and medical best practices',
      color: 'text-blue-500'
    },
    {
      icon: 'Target',
      title: 'Personalized Guidance',
      description: 'Recommendations adapt to your lifestyle, preferences, and health goals',
      color: 'text-green-500'
    },
    {
      icon: 'Shield',
      title: 'Safe & Private',
      description: 'Your health conversations are secure and never shared with third parties',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="bg-muted/20 rounded-2xl p-6 lg:p-8">
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-xl lg:text-2xl text-foreground mb-2">
          How OrganTalkMa Works
        </h3>
        <p className="font-body text-muted-foreground">
          Combining humor, personality, and science for effective health education
        </p>
      </div>
      {/* Always visible content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {features?.slice(0, 2)?.map((feature, index) => (
          <FeatureHighlight
            key={index}
            icon={feature?.icon}
            title={feature?.title}
            description={feature?.description}
            color={feature?.color}
          />
        ))}
      </div>
      {/* Expandable content */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {features?.slice(2)?.map((feature, index) => (
            <FeatureHighlight
              key={index + 2}
              icon={feature?.icon}
              title={feature?.title}
              description={feature?.description}
              color={feature?.color}
            />
          ))}
        </div>
      )}
      {/* Educational Approach */}
      {isExpanded && (
        <div className="bg-background rounded-lg p-6 mb-6">
          <h4 className="font-heading font-semibold text-lg text-foreground mb-4">
            Our Educational Approach
          </h4>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Anthropomorphic Learning:</strong> By giving organs personalities, 
              we make complex health concepts memorable and relatable. Each organ character has unique traits 
              that reflect their biological functions.
            </p>
            <p>
              <strong className="text-foreground">Conversational AI:</strong> Our advanced AI understands context, 
              maintains character consistency, and provides accurate health information in an engaging format.
            </p>
            <p>
              <strong className="text-foreground">Behavioral Science:</strong> We use proven techniques from 
              behavioral psychology to encourage positive health habits through interactive storytelling.
            </p>
          </div>
        </div>
      )}
      {/* Toggle Button */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Show Less' : 'Learn More About Our Approach'}
        </Button>
      </div>
    </div>
  );
};

export default LearnMoreSection;