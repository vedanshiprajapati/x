import React, { useState } from "react";
import { Box, Table, Tbody, Tr, Td, Th, Thead } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchCompleted } from "../utils/api";
import Order from "./Order";

const CompletedOrders = ({ onEdit }) => {
  const [data, setData] = useState(null);
  const {
    data: productData,
    error,
    isLoading,
  } = useQuery("productData", fetchCompleted, {
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
                isReadOnly
              />
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompletedOrders;
