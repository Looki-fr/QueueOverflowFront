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
import { useNavigate } from "react-router-dom";
import Answer from './../Answer/Answer';
import axios from "axios";
import { UserContext } from "./../../UserContext";
import { TbDeviceDesktopQuestion } from "react-icons/tb";

const RepositoryCard = (props) => {
    const { exerciseID, date, description, codeAnswer, user, tag } = props;
    const [show, setShow] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [validAnswer, setValidAnswer] = useState(true);
    const [currentFocus, setCurrentFocus] = useState('exercise');
    const currentUser = useContext(UserContext);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
  
    var codeAnswers=[];
    if (codeAnswer !== undefined)
      codeAnswers=codeAnswer.split("\n");

    useEffect(() => {
      getAnswerByIsAnswering(exerciseID);
    }, []);

    const getAnswerByIsAnswering = async (id) => {
        setAnswers(await returnAnswerByIsAnswering(id, 0));
      }
    
    const returnAnswerByIsAnswering = async (id, cpt) => {
      let lst=[];
      var response= {data:{length:0}}
      if (cpt !==0){
        response = await axios.get(`http://localhost:5000/queueoverflow/answers/isAnswering/${id}/answer`);
      }
      var response2= {data:{length:0}}
      if (cpt===0){
        response2 = await axios.get(`http://localhost:5000/queueoverflow/answers/isAnswering/${id}/exercise`);
      }
        let allResponses=[response, response2] 
      for (let y = 0; y < allResponses.length; y++) {
        for (let i = 0; i < allResponses[y].data.length; i++) {
          const addInfo = await getQuestionAnswerById(allResponses[y].data[i].QuestionAnswerID);
          const user = await getUserById(addInfo.UserID);
          lst.push({ ...allResponses[y].data[i], Date: addInfo.Date, user: user.Username, marginleft : cpt })
          const answersLst = await returnAnswerByIsAnswering(allResponses[y].data[i].QuestionAnswerID, cpt+1);
          for (let j = 0; j < answersLst.length; j++) {
            lst.push(answersLst[j]);
          }
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

    const getLastAnswer = async () => {
      const response = await axios.get(`http://localhost:5000/queueoverflow/lastAnswer`);
      return response.data.AnswerID;
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
  
    const createAnswer = async (QuestionAnswerID, isAnswering, type) => {
      const lastAnswerID = await getLastAnswer();
      const response = await axios.post(`http://localhost:5000/queueoverflow/answers`, {
        AnswerID: lastAnswerID+1,
        QuestionAnswerID: QuestionAnswerID,
        Answer: currentAnswer,
        isAnswering: isAnswering,
        Type:type
      });
    }

    const getLastQuestionAnswer = async () => {
      const response = await axios.get(`http://localhost:5000/queueoverflow/lastQuestionAnswer`);
      return response.data.QuestionAnswerID;    
    }

    async function submit(QuestionAnswerID, type){
      if (currentAnswer === '') {
        setValidAnswer(false)
      } else {
        setValidAnswer(true)
      }
      if (validAnswer && currentUser !== '') {
        const lastQuestionAnswerID = await getLastQuestionAnswer();
        await createQuestionAnswer(lastQuestionAnswerID);
        await createAnswer(lastQuestionAnswerID+1, QuestionAnswerID, type);
        getAnswerByIsAnswering(exerciseID)
        setCurrentFocus('exercise')
        setCurrentAnswer('')
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
        onClick={() => setCurrentFocus('exercise')}
        cursor={"pointer"}
      >
        <VStack overflow="hidden" align="start" spacing={1}>
          <VStack spacing={1} align="start" w="100%">
            <Flex
              justifyContent="space-between"
              width="100%"
            >
              <HStack>
                  <Icon as={TbDeviceDesktopQuestion} boxSize="1.5em" mt="1px" marginTop="19px" alignSelf={"flex-start"} justifySelf={"flex-start"}/>
                  <Text fontSize="4xl" noOfLines={3} fontWeight="600" align="left" marginLeft="10px">
                    {description}
                  </Text>
              </HStack>
            </Flex>
            <Flex 
              width="100%" 
              flexDirection="row" 
              justifyContent="space-between"
              alignItems="center"
              marginTop="10px"
            >
              <Box>
                <Button
                    bg="#FFA500"
                    _hover={{ bg: '#FF7F50' }}
                    rounded="md"
                    color="white"
                    size="lg"
                    onClick={() => setShow(!show)}
                  >
                    Show code
                </Button>
                  {
                    show && (
                      <Button
                    bg="#FFA500"
                    _hover={{ bg: '#FF7F50' }}
                    rounded="md"
                    color="white"
                    size="lg"
                    marginLeft="15px"
                    onClick={() => {navigator.clipboard.writeText(codeAnswer)}}
                  >
                    Copy code
                  </Button>
                    )
                    
                  }
              </Box>
              <Flex flexDirection="row">
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
            </Flex>
          </VStack>
            {show && (
            <Box marginTop="15px" marginLeft="30px">
            {
              codeAnswers.map((ca) => (
                <Text color="black.500" fontSize="2xl" noOfLines={2} textAlign="left" marginTop={"5px"}>
                  {ca}
              </Text>
              ))
            }
        </Box>
          )}
            
        </VStack>
      </Box>
      { currentFocus === 'exercise' &&
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
            onClick={() => submit(exerciseID, "exercise")}
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
                onClick={() => submit(answer.QuestionAnswerID, "answer")}
              >Submit</Button>
            </Box>
          )}
          </Box>
      ))}
      <Box height={"30px"} />
    </div>
  );

}

export default RepositoryCard;