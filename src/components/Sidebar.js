import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Image,
  Button,
  Heading,
  Stack,
  VStack,
  BoxProps,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { useWindowDimensions } from './getWindowDimensions';
import { Link } from "react-router-dom";

function getWidth(width){
  if (width > 800){
    return "20vw"
  }
  else{
    return "150px"
  }

}

export function SideBar(props) {
  const { height, width } = useWindowDimensions();
  
  return (
      <Box
      as="nav"
      pos="fixed"
      top="74px"
      left="0"
      zIndex="sticky"
      h="full"
      // pb="10"
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue('inherit', 'gray.700')}
      borderRightWidth="1px"
      w={getWidth(width)}
      {...props}
    >
      <VStack h="full" w="full" alignItems="flex-start" justify="space-between">
        <Box w="full">
          <Flex px="4" py="5" align="center">
            <Text
              fontSize="2xl"
              ml="2"
              color={useColorModeValue('brand.500', 'white')}
              fontWeight="semibold"
            >
              Queue Overflow
            </Text>
          </Flex>
          <Flex
            direction="column"
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
        </Box>

        <Flex px="4" py="5" mt={10} justify="center" alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              size={'sm'}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              _hover={{ textDecoration: 'none' }}
            >
              <Avatar
                size={'sm'}
                name="Ahmad"
                src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              />
            </MenuButton>
            <MenuList fontSize={17} zIndex={5555}>
              <MenuItem as={Link} to="#">
                My profile
              </MenuItem>
              <MenuItem as={Link} to="#">
                Change password
              </MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </VStack>
    </Box>
  );
} 

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