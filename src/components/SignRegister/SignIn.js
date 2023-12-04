import { useState, useRef, useEffect, useContext } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { LastPageContext } from "./../../LastPageContext";


const SimpleSignIn = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const emailRef = useRef(null);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const lastPage = useContext(LastPageContext);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const comparePassword = async (password, hash) => {
    const response = await axios.get(`http://localhost:5000/queueoverflow/checkPassword/${password}/${hash}`);
    return response.data.result;
  }

  async function submit() {
    if (email !== "" || password !== "") {
      const response = await axios.get(`http://localhost:5000/queueoverflow/users/email/${email}`);
      if (response.data && await comparePassword(password, response.data.password)) {
        props.setUser(response.data.Username);
        navigate(lastPage)
      }
      else {
        setIsValid(false);
      }
    }
  }

  function handleSearch(key, type) {
    if (key.keyCode === 13) {
      if (type==="email") {
        passwordRef.current.focus();
      } else if (type==="password") {
        submit()
      }
    }
  }

  useEffect(() => {
    props.setUser("");
  }, []);

  useEffect(() => {
    setIsValid(true);
  }, [email, password]);

  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <Center>
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign in to your account</Heading>
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
                  isInvalid={!isValid}
                  rounded="md" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {handleSearch(e, "email")}}
                  ref={emailRef}

                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input 
                    isInvalid={!isValid}
                    rounded="md" 
                    type={show ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {handleSearch(e, "password")}}
                    ref={passwordRef}
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
                <Checkbox 
                  colorScheme="green" 
                  size="md" 
                  checked={true}
                  defaultChecked={true}
                >
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
                onClick={submit}
              >
                Sign in
              </Button>
            </VStack>
          </VStack>
          <Stack align="center">
            <LinkDom to="/register">
                <Link to="" fontSize={{ base: 'md', sm: 'md' }}>Don't have an account? Sign up</Link>
            </LinkDom>
          </Stack>
        </Stack>
      </Center>
    </Container>
  );
};

export default SimpleSignIn;