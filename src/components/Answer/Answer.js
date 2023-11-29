import React from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Container,
  Icon
} from '@chakra-ui/react';


const FeaturedArticles = (props) => {
  const textColor = useColorModeValue('gray.500', 'gray.200');
  var answers=[];
  if (props.Answer !== undefined)
    answers=props.Answer.split("\n");

  var marginLeft=props.marginleft*"5";
  if (props.marginleft > 10)
    marginLeft=props.marginleft*"5";
  return (
    <Container 
      maxW={100-marginLeft+"%"} 
      margin={"0px"} 
      padding={"0px"}
      rounded="xl"
      marginTop={"15px"}
      marginLeft={marginLeft+"%"}
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
              <HStack justifyContent="space-between" isInline>
                <Heading fontSize="xl" align="left" mt={0}>
                  {
                    answers.map((answer) => (
                      <Text fontWeight="550" marginBottom="10px" fontSize={"lg"}>
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
                <Text fontSize="md" fontWeight="600" color={textColor} marginRight="20px">
                  {props.Date}
                </Text>
                <Text fontSize="md" fontWeight="600" color={"orange"}>
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