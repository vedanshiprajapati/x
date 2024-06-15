import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";

const CreateOrderModal = ({
  isOpen,
  onClose,
  isEdit = false,
  orderDetails = {},
  handleOrderDetails,
  isCompleted,
}) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: orderDetails?.name || "",
      characteristics: orderDetails?.characteristics || "",
      sku: orderDetails?.sku
        ? orderDetails.sku.map((skuItem) => ({
            selling_price: skuItem.selling_price,
            max_retail_price: skuItem.max_retail_price,
            amount: skuItem.amount,
          }))
        : [{ selling_price: "", max_retail_price: "", amount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sku",
  });

  useEffect(() => {
    if (isEdit) {
      reset(orderDetails);
    }
  }, [isEdit, orderDetails, reset]);

  const onSubmit = (data) => {
    const timestamp = new Date().toISOString();
    const orderData = {
      ...data,
      sku: data.sku.map((skuItem) => ({
        selling_price: skuItem.selling_price,
        max_retail_price: skuItem.max_retail_price,
        amount: skuItem.amount,
      })),
      addedAt: isEdit ? orderDetails.addedAt : timestamp,
      updatedAt: timestamp,
      id: Math.floor(Math.random() * 900) + 100,
    };

    if (isEdit) {
      const updatedOrderDetails = {
        ...orderDetails,
        name: orderData.name,
        characteristics: orderData.characteristics,
        sku: orderData.sku,
        updatedAt: orderData.updatedAt,
      };

      handleOrderDetails(updatedOrderDetails, isEdit);
    } else {
      handleOrderDetails(orderData, isEdit);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? "Edit Order" : "Create Order"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxHeight="calc(100vh - 200px)">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4} isInvalid={errors.name}>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder="Enter product name"
                {...register("name", { required: "Product name is required" })}
                readOnly={isCompleted}
              />
              {errors.name && (
                <Text color="red.500">{errors.name.message}</Text>
              )}
            </FormControl>
            <FormControl mb={4} isInvalid={errors.characteristics}>
              <FormLabel>Characteristics</FormLabel>
              <Input
                placeholder="Enter characteristics"
                {...register("characteristics", {
                  required: "Characteristics are required",
                })}
                readOnly={isCompleted}
              />
              {errors.characteristics && (
                <Text color="red.500">{errors.characteristics.message}</Text>
              )}
            </FormControl>

            <Box mt={4}>
              {fields.map((item, index) => (
                <Box
                  key={item.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mb={4}
                >
                  <Flex justifyContent={"space-between"}>
                    <Text fontWeight="bold">SKU {index + 1}</Text>
                    <Button
                      onClick={() => remove(index)}
                      ml={2}
                      size="xs"
                      colorScheme="red"
                      isDisabled={isCompleted}
                    >
                      X
                    </Button>
                  </Flex>
                  <FormControl
                    mt={2}
                    isInvalid={errors?.sku?.[index]?.selling_price}
                  >
                    <FormLabel>Selling Rate</FormLabel>
                    <Input
                      placeholder="Enter selling rate"
                      {...register(`sku.${index}.selling_price`, {
                        required: "Selling rate is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          !isNaN(value) || "Selling rate must be a number",
                      })}
                      readOnly={isCompleted}
                    />
                    {errors?.sku?.[index]?.selling_price && (
                      <Text color="red.500">
                        {errors.sku[index].selling_price.message}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl
                    mt={2}
                    isInvalid={errors?.sku?.[index]?.max_retail_price}
                  >
                    <FormLabel>Max Retail Price</FormLabel>
                    <Input
                      placeholder="Enter max retail price"
                      {...register(`sku.${index}.max_retail_price`, {
                        required: "Max retail price is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          !isNaN(value) || "Max retail price must be a number",
                      })}
                      readOnly={isCompleted}
                    />
                    {errors?.sku?.[index]?.max_retail_price && (
                      <Text color="red.500">
                        {errors.sku[index].max_retail_price.message}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl mt={2} isInvalid={errors?.sku?.[index]?.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      placeholder="Enter amount"
                      {...register(`sku.${index}.amount`, {
                        required: "Amount is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          !isNaN(value) || "Amount must be a number",
                      })}
                      readOnly={isCompleted}
                    />
                    {errors?.sku?.[index]?.amount && (
                      <Text color="red.500">
                        {errors.sku[index].amount.message}
                      </Text>
                    )}
                  </FormControl>
                </Box>
              ))}
              <Button
                onClick={() =>
                  append({
                    selling_price: "",
                    max_retail_price: "",
                    amount: "",
                  })
                }
                colorScheme="blue"
                mt={4}
                isDisabled={isCompleted}
              >
                + Add SKU
              </Button>
            </Box>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isDisabled={isCompleted}
              >
                {isEdit ? "Save" : "Create"}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateOrderModal;
