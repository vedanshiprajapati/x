import React, { useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  useColorMode,
  Icon,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AuthContext } from "../AuthContext";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, logout } = useContext(AuthContext);
  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.800"} py={4}>
      <Flex
        justify="space-between"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={6}
      >
        <Flex alignItems="center">
          <Heading size="lg" mr={6}>
            <Link to="/">X</Link>
          </Heading>
          <Button size="sm" colorScheme="blue" variant="outline">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </Flex>
        <Flex alignItems="center">
          <IconButton
            icon={<Icon as={colorMode === "light" ? MoonIcon : SunIcon} />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            mr={4}
          />
          <Button colorScheme="blue">
            {isAuthenticated ? (
              <Text
                onClick={() => {
                  logout();
                }}
              >
                Log Out
              </Text>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
