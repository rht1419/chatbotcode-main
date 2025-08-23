import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlight = ({ icon, title, description, color = 'text-primary' }) => {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className={`w-10 h-10 rounded-lg bg-background shadow-subtle flex items-center justify-center`}>
        <Icon name={icon} size={20} className={color} />
      </div>
      <div className="flex-1">
        <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
          {title}
        </h4>
        <p className="font-body text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureHighlight;