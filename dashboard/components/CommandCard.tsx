import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Heading, Text } from '@chakra-ui/react';
import { TiArrowDown } from 'react-icons/ti';

const Content = ({ command }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Text fontSize="lg" mt={2}>
        Category: {command.category}
      </Text>
      <Text fontSize="lg" mt={2}>
        Aliases: {command.aliases}
      </Text>
    </motion.div>
  );
};

const CommandCard = ({ command }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      onClick={toggleOpen}
    >
      <Box
        key={command.name}
        boxShadow="lg"
        rounded="lg"
        p={8}
      >
        <Heading as="h3" size="lg" fontWeight="semibold">
          {command.name}
        </Heading>
        <Text fontSize="lg" mt={2}>
          {command.description}
        </Text>
        <AnimatePresence>{isOpen && <Content command={command} />}
        </AnimatePresence>
      </Box>
    </motion.a>
  );
};

export default CommandCard;