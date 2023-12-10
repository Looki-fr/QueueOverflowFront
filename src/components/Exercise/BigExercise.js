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
import { MdRemoveDone } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { useWindowDimensions } from './../getWindowDimensions'

const RepositoryCard = (props) => {
    const { exerciseID, date, description, codeAnswer, user, tag, done } = props;
    const [Done, setDone] = useState(done);
    const [show, setShow] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [validAnswer, setValidAnswer] = useState(true);
    const [currentFocus, setCurrentFocus] = useState('exercise');
    const currentUser = useContext(UserContext);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const { height, width } = useWindowDimensions();
  
    var codeAnswers=[];
    if (codeAnswer !== undefined)
      codeAnswers=codeAnswer.split("\n");

    async function getDone(){
      if (currentUser !== '') {
        const u = await getUserFull();
        return u.doneExercise.split(',').includes(exerciseID.toString());
      }
      return false;
    }

    useEffect(() => {
      getAnswerByIsAnswering(exerciseID);
      getDone().then((res) => setDone(res));
    }, [navigate]);

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

    const getUserFull= async () => {
      const response = await axios.get(`http://localhost:5000/queueoverflow/usersByName/${currentUser}`);
      return response.data;
  }

    async function setDoneExercise(){
      if (currentUser && currentUser !== '') {
        setDone(prev => !prev)
        const u = await getUserFull();
        let doneExercise=""
        if (!Done){
          doneExercise = u.doneExercise + "," + exerciseID;
        }
        else{
          let lst = u.doneExercise.split(",");
          for (let i = 0; i < lst.length; i++) {
            if (lst[i] !== exerciseID.toString()){
              doneExercise = doneExercise + "," + lst[i];
            }
          }
        }
        if (doneExercise[0] === ','){
          doneExercise = doneExercise.substring(1);
        }
        await axios.patch(`http://localhost:5000/queueoverflow/users/updateExerciseDone/${u.UserID}`, {
          doneExercise: doneExercise,
          })
      } else {
        navigate("/signin")
      }
    }

    async function submit(QuestionAnswerID, type){
      if (currentAnswer === '') {
        setValidAnswer(false)
      } else {
        setValidAnswer(true)
      }
      if (currentAnswer!=='' && validAnswer && currentUser !== '') {
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
                  {width>700&&(<Icon as={TbDeviceDesktopQuestion} boxSize="1.5em" mt="1px" marginTop={width>700?"19px":"10px" } alignSelf={"flex-start"} justifySelf={"flex-start"}/>)}
                  <Text fontSize={width>700?"4xl":"2xl"} fontWeight={width>700?"600":"500"} align="left" marginLeft="10px">
                    {description}
                  </Text>
              </HStack>
            </Flex>
            <Flex 
              width="100%" 
              flexDirection={width>700?"row":"column"}
              justifyContent="space-between"
              alignItems="center"
              marginTop="20px"
            >
              <Box display={"flex"} flexDirection={"row"}>
                <Button
                    bg="#FFA500"
                    _hover={{ bg: '#FF7F50' }}
                    rounded="md"
                    color="white"
                    size="lg"
                    onClick={() => setShow(!show)}
                  >
                    {width>700?"Show code":"Show"}
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
                    {width>700?"Copy code":"Copy"}
                  </Button>
                    )
                    
                  }
                  {
                    show && Done && (
                      <Box 
                        onClick={() => setDoneExercise()}
                      >
                        <Icon as={MdRemoveDone} boxSize="2em"marginLeft="15px" mt="1px" marginTop="8px" alignSelf={"flex-start"} justifySelf={"flex-start"}
                          color="grey"
                          _hover={{color:"black"}}
                        />
                      </Box>
                    )
                  }
                  {
                    show && !Done && (
                      <Box onClick={() => setDoneExercise()}>
                        <Icon as={IoMdDoneAll} boxSize="2em" marginLeft="15px" mt="1px" marginTop="8px" alignSelf={"flex-start"} justifySelf={"flex-start"}
                        color="grey"
                        _hover={{color:"black"}}/>
                      </Box>
                    )
                  }
              </Box>
              <Flex flexDirection="row" marginTop={width>700?"0":"20px"} alignSelf={"flex-end"}>
                <Box>
                  <HStack spacing="1">
                    <Tag size="sm" colorScheme="orange" marginTop="3px">
                      <Text fontSize={'lg'}>{tag}</Text>
                    </Tag>
                  </HStack>
                </Box>
                <Box>
                  <HStack spacing="1" marginLeft="15px">
                    {width>700 && (<Text fontSize={'lg'} fontWeight={"550"} color={"gray.500"}>Asked the </Text>)}
                    <Text fontSize={'lg'} fontWeight={"550"} color={"gray.500"}>{date}</Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack spacing="1" marginLeft={"8px"}>
                    {width>700 && (<Text fontSize={'lg'} fontWeight={"550"} color={"gray.500"}>by</Text>)}
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
                <Text color="black.500" fontSize={width>700?"2xl":"xl"} textAlign="left" marginTop={"5px"}>
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
            minH={width>700?"90px":"200px"}
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
                minH={width>700?"90px":"200px"}
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