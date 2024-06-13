import { customerData, productData, payloadData } from "./constants";

export async function fetchCustomer() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Fetching customer");
  return { customerData };
}
export async function fetchProduct() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Fetching product data");
  return { productData };
}
export async function fetchCompleted() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Fetching product data");
  return { productData };
}
export async function fetchPayload() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { payloadData };
}
