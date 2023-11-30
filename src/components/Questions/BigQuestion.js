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
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { MdQuestionAnswer } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Answer from './../Answer/Answer';
import axios from "axios";

const RepositoryCard = (props) => {
  const { id, question, description, tag, user, date } = props;
  const handleLinkClick = (e, link) => {
    window.open(link);
    e.stopPropagation();
  };

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [answers, setAnswers] = useState([]);

  function gotoQuestionFocus() {

    navigate(`/question?id=${id}`)
  }    

  useEffect(() => {
    getAnswerByIsAnswering(id);
  }, []);

  const getAnswerByIsAnswering = async (id) => {
    setAnswers(await returnAnswerByIsAnswering(id, 0));
    console.log(answers);
  }

  const returnAnswerByIsAnswering = async (id, cpt) => {
    let lst=[];
    const response = await axios.get(`http://localhost:5000/queueoverflow/answers/isAnswering/${id}`);
    for (let i = 0; i < response.data.length; i++) {
      const addInfo = await getQuestionAnswerById(response.data[i].QuestionAnswerID);
      const user = await getUserById(addInfo.UserID);
      lst.push({ ...response.data[i], Date: addInfo.Date, user: user.Username, marginleft : cpt })
      const answersLst = await returnAnswerByIsAnswering(response.data[i].QuestionAnswerID, cpt+1);
      for (let j = 0; j < answersLst.length; j++) {
        lst.push(answersLst[j]);
      }
    }

    return lst;
  }

  const getUserById = async (id) => {
    const response = await axios.get(`http://localhost:5000/queueoverflow/users/${id}`);
    return response.data;
  }

  const getQuestionAnswerById = async (id) => {
    const response = await axios.get(`http://localhost:5000/queueoverflow/questionAnswers/${id}`);
    return response.data;    
}


  return (
    <div>
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
              <HStack>
                  <Icon as={MdQuestionAnswer} boxSize="1.5em" mt="1px" marginTop="19px" alignSelf={"flex-start"}/>
                  <Text fontSize="4xl" noOfLines={3} fontWeight="600" align="left" marginLeft="10px">
                    {question}
                  </Text>
              </HStack>
            </Flex>
            {tag && (
              <Flex width="100%" flexDirection="row" marginTop="15px">
                <Box>
                  <HStack spacing="1">
                    <Tag size="sm" colorScheme="orange" marginTop="3px">
                      <Text fontSize={'lg'}>{tag}</Text>
                    </Tag>
                  </HStack>
                </Box>
                <Box>
                  <HStack spacing="1" marginLeft="15px">
                    <Text fontSize={'lg'} fontWeight={"550"} color={"gray.500"}>Asked the </Text>
                    <Text fontSize={'lg'} fontWeight={"550"} color={"gray.500"}>{date}</Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack spacing="1" marginLeft={"8px"}>
                    <Text fontSize={'lg'} fontWeight={"550"} color={"gray.500"}>by</Text>
                    <Text fontSize={'lg'} fontWeight={"550"} color={"gray.500"}>{user}</Text>
                  </HStack>
                </Box>
              </Flex>
            )}
          </VStack>
          <Box marginTop="15px">
            <Text color="black.500" fontSize="2xl" noOfLines={2} textAlign="left" marginTop={"5px"}>
              {description}
            </Text>
          </Box>
        </VStack>
      </Box>
      {answers.map((answer) => (
        <Answer key={answer.AnswerID} {...answer} />
      ))}
      <Box height={"30px"} />
    </div>
  );
};

export default RepositoryCard;