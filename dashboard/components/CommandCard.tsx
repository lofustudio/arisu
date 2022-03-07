import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Heading, Text } from '@chakra-ui/react';
  
const Content = ({ command }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        </Box>
    </motion.div>
  );
};
  
const CommandCard = ({ content, command }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => setIsOpen(!isOpen);
  
  return (
    <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
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
        </Box>
      <br />
      <AnimatePresence>{isOpen && <Content command={command} />}
      </AnimatePresence>
    </motion.a>
  );
};
  
export default CommandCard;