import * as React from 'react';
import { useState, useEffect } from 'react'
import { IoMdDoneAll } from "react-icons/io";
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
import { TbDeviceDesktopQuestion } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MotionBox } from './../Questions/motion';

const RepositoryCard = (props) => {
  const { id, date, description, codeAnswer, user, tag, doneEx } = props;
  const handleLinkClick = (e, link) => {
    window.open(link);
    e.stopPropagation();
  };

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  function gotoQuestionFocus() {

    navigate(`/exercise?id=${id}`)
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
        marginTop="20px"
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
                      <Icon as={TbDeviceDesktopQuestion} boxSize="1.2em" mt="13px" justifySelf={"flex-start"} alignSelf={"flex-start"}/>
                      <Text fontSize="30px" fontWeight="600" align="left" noOfLines={"3"}>
                        {description}
                      </Text>
                    </HStack>
                  </Tooltip>
                </div>
              </Flex>
                <Flex width="100%" flexDirection="row">
                  <Box>
                    <HStack spacing="1">
                      <Tag size="sm" colorScheme="orange" mt="2px">
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
                  { doneEx && (
                      <Box>
                        <Icon as={IoMdDoneAll } boxSize="1.2em" marginLeft="15px" mt="3px" justifySelf={"flex-start"} alignSelf={"flex-start"}/>
                      </Box>
                    )
                  }
                </Flex>
            </VStack>
          </VStack>
      </Box>
    </MotionBox>
  );
};

export default RepositoryCard;