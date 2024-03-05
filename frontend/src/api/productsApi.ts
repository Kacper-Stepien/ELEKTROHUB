const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse, createErrorResponseFromError } from "./utils";

export const getProductsByCategory = async (
  categoryName: string,
  page: number = 1,
  perPage: number = 20,
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
