import * as React from 'react';
import { useState, useEffect, useContext } from 'react'

import {
  Box,
  useColorModeValue,
  VStack,
  Text,
  HStack,
  Tag,
  Icon,
  Flex,
  Textarea,
  Button,
  Tooltip,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { MdQuestionAnswer } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Answer from './../Answer/Answer';
import axios from "axios";
import { UserContext } from "./../../UserContext";

const RepositoryCard = (props) => {
  const { id, question, description, tag, user, date } = props;
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [validAnswer, setValidAnswer] = useState(true);
  const [currentFocus, setCurrentFocus] = useState('question');
  const currentUser = useContext(UserContext);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAnswerByIsAnswering(id);
  }, []);

  const getAnswerByIsAnswering = async (id) => {
    setAnswers(await returnAnswerByIsAnswering(id, 0));
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

  function clickAnswer(AnswerID) {
    if (currentFocus !== AnswerID) {
      setCurrentAnswer('')
      setCurrentFocus(AnswerID)
      setValidAnswer(true)
    }
  }

  function writing(value) {
    setCurrentAnswer(value)
    setValidAnswer(true)
  }

  function getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy+ '-' +  mm + '-' + dd;
    return today;
}

  const getLastQuestionAnswer = async () => {
    const response = await axios.get(`http://localhost:5000/queueoverflow/lastQuestionAnswer`);
    return response.data.QuestionAnswerID;    
  }

  const getLastAnswer = async () => {
    const response = await axios.get(`http://localhost:5000/queueoverflow/lastAnswer`);
    return response.data.AnswerID;
  }

  const getUserID = async () => {
    const response = await axios.get(`http://localhost:5000/queueoverflow/usersByName/${currentUser}`);
    return response.data.UserID;
}


  const createQuestionAnswer = async (lastQuestionAnswerID) => {
    await axios.post('http://localhost:5000/queueoverflow/questionAnswers',{
        QuestionAnswerID: lastQuestionAnswerID+1,
        Date: getDate(),
        UserID: await getUserID(),
    });
  }

  const createAnswer = async (QuestionAnswerID, isAnswering) => {
    const lastAnswerID = await getLastAnswer();
    const response = await axios.post(`http://localhost:5000/queueoverflow/answers`, {
      AnswerID: lastAnswerID+1,
      QuestionAnswerID: QuestionAnswerID,
      Answer: currentAnswer,
      isAnswering: isAnswering,
    });
  }
  
  async function submit(QuestionAnswerID){
    if (currentAnswer === '') {
      setValidAnswer(false)
    } else {
      setValidAnswer(true)
    }
    if (validAnswer && currentUser !== '') {
      const lastQuestionAnswerID = await getLastQuestionAnswer();
      await createQuestionAnswer(lastQuestionAnswerID);
      await createAnswer(lastQuestionAnswerID+1, QuestionAnswerID);
      navigate(0, { replace: true })
    }
    if (currentUser ===''){
      navigate("/signin")
    }
  }

  const bgTextArea = useColorModeValue('gray.100', 'gray.800')
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
      { currentFocus === 'question' &&
        <Box 
          display="flex" 
          flexDirection="row"
          >
          <Textarea 
            isInvalid={!validAnswer}
            size="lg" 
            placeholder="Enter the description of your problem" 
            rounded="md" 
            marginTop="15px"
            value={currentAnswer}
            bgColor={bgTextArea}
            onChange={(e) => writing(e.target.value)}
            marginRight="15px"
          />
          <Button
            bg="#FFA500" 
            _hover={{ bg: '#FF7F50' }}
            rounded="md"
            marginTop="15px"
            color="white"
            size="lg"
            onClick={() => submit()}
          >Submit</Button>
        </Box>
      }
      {answers.map((answer) => (
          <Box 
            cursor="pointer" 
            onClick={() => clickAnswer(answer.AnswerID)}
            display="flex"
            flexDirection="column"
            marginLeft={answer.marginleft*5 > 10 ? 10*5+"%" : answer.marginleft*5+"%"}
          >
            <Tooltip hasArrow label="Click to answer" marginLeft="100px" placement="top-start" >
              <Answer key={answer.AnswerID} {...answer} />
            </Tooltip>
            {currentFocus === answer.AnswerID && (
              <Box 
              display="flex" 
              flexDirection="row"
              marginTop="15px"
              >
              <Textarea 
                isInvalid={!validAnswer}
                size="lg" 
                placeholder="Enter the description of your problem" 
                rounded="md" 
                value={currentAnswer}
                bgColor={bgTextArea}
                onChange={(e) => writing(e.target.value)}
                marginRight="15px"
              />
              <Button
                bg="#FFA500" 
                _hover={{ bg: '#FF7F50' }}
                rounded="md"
                marginTop="15px"
                color="white"
                size="lg"
                onClick={() => submit(answer.QuestionAnswerID)}
              >Submit</Button>
            </Box>
          )}
          </Box>
      ))}
      <Box height={"30px"} />
    </div>
  );
};

export default RepositoryCard;