import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartSection = ({ 
  onQuickStart = () => {},
  className = ''
}) => {
  const quickStartOptions = [
    {
      id: 'health-checkup',
      title: 'General Health Check',
      description: 'Get overall wellness advice from multiple organs',
      icon: 'Stethoscope',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      action: () => onQuickStart('general')
    },
    {
      id: 'lifestyle-tips',
      title: 'Daily Lifestyle Tips',
      description: 'Quick advice for better daily health habits',
      icon: 'Sparkles',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      action: () => onQuickStart('lifestyle')
    },
    {
      id: 'symptom-check',
      title: 'Symptom Discussion',
      description: 'Talk about specific health concerns',
      icon: 'AlertCircle',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      action: () => onQuickStart('symptoms')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`bg-card border border-border rounded-2xl p-6 ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-xl text-foreground mb-2">
          Not Sure Where to Start?
        </h3>
        <p className="font-body text-muted-foreground">
          Try these quick conversation starters to get personalized health guidance
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickStartOptions?.map((option, index) => (
          <motion.div
            key={option?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ y: -2 }}
            className="bg-background border border-border rounded-xl p-4 cursor-pointer hover:shadow-subtle transition-all duration-300"
            onClick={option?.action}
          >
            <div className={`w-12 h-12 rounded-full ${option?.bgColor} flex items-center justify-center mb-3 mx-auto`}>
              <Icon 
                name={option?.icon} 
                size={24} 
                className={option?.color}
              />
            </div>
            
            <h4 className="font-heading font-semibold text-sm text-foreground text-center mb-2">
              {option?.title}
            </h4>
            
            <p className="font-body text-xs text-muted-foreground text-center mb-4">
              {option?.description}
            </p>
            
            <Button
              variant="outline"
              size="sm"
              onClick={option?.action}
              className="w-full"
            >
              Start Now
            </Button>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="font-caption text-xs text-muted-foreground">
          💡 Tip: Each organ has unique personality and expertise. Choose based on your health focus!
        </p>
      </div>
    </motion.div>
  );
};

export default QuickStartSection;