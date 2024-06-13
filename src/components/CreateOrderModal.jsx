import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { MultiSelect } from "chakra-multiselect";

const CreateOrderModal = ({
  isOpen,
  onClose,
  isEdit = false,
  orderDetails = {},
}) => {
  console.log(orderDetails, "order ki detailsss ki ma ki bhencho");
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      products: orderDetails.name || [],
      credits: orderDetails.category || "",
      skus: orderDetails.sku || [
        { sellingRate: "", maxRetailPrice: "", amount: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skus",
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
      addedAt: isEdit ? orderDetails.addedAt : timestamp,
      updatedAt: timestamp,
    };

    if (isEdit) {
      // Add logic to handle edit
      console.log("Edit Order: ", orderData);
    } else {
      // Add logic to handle create
      console.log("Create Order: ", orderData);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? "Edit Order" : "Create Order"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4}>
              <FormLabel>Products</FormLabel>
              <MultiSelect
                placeholder="Select products"
                options={[
                  { label: "Zeus", value: "zeus" },
                  { label: "Athena", value: "athena" },
                  { label: "Hades", value: "hades" },
                  { label: "Apollo", value: "apollo" },
                  { label: "Ares", value: "ares" },
                ]}
                {...register("products")}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Credits</FormLabel>
              <Input placeholder="Enter credits" {...register("credits")} />
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
                  <Text fontWeight="bold">
                    SKU {index + 1}
                    <Button
                      onClick={() => remove(index)}
                      ml={2}
                      size="xs"
                      colorScheme="red"
                    >
                      Remove
                    </Button>
                  </Text>
                  <FormControl mt={2}>
                    <FormLabel>Selling Rate</FormLabel>
                    <Input
                      placeholder="Enter selling rate"
                      {...register(`skus.${index}.sellingRate`)}
                    />
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Max Retail Price</FormLabel>
                    <Input
                      placeholder="Enter max retail price"
                      {...register(`skus.${index}.maxRetailPrice`)}
                    />
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      placeholder="Enter amount"
                      {...register(`skus.${index}.amount`)}
                    />
                  </FormControl>
                </Box>
              ))}
              <Button
                onClick={() =>
                  append({ sellingRate: "", maxRetailPrice: "", amount: "" })
                }
                colorScheme="blue"
                mt={4}
              >
                + Add SKU
              </Button>
            </Box>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
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
