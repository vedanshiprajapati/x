import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import CreateOrderModal from "./CreateOrderModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("gray.700", "gray.200");
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    isEdit && setIsEdit(false);
    setSelectedOrder(null);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsEdit(true);
    handleOpenModal();
  };

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Box
        maxW="4xl"
        mx="auto"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="md"
        borderRadius="md"
        overflow="hidden"
      >
        <Flex justifyContent="space-between" alignItems="center" p={6}>
          <Heading size="lg" color={headingColor}>
            Sale Orders
          </Heading>
          <Button onClick={handleOpenModal} colorScheme="blue" size="sm">
            + New Order
          </Button>
        </Flex>
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Active Orders</Tab>
            <Tab>Completed Orders</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <ActiveOrders onEdit={handleEdit} />
            </TabPanel>
            <TabPanel px={0}>
              <CompletedOrders onEdit={handleEdit} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isEdit={isEdit}
        orderDetails={selectedOrder}
      />
    </Box>
  );
};

export default Dashboard;
