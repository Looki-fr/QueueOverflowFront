import { useState, useRef, useEffect, useContext } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
  Image
} from '@chakra-ui/react';
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
// Here we have used react-icons package for the icons
import Navbar from '../Navbar';
import { useWindowDimensions } from './../getWindowDimensions'
import { UserContext } from "./../../UserContext";
import { useNavigate } from "react-router-dom";

function getHeight(height){
    return height-72;
  }

const AskQuestion = (props) => {
    const { height, width } = useWindowDimensions();
    const [title, setTitle] = useState('');
    const titleRef = useRef(null);
    const [validTitle, setValidTitle] = useState(true);
    const [description, setDescription] = useState('');
    const descriptionRef = useRef(null);
    const [validDescription, setValidDescription] = useState(true);
    const [tag, setTag] = useState('');
    const tagRef = useRef(null);
    const [validTag, setValidTag] = useState(true);
    var pressedEnterTag = false;
    const user = useContext(UserContext);
    const navigate = useNavigate();

    function handleChangeDescription(value) {
        if (!pressedEnterTag) {
            setDescription(value);
        } else {
            pressedEnterTag = false;
            setDescription((before) => before.slice(0, -1))
        }
    }

    function handleSearch(key, type) {
        if (key.keyCode === 13) {
          if (type==="title") {
            tagRef.current.focus();
          } else if (type==="tag") {
            descriptionRef.current.focus();
            pressedEnterTag = true;
          }
        }
      }

    function getDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy+ '-' +  mm + '-' + dd;
        return today;
    }

    const validInvalid = (value, type) => {
        if (title === '') {
            setValidTitle(false);
        } else {
            setValidTitle(true);
        }
        if (description === '') {
            setValidDescription(false);
        } else {
            setValidDescription(true);
        }
        if (tag === '') {
            setValidTag(false);
        } else {
            setValidTag(true);
        }
    }

    const saveQuestion = async () => {
        validInvalid()
        if (validTitle && validDescription && validTag) {
            const lastQuestionAnswerID = await getLastQuestionAnswer();
            await createQuestionAnswer(lastQuestionAnswerID)     
            const lastQuestionID = await createQuestion(lastQuestionAnswerID);
            navigate(`/question?id=${lastQuestionID}`)       
        }
    }

    const createQuestion = async (lastQuestionAnswerID) => {
        const lastQuestionID = await getLastQuestion();
        await axios.post('http://localhost:5000/queueoverflow/questions',{
            QuestionID: lastQuestionID+1,
            Title: title,
            Description: description,
            Tag: tag,
            QuestionAnswerID: lastQuestionAnswerID+1,
        });
        return lastQuestionID+1;
    }

    const getUserID = async () => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/usersByName/${user}`);
        return response.data.UserID;
    }

    const createQuestionAnswer = async (lastQuestionAnswerID) => {
        await axios.post('http://localhost:5000/queueoverflow/questionAnswers',{
            QuestionAnswerID: lastQuestionAnswerID+1,
            Date: getDate(),
            UserID: await getUserID(),
        });
    }

    const getLastQuestionAnswer = async () => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/lastQuestionAnswer`);
        return response.data.QuestionAnswerID;    
    }

    const getLastQuestion = async () => {
        const response = await axios.get(`http://localhost:5000/queueoverflow/lastQuestion`);
        return response.data.QuestionID;
    }

    useEffect(() => {
        props.setLastPage("/askQuestion");
    }, []);

    useEffect(() => {
        if (title !== '') {
            setValidTitle(true)
        }
    }, [title]);

    useEffect(() => {
        if (description !== '') {
            setValidDescription(true)
        }
    }, [description]);

    useEffect(() => {
        if (tag !== '') {
            setValidTag(true)
        }
    }, [tag]);

    const bgColor = useColorModeValue('white', 'gray.700')

     return (
        <div>
            <Navbar/>
            <div style={{
            position: 'relative',
            height: getHeight(height),
            width: width>700?"80%":"100%",
            marginTop: "80px",
            alignItems:'center',
            justifyContent:'center',
            marginLeft:width>700?"10%":"0%",
            marginRight: width>700?"10%":"0%",
            }}>
                {
                    user && (
                        <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
                            <Stack spacing={10}>
                                <Flex align="center" justify="center" direction="column">
                                <Heading fontSize={width>700?"5xl":"4xl"} mb={2}>
                                    Ask a question
                                </Heading>
                                <Text fontSize="xl" textAlign="center">
                                    Please be sure that an other user has not already asked the same question before you.
                                </Text>
                                </Flex>
                                <VStack
                                    as="form"
                                    spacing={8}
                                    w="100%"
                                    bg={bgColor}
                                    rounded="lg"
                                    boxShadow="lg"
                                    p={{ base: 5, sm: 10 }}
                                >
                                <VStack spacing={4} w="100%">
                                    <FormControl id="title" isInvalid={!validTitle}>
                                        <FormLabel fontSize={"2xl"}>Title</FormLabel>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter a concise title" 
                                            rounded="md" 
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)}
                                            ref={titleRef}
                                            onKeyDown={(e) => handleSearch(e, "title")}
                                            fontSize={"lg"}
                                        />
                                    </FormControl>
                                    <FormControl id="tag" isInvalid={!validTag}>
                                        <FormLabel fontSize={"2xl"}>Tag</FormLabel>
                                        <Input 
                                            type="text" 
                                            placeholder="tag" 
                                            rounded="md" 
                                            value={tag}
                                            onChange={(e) => {setTag(e.target.value)}}
                                            ref={tagRef}
                                            onKeyDown={(e) => handleSearch(e, "tag")}
                                            fontSize={"lg"}
                                        />
                                    </FormControl>
                                    <FormControl id="description" isInvalid={!validDescription}>
                                        <FormLabel fontSize={"2xl"}>Description</FormLabel>
                                        <Textarea 
                                            size="lg" 
                                            placeholder="Enter the description of your problem" 
                                            rounded="md" 
                                            value={description}
                                            onChange={(e) => handleChangeDescription(e.target.value)}
                                            ref={descriptionRef}
                                        />
                                    </FormControl>
                                </VStack>
                                <VStack w="100%">
                                    <Button
                                    color="white"
                                    bg="#FFA500" 
                                    _hover={{ bg: '#FF7F50' }} 
                                    rounded="md"
                                    w={{ base: '100%', md: 'max-content' }}
                                    onClick={saveQuestion}
                                    >
                                        Ask question
                                    </Button>
                                </VStack>
                                </VStack>
                            </Stack>
                        </Container>
                    )
                }
                {
                    !user && (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            
                        }}>
                            <Image
                                alt="not logged in gif"
                                w={'auto'}
                                h={"xs"}
                                src={require("../../assets/google-login.gif")}
                                alignSelf={"center"}
                                marginBottom={"30px"}
                            />
                            <Heading 
                                fontSize={"2xl"}
                                fontWeight={"500"}
                                textAlign={"center"}
                                marginBottom={"30px"}
                            >
                                You are not logged in !
                            </Heading>
                            <Heading
                                fontSize={"2xl"}
                                fontWeight={"500"}
                                textAlign={"center"}
                                marginBottom={"30px"}
                            >
                                Please consider <Link style={{color:"#FF7F50"}} to={"/signin"}>
                                    Loggin in
                                </Link> or <Link style={{color:"#FF7F50"}} to={"/register"}>
                                    Registering
                                </Link> to ask a question.
                            </Heading>
                        </div>

                    )
                }
            </div>
        </div>
  );
};

export default AskQuestion;