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
import { useQuery } from "react-query";
import { fetchCompleted, fetchProduct } from "../utils/api";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("gray.700", "gray.200");
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(null);
  const [completedData, setCompletedData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const {
    data: customerData,
    error: customerError,
    isLoading: isCustomerLoading,
  } = useQuery("customerData", fetchProduct, {
    onSuccess: (data) => {
      setData(data.productData || []);
    },
  });
  const {
    data: completeddata,
    error: completedError,
    isLoading: isCompletedLoading,
  } = useQuery("completedData", fetchCompleted, {
    onSuccess: (data) => {
      setCompletedData(data.productData2 || []);
    },
  });
  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    isEdit && setIsEdit(false);
    setSelectedOrder({});
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsEdit(true);
    handleOpenModal();
  };

  const handleUpdateOrder = (updatedOrder, isEdit) => {
    if (isEdit) {
      const updatedOrders = data.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
      setData(updatedOrders);
      setIsEdit(false);
    } else {
      setData([...data, updatedOrder]);
    }
  };
  const handleTabChange = (index) => {
    setIsCompleted(index === 1);
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
          <Button
            onClick={handleOpenModal}
            colorScheme="blue"
            size="sm"
            isDisabled={isCompleted}
          >
            + New Order
          </Button>
        </Flex>
        <Tabs variant="enclosed" colorScheme="blue" onChange={handleTabChange}>
          <TabList>
            <Tab>Active Orders</Tab>
            <Tab>Completed Orders</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <ActiveOrders handleEdit={handleEdit} data={data} />
            </TabPanel>
            <TabPanel px={0}>
              <CompletedOrders onEdit={handleEdit} data={completedData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isEdit={isEdit}
        orderDetails={selectedOrder}
        handleOrderDetails={handleUpdateOrder}
        isCompleted={isCompleted}
      />
    </Box>
  );
};

export default Dashboard;
