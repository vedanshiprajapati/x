import { useState } from "react";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
