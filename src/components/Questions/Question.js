import * as React from 'react';
import { useState, useEffect } from 'react'

import {
  Box,
  useColorModeValue,
  VStack,
  Text,
  HStack,
  Tag,
  Icon,
  Flex,
  Tooltip
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiGitRepoForked, BiStar } from 'react-icons/bi';
import { FiGithub } from 'react-icons/fi';
import { MdQuestionAnswer } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MotionBox } from './motion';

const RepositoryCard = (props) => {
  const { id, question, description, tag, user, date } = props;

  const handleLinkClick = (e, link) => {
    window.open(link);
    e.stopPropagation();
  };

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  function gotoQuestionFocus() {

    navigate(`/question?id=${id}`)
  }    

  return (
    <MotionBox whileHover={{ y: -5 }} key={id}>
      <Box
        size="xl"
        py={2}
        px={[2, 4]}
        mt={2}
        rounded="xl"
        borderWidth="2px"
        bg={useColorModeValue('white', 'gray.800')}
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{
          shadow: 'lg',
          textDecoration: 'none'
        }}
      >
          <VStack overflow="hidden" align="start" spacing={1}>
            <VStack spacing={1} align="start" w="100%">
              <Flex
                justifyContent="space-between"
                width="100%"
              >
                <div onClick={() => gotoQuestionFocus()}>
                  <Tooltip hasArrow label="Click to see answers" placement="top">
                    <HStack cursor="pointer">
                      <Icon as={MdQuestionAnswer} boxSize="1.2em" mt="1px" />
                      <Text fontSize="30px" noOfLines={1} fontWeight="600" align="left">
                        {question}
                      </Text>
                    </HStack>
                  </Tooltip>
                </div>
              </Flex>
              {tag && (
                <Flex width="100%" flexDirection="row">
                  <Box>
                    <HStack spacing="1">
                      <Tag size="sm" colorScheme="orange">
                        <Text fontSize={'1rem'}>{tag}</Text>
                      </Tag>
                    </HStack>
                  </Box>
                  <Box>
                    <HStack spacing="1" marginLeft="15px">
                      <Text fontSize={'1rem'} fontWeight={"550"}>{date}</Text>
                    </HStack>
                  </Box>
                  <Box>
                    <HStack spacing="1" marginLeft="15px">
                      <Text fontSize={'1rem'} fontWeight={"550"}>{user}</Text>
                    </HStack>
                  </Box>
                </Flex>
              )}
            </VStack>
            <Box>
              <Text color="gray.500" fontSize="18px" noOfLines={2} textAlign="left" marginTop={"5px"}>
                {description}
              </Text>
            </Box>
          </VStack>
      </Box>
    </MotionBox>
  );
};

export default RepositoryCard;