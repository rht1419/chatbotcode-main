import React from 'react';
import Icon from '../../../components/AppIcon';

const TopicTags = ({ topics, title }) => {
  return (
    <div className="mb-8">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4 text-center">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {topics?.map((topic, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-full border border-border hover:border-primary/50 transition-colors"
          >
            <Icon name={topic?.icon} size={14} className="text-muted-foreground" />
            <span className="font-caption text-sm text-foreground">
              {topic?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicTags;