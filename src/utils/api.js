import {
  customerData,
  productData,
  payloadData,
  productData2,
} from "./constants";

export async function fetchCustomer() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { customerData };
}
export async function fetchProduct() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { productData };
}
export async function fetchCompleted() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { productData2 };
}
export async function fetchPayload() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { payloadData };
}
