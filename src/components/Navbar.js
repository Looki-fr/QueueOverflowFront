import {
  Container,
  Box,
  Avatar,
  Button,
  HStack,
  VStack,
  Image,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import React, { ReactNode } from 'react';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { Link } from "react-router-dom";

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

const NavItem = (props) => {
  const color = useColorModeValue('gray.600', 'gray.300');

  const { icon, children } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200')
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const Navbar = (props) => {
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
          <Flex
            direction="row"
            as="nav"
            fontSize="md"
            color="gray.600"
            aria-label="Main Navigation"
          >
            <Link to="/">
              <NavItem icon={AiOutlineHome}>Questions</NavItem>
            </Link>
            <Link to="/users">
              <NavItem icon={AiOutlineTeam}>Users</NavItem>
            </Link>
            <Link to="/exercise">
              <NavItem icon={BsFolder2}>Exercises</NavItem>
            </Link>
            <NavItem icon={BsCalendarCheck}>Your questions</NavItem>
          </Flex>
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