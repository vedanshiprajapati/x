import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  Container,
  Icon,
  Grid,
  GridItem,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  CheckCircleIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";

const HomePage = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const textColor = { light: "gray.600", dark: "gray.300" };
  const headingColor = { light: "gray.800", dark: "white" };

  return (
    <Box bg={bgColor[colorMode]} pt={10} pb={20}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          mb={10}
        >
          <Box
            flex={1}
            textAlign={{ base: "center", md: "left" }}
            mr={{ md: 10 }}
          >
            <Heading as="h1" size="2xl" mb={6} color={headingColor[colorMode]}>
              Streamline Your Sales Orders
            </Heading>
            <Text fontSize="lg" mb={8} color={textColor[colorMode]}>
              Manage your sales orders with ease. Track orders, generate
              invoices, and access detailed reporting - all in one place.
            </Text>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              justify={{ base: "center", md: "flex-start" }}
            >
              <Button colorScheme="blue" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg" colorScheme="blue">
                Learn More
              </Button>
            </Stack>
          </Box>
          <Box flex={1} display={{ base: "none", md: "block" }}>
            <Image
              src="https://i.pinimg.com/originals/8c/22/2c/8c222c3f4bc0a92105d90564f0abac4b.png"
              alt="Illustration"
            />
          </Box>
        </Flex>

        <Box mt={20} textAlign="center">
          <Heading as="h2" size="xl" mb={10} color={headingColor[colorMode]}>
            Key Features
          </Heading>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={12}
          >
            <GridItem>
              <Flex direction="column" align="center" textAlign="center">
                <Icon as={CalendarIcon} color="blue.500" boxSize={12} mb={4} />
                <Heading
                  as="h3"
                  size="lg"
                  mb={4}
                  color={headingColor[colorMode]}
                >
                  Order Tracking
                </Heading>
                <Text color={textColor[colorMode]}>
                  Monitor the status of your orders in real-time, from placement
                  to delivery.
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex direction="column" align="center" textAlign="center">
                <Icon
                  as={CheckCircleIcon}
                  color="blue.500"
                  boxSize={12}
                  mb={4}
                />
                <Heading
                  as="h3"
                  size="lg"
                  mb={4}
                  color={headingColor[colorMode]}
                >
                  Invoice Generation
                </Heading>
                <Text color={textColor[colorMode]}>
                  Generate professional invoices with just a few clicks, keeping
                  your billing process streamlined.
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex direction="column" align="center" textAlign="center">
                <Icon
                  as={InfoOutlineIcon}
                  color="blue.500"
                  boxSize={12}
                  mb={4}
                />
                <Heading
                  as="h3"
                  size="lg"
                  mb={4}
                  color={headingColor[colorMode]}
                >
                  Detailed Reporting
                </Heading>
                <Text color={textColor[colorMode]}>
                  Access comprehensive reports and analytics to gain valuable
                  insights into your sales performance.
                </Text>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
