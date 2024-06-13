import React, { useEffect, useState } from "react";
import { Box, Table, Tbody, Tr, Td, Button, Thead, Th } from "@chakra-ui/react";
import { fetchProduct } from "../utils/api";
import { useQuery } from "react-query";
import Order from "./Order";

const ActiveOrders = ({ onEdit }) => {
  const [data, setData] = useState(null);

  const {
    data: productData,
    error,
    isLoading,
  } = useQuery("productData", fetchProduct, {
    onSuccess: (data) => {
      setData(data.productData);
    },
  });

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Product name</Th>
            <Th>characteristics</Th>
            <Th>sku</Th>
            <Th>More</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data?.map((order) => (
              <Order
                order={order}
                handleButton={() => onEdit(order)}
                key={order?.id}
                isActive={true}
              />
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ActiveOrders;
