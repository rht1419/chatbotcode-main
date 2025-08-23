import React from 'react';
import { motion } from 'framer-motion';
import CharacterCard from './CharacterCard';

const CharacterGrid = ({ 
  characters = [], 
  selectedCharacter = null,
  onCharacterSelect = () => {},
  onChatNow = () => {},
  className = ''
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`
        grid gap-4 sm:gap-6
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5
        ${className}
      `}
    >
      {characters?.map((character) => (
        <motion.div
          key={character?.id}
          variants={itemVariants}
          className="flex justify-center"
        >
          <CharacterCard
            character={character}
            isSelected={selectedCharacter === character?.id}
            onSelect={onCharacterSelect}
            onChatNow={onChatNow}
            className="w-full max-w-sm"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CharacterGrid;