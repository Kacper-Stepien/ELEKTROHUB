import { PRODUCTS_PER_PAGE } from "../../constants";
import { Product } from "../types/Product.interface";
const API_URL = import.meta.env.VITE_API_URL as string;
const ERROR_MESSAGE = import.meta.env.VITE_ERROR_MESSAGE as string;

import { createErrorResponse, createErrorResponseFromError } from "./utils";

export const getProductsByCategory = async (
  categoryName: string,
  page: number = 1,
  perPage: number = PRODUCTS_PER_PAGE,
) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/category/${categoryName}?page=${page}&perPage=${perPage}`,
    );
    const data = await response.json();
    if (!response.ok) {
      return createErrorResponse(response.status, data.message);
    }
    return {
      success: true,
      statusCode: response.status,
      message: "Pobrano produkty",
      products: data.products,
      totalProducts: data.totalProducts,
    };
  } catch (error) {
    return createErrorResponseFromError(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/api/products/id/${id}`);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return Promise.reject(new Error(data.message));
    }
    return Promise.resolve(data.product as Product);
  } catch (error) {
    return Promise.reject(new Error(ERROR_MESSAGE));
  }
};
