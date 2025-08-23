import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-12">
      {/* App Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-warm-lg animate-breathing">
          <Icon name="Heart" size={32} color="white" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
          Welcome to OrganTalkMa
        </h1>
        <p className="font-body text-lg lg:text-xl text-muted-foreground mb-6">
          Your personalized health companion that makes learning about wellness fun and engaging
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Scientifically Backed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span>Personalized</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} className="text-secondary" />
            <span>Interactive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;