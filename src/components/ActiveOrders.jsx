import React, { useEffect, useState } from "react";
import { Box, Table, Tbody, Tr, Td, Button, Thead, Th } from "@chakra-ui/react";
import { fetchProduct } from "../utils/api";
import { useQuery } from "react-query";
import Order from "./Order";

const ActiveOrders = ({ handleEdit, data = null }) => {
  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Product name</Th>
            <Th>Characteristics</Th>
            <Th>SKU</Th>
            <Th>More</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data?.map((order) => (
              <Order
                order={order}
                handleButton={() => handleEdit(order)}
                key={order?.id}
              />
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ActiveOrders;
