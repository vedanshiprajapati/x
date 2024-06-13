import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  useColorMode,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const { login, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const [alert, setAlert] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const { success, message } = login(username, password);
    if (success) {
      setIsAuthenticated(true);
      if (keepLoggedIn) {
        localStorage.setItem("isAuthenticated", true);
      }
      if (!keepLoggedIn) {
        localStorage.removeItem("isAuthenticated");
      }
      navigate("/dashboard");
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      {alert && (
        <Alert status="error" position={"absolute"}>
          <AlertIcon />
          <AlertTitle>Incorrect credienticals </AlertTitle>
          <AlertDescription>
            Your password or Username is incorrect.
          </AlertDescription>
        </Alert>
      )}
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box
          bg={colorMode === "light" ? "gray.100" : "gray.700"}
          p={8}
          borderRadius={8}
          boxShadow="lg"
        >
          <Flex justify="space-between" mb={6}>
            <Heading size="lg">Login</Heading>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
            />
          </Flex>
          <Input
            mb={4}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputGroup>
            <Input
              pr="4.5rem"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                h="1.75rem"
                size="sm"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={handleTogglePassword}
              />
            </InputRightElement>
          </InputGroup>
          <Checkbox
            mt={4}
            isChecked={keepLoggedIn}
            onChange={(e) => {
              console.log(e.target.checked, "checkmarkx");
              return setKeepLoggedIn(e.target.checked);
            }}
          >
            Keep me logged in
          </Checkbox>
          <Button mt={4} colorScheme="blue" width="100%" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
