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
  Box
} from '@chakra-ui/react';
import { MdOutlineQuestionAnswer } from "react-icons/md";


const FeaturedArticles = (props) => {
  const textColor = useColorModeValue('gray.500', 'gray.200');
  var answers=[];
  if (props.Answer !== undefined)
    answers=props.Answer.split("\n");

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
                        {answers[0]}
                      </Text>
                      <Icon as={MdOutlineQuestionAnswer} boxSize="1.2em"/>

                  </Box>
                  {
                    answers.slice(1, answers.lenght).map((answer) => (
                      <Text fontWeight="550" marginBottom="10px" fontSize={"xl"}>
                        {answer}
                      </Text>
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