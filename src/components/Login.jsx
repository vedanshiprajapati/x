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
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const { username, password } = data;
    const { success, message } = login(username, password);
    if (success) {
      setIsAuthenticated(true);
      if (keepLoggedIn) {
        localStorage.setItem("isAuthenticated", true);
      } else {
        localStorage.removeItem("isAuthenticated");
      }
      navigate("/dashboard");
    } else {
      setAlert(true);
    }
  };

  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box
          bg={colorMode === "light" ? "gray.100" : "gray.700"}
          p={8}
          borderRadius={8}
          boxShadow="lg"
          width="100%"
          maxW="sm"
        >
          <Flex justify="space-between" mb={6}>
            <Heading size="lg">Login</Heading>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              aria-label="Toggle Color Mode"
              onClick={toggleColorMode}
            />
          </Flex>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Input
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <Text color="red.500">{errors.username.message}</Text>
            )}
            <InputGroup mt={4}>
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
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
            {errors.password && (
              <Text color="red.500" mb={2}>
                {errors.password.message}
              </Text>
            )}
            {alert && (
              <Text color="red.500" mb={4}>
                Your username or password is incorrect.
              </Text>
            )}
            <Checkbox
              mt={4}
              isChecked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
            >
              Keep me logged in
            </Checkbox>
            <Button mt={4} colorScheme="blue" width="100%" type="submit">
              Login
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
