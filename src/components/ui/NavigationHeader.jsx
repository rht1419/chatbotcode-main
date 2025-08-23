import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getPageTitle = () => {
    switch (location?.pathname) {
      case '/mode-selection':
        return 'Choose Your Health Journey';
      case '/character-selection':
        return 'Meet Your Organ Guides';
      case '/chat-interface':
        return 'Health Conversation';
      default:
        return 'OrganTalkMa';
    }
  };

  const canGoBack = () => {
    return location?.pathname !== '/mode-selection';
  };

  const handleBack = () => {
    if (location?.pathname === '/chat-interface') {
      navigate('/character-selection');
    } else if (location?.pathname === '/character-selection') {
      navigate('/mode-selection');
    }
  };

  const handleLogoClick = () => {
    navigate('/mode-selection');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Back Button & Logo */}
        <div className="flex items-center space-x-4">
          {canGoBack() && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="lg:hidden"
              aria-label="Go back"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
          )}
          
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            aria-label="OrganTalkMa Home"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading font-bold text-xl text-foreground">
                OrganTalkMa
              </h1>
              <p className="font-caption text-xs text-muted-foreground -mt-1">
                Your Health Companion
              </p>
            </div>
          </button>
        </div>

        {/* Center Section - Page Title */}
        <div className="hidden lg:block">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            {getPageTitle()}
          </h2>
        </div>

        {/* Right Section - Navigation & Menu */}
        <div className="flex items-center space-x-2">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Button
              variant={location?.pathname === '/mode-selection' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => navigate('/mode-selection')}
            >
              <Icon name="Compass" size={16} className="mr-2" />
              Modes
            </Button>
            
            <Button
              variant={location?.pathname === '/character-selection' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => navigate('/character-selection')}
            >
              <Icon name="Users" size={16} className="mr-2" />
              Characters
            </Button>
            
            <Button
              variant={location?.pathname === '/chat-interface' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => navigate('/chat-interface')}
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Chat
            </Button>
          </nav>

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Settings and more"
          >
            <Icon name="Settings" size={20} />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-warm">
          <nav className="flex flex-col p-4 space-y-2">
            <Button
              variant={location?.pathname === '/mode-selection' ? 'secondary' : 'ghost'}
              onClick={() => {
                navigate('/mode-selection');
                setIsMenuOpen(false);
              }}
              className="justify-start"
            >
              <Icon name="Compass" size={16} className="mr-3" />
              Choose Mode
            </Button>
            
            <Button
              variant={location?.pathname === '/character-selection' ? 'secondary' : 'ghost'}
              onClick={() => {
                navigate('/character-selection');
                setIsMenuOpen(false);
              }}
              className="justify-start"
            >
              <Icon name="Users" size={16} className="mr-3" />
              Select Character
            </Button>
            
            <Button
              variant={location?.pathname === '/chat-interface' ? 'secondary' : 'ghost'}
              onClick={() => {
                navigate('/chat-interface');
                setIsMenuOpen(false);
              }}
              className="justify-start"
            >
              <Icon name="MessageCircle" size={16} className="mr-3" />
              Start Chat
            </Button>

            <div className="border-t border-border pt-2 mt-2">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(false)}
                className="justify-start"
              >
                <Icon name="HelpCircle" size={16} className="mr-3" />
                Help & Support
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(false)}
                className="justify-start"
              >
                <Icon name="Info" size={16} className="mr-3" />
                About OrganTalkMa
              </Button>
            </div>
          </nav>
        </div>
      )}
      {/* Desktop Settings Dropdown */}
      {isMenuOpen && (
        <div className="hidden lg:block absolute top-16 right-6 w-64 bg-popover border border-border rounded-lg shadow-warm-lg">
          <div className="p-4 space-y-2">
            <div className="pb-2 border-b border-border">
              <p className="font-heading font-semibold text-sm text-foreground">
                Settings & More
              </p>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(false)}
              className="w-full justify-start"
            >
              <Icon name="User" size={16} className="mr-3" />
              Profile Settings
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(false)}
              className="w-full justify-start"
            >
              <Icon name="Bell" size={16} className="mr-3" />
              Notifications
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(false)}
              className="w-full justify-start"
            >
              <Icon name="Shield" size={16} className="mr-3" />
              Privacy & Safety
            </Button>
            
            <div className="border-t border-border pt-2">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(false)}
                className="w-full justify-start"
              >
                <Icon name="HelpCircle" size={16} className="mr-3" />
                Help & Support
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(false)}
                className="w-full justify-start"
              >
                <Icon name="Info" size={16} className="mr-3" />
                About OrganTalkMa
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default NavigationHeader;