import { useState, useEffect, useRef, useContext } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link
} from '@chakra-ui/react';
import { Link as LinkDom} from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { LastPageContext } from "./../../LastPageContext";
import { useWindowDimensions } from './../getWindowDimensions'

const SimpleSignIn = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const emailRef = useRef(null);
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(true);
  const nameRef = useRef(null);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const passwordRef = useRef(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const lastPage = useContext(LastPageContext);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  function handleSearch(key, type) {
    if (key.keyCode === 13) {
      if (type==="email") {
        nameRef.current.focus();
      } else if (type==="name") {
        passwordRef.current.focus();
      } else if (type==="password") {
        confirmPasswordRef.current.focus();
      } else if (type==="confirmPassword") {
        saveUser()
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

  const getLastUserID = async () => {
    const response = await axios.get(`http://localhost:5000/queueoverflow/lastUser`);
    return response.data.UserID;    
} 

  const getHashedPassword = async (password) => {
    const response = await axios.get(`http://localhost:5000/queueoverflow/hashPassword/${password}`);
    return response.data.hash;
  }

  async function saveUser() {
    if (password !=='' && password === confirmPassword && email !== '' && name !== '' && emailRegex.test(email)) {
      const response = await axios.get(`http://localhost:5000/queueoverflow/users/email/${email}`);
      if (!response.data) {
        await axios.post('http://localhost:5000/queueoverflow/users',{
            Email: email,
            Username: name,
            Age: 0,
            CreatedAt: getDate(),
            UserID: await getLastUserID()+1,
            password: await getHashedPassword(password),
            doneExercise:''
          });
          props.setUser(name);
          navigate(lastPage)
      } else {
        setEmailValid(false);
      }
    } else if (name === '') {
      setNameValid(false);
    } else if (email === '' || !emailRegex.test(email)) {
      setEmailValid(false);
    }
  }

  useEffect(() => {
    setEmailValid(true);
  }, [email]);

  useEffect(() => {
    if (password === confirmPassword)
      setPasswordValid(true);
    else {
      setPasswordValid(false);
    }
  }, [password, confirmPassword]);
  
  useEffect(() => {
    setNameValid(true);
  }, [name]);
  const { height, width } = useWindowDimensions();

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Create an account</Heading>
          </Stack>
          <VStack
            as="form"
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input 
                  rounded="md" 
                  type="email" 
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleSearch(e, "email")}
                  isInvalid={!emailValid}
                />
                {
                  !emailValid && email!=='' && emailRegex.test(email)? <p style={{
                    color: "red", 
                    marginTop:"10px"
                  }}>Email already exists</p> : null
                }
                {
                  !emailValid && email!=='' && !emailRegex.test(email)? <p style={{
                    color: "red", 
                    marginTop:"10px"
                  }}>Email is not valid</p> : null
                }
              </FormControl>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input 
                  rounded="md" 
                  type="email" 
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => handleSearch(e, "name")}  
                  isInvalid={!nameValid}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input 
                  rounded="md" 
                  type={show ? 'text' : 'password'} 
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleSearch(e, "password")}
                  isInvalid={!passwordValid}
                />
              </FormControl>
              <FormControl id="confirmpassword">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input 
                    rounded="md" 
                    type={show ? 'text' : 'password'} 
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => handleSearch(e, "password")}
                    isInvalid={!passwordValid}
                    />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('gray.300', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('gray.400', 'gray.800')
                      }}
                      onClick={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

            </VStack>
            <VStack w="100%">
              <Stack direction="row" justify="space-between" w="100%">
                <Checkbox colorScheme="green" size="md" defaultChecked={true}>
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: 'md', sm: 'md' }}>Forgot password?</Link>
              </Stack>
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: 'green.500'
                }}
                rounded="md"
                w="100%"
                onClick={saveUser}
              >
                Register
              </Button>
            </VStack>
          </VStack>
          <Stack align="center">
            <LinkDom to="/signin">
                <Link to="" fontSize={{ base: 'md', sm: 'md' }}>Already have an account? Sign in</Link>
            </LinkDom>
          </Stack>
        </Stack>
      </Center>
      { width < 1000 && (
        <Button
          bg="green.300"
          color="white"
          _hover={{
            bg: 'green.500'
          }}
          rounded="md"
          w="100%"
          alignSelf="center"
          onClick={() => navigate(lastPage)}
          justifySelf={"center"}
          marginTop={"10px"}
          >Go back
          </Button>
      )
      }
    </Container>
  );
};

export default SimpleSignIn;