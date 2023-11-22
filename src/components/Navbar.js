import {
    Container,
    Box,
    Avatar,
    Button,
    HStack,
    VStack,
    Image,
    Input,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Link,
    MenuDivider,
    useColorModeValue
  } from '@chakra-ui/react';
  import React, { ReactNode } from 'react';
  
  const IconButton = () => {
    return (
      <Button
        padding="0.4rem"
        width="auto"
        height="auto"
        borderRadius="100%"
        bg="transparent"
        _hover={{ bg: '#f6f6f6' }}
      >
      </Button>
    );
  };
  
  const Navbar = (props) => {
    var getQuestions=null;
    if (props.getQuestions) {
      getQuestions = props.getQuestions;
    }
    const [searchValue, setSearchValue] = React.useState('');

    function handleSearch(key) {
      if (key.keyCode === 13) {
        if (getQuestions!=null){
          getQuestions(searchValue);
        }
      }
    }  

    return (
      <Box
        py="2"
        boxShadow="sm"
        border="0 solid #e5e7eb"
        position="fixed"
        top="0"
        bg={useColorModeValue('white', 'white')}
        width="100%"
        zIndex="1"
      >
        <Container maxW="1280px" px={4} mx="auto" mt={2} mb={2}>
          <HStack spacing={4}>
            <Image
              alt="Queue Overflow logo"
              w={'auto'}
              h={14}
              src={require("../assets/logo.png")}
              position={'absolute'}
              top={'2'}
              left={'0'}
              ml={'4'}           
            />
            <Spacer />
            <Input
              maxW="26rem"
              placeholder="Search..."
              borderColor={useColorModeValue('gray.300', 'white')}
              borderRadius="5px"
              d={{ base: 'none', md: 'block' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {handleSearch(e)}}
            />
            <div>
              <Image
                alt="search logo"
                w={'auto'}
                h={8}
                src={require("../assets/search.png")}
                mr={100}
              />
            </div>
            <HStack spacing={3}>
              <Button color="#fff" mr="30" rounded="md" bg="#FFA500" _hover={{ bg: '#FF7F50' }}>
                Ask a question
              </Button>
              <Menu isLazy>
                <MenuButton as={Button} size="sm" px={0} py={0} rounded="full" backgroundColor={"#ededed"}>
                  <Avatar size="sm" src={'https://avatars2.githubusercontent.com/u/37842853?v=4'} />
                </MenuButton>
                <MenuList
                  zIndex={5}
                  border="2px solid"
                  borderColor={useColorModeValue('gray.700', 'gray.100')}
                  backgroundColor={"#ededed"}
                  mt={3}
                >
                  <Link href="https://dev.to/m_ahmad" _hover={{ textDecoration: 'none' }} isExternal>
                    <MenuItem backgroundColor={"#ededed"}>
                      <VStack justify="start" alignItems="left">
                        <Text fontWeight="500">Name</Text>
                      </VStack>
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem backgroundColor={"#ededed"}>
                    <Text fontWeight="500">Profil</Text>
                  </MenuItem>
                  <MenuItem backgroundColor={"#ededed"}>
                    <Text fontWeight="500">Ask a question</Text>
                  </MenuItem>
                  <MenuItem backgroundColor={"#ededed"}>
                    <Text fontWeight="500">History</Text>
                  </MenuItem>
                  <MenuItem backgroundColor={"#ededed"}>
                    <Text fontWeight="500">Preferences</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem backgroundColor={"#ededed"}>
                    <Text fontWeight="500">Sign Out/In</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
        </Container>
      </Box>
    );
  };
  
  export default Navbar;