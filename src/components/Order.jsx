import { Button, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import CreateOrderModal from "./CreateOrderModal";
const Order = ({ order, handleButton, isActive }) => {
  return (
    <>
      <Tr>
        <Td>{order?.id}</Td>
        <Td>{order?.name}</Td>
        <Td>{order?.characteristics}</Td>
        <Td>{order?.sku.length}</Td>

        <Td>
          <Button onClick={handleButton} colorScheme="blue">
            ...
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default Order;
