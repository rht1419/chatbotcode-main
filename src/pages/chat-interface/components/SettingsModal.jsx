import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const settingsOptions = [
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage chat and health reminder notifications',
      icon: 'Bell',
      action: 'Configure'
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      description: 'Control how your health data is used',
      icon: 'Shield',
      action: 'Manage'
    },
    {
      id: 'language',
      title: 'Language',
      description: 'Change chat language preferences',
      icon: 'Globe',
      action: 'English'
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      description: 'Adjust text size and contrast settings',
      icon: 'Eye',
      action: 'Settings'
    }
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-96 bg-popover border border-border rounded-lg shadow-warm-lg z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-bold text-lg text-foreground">
            Chat Settings
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close settings"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {settingsOptions?.map((option) => (
            <div
              key={option?.id}
              className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground">
                    {option?.title}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    {option?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-body text-sm text-muted-foreground">
                  {option?.action}
                </span>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-foreground">Clear Chat History</span>
            <Button variant="outline" size="sm">
              Clear All
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-foreground">Export Chat Data</span>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={14} className="mr-2" />
              Export
            </Button>
          </div>

          <div className="pt-3 border-t border-border">
            <p className="font-caption text-xs text-muted-foreground text-center">
              OrganTalkMa v1.0.0 • Made with ❤️ for your health
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;