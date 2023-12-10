import React from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Container,
  Icon,
  Box,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useWindowDimensions } from './../getWindowDimensions'


const FeaturedArticles = (props) => {
  const textColor = useColorModeValue('gray.500', 'gray.200');
  var answers=[];
  const { height, width } = useWindowDimensions();
  if (props.Answer !== undefined)
    answers=props.Answer.split("\n");

  const getAnswer = (answer) => {
    const ind1=answer.indexOf("<<<");
    const ind2=answer.indexOf(">>>");
    const lstStringBetween = answer.substring(ind1+3, ind2).split(";");
    if (ind1 !== -1 && ind2 !== -1 && lstStringBetween.length === 2 && !isNaN(lstStringBetween[1])){
      return (
        <Text fontWeight="550" fontSize={"xl"}>
          {answer.substring(0, ind1)}
          <Link to={`/exerciseLink?id=${lstStringBetween[1]}`} >
            <ChakraLink fontWeight="550" fontSize={"xl"} color="orange" marginLeft="5px" marginRight="5px">
              {lstStringBetween[0]}
            </ChakraLink>
          </Link>
          {answer.substring(ind2+3, answer.length)}
        </Text>
      )
    }
    else{
      return (
        <Text fontWeight={width>700?"550":"450"} marginBottom="10px" fontSize={"xl"}>
          {answer}
        </Text>
      )
    }
  }

  return (
    <Container 
      maxW={"100%"} 
      margin={"0px"} 
      padding={"0px"}
      rounded="xl"
      marginTop={"15px"}
      >
      <VStack align="start" spacing={8} width="100%">
        <SimpleGrid columns={1} spacing={4} w="100%">
            <VStack
              spacing={2}
              p={4}
              _hover={{ shadow: 'md', textDecoration: 'none' }}
              borderWidth="1px"
              position="relative"
              rounded="md"
              bg={'white'}
              align="left"
            >
              <HStack justifyContent="space-between" width="100%">
                <Heading fontSize="xl" align="left" mt={0}  width="100%">
                  <Box
                    display="flex"
                    flexDirection={"row"} 
                    justifyContent={"space-between"} 
                    width="100%"
                  >
                      <Text fontWeight="550" marginBottom="10px" fontSize={"xl"}>
                        {getAnswer(answers[0])}
                      </Text>
                      <Icon as={MdOutlineQuestionAnswer} boxSize="1.2em"/>

                  </Box>
                  {
                    answers.slice(1, answers.lenght).map((answer) => (
                      getAnswer(answer)
                    ))
                  }
                </Heading>
              </HStack>
              <div style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",

              }}>
                <Text fontSize="lg" fontWeight="600" color={textColor} marginRight="20px">
                  {props.Date}
                </Text>
                <Text fontSize="lg" fontWeight="600" color={"orange"}>
                  {props.user}
                </Text>
              </div>
            </VStack>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default FeaturedArticles;