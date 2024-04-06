const API_URL = import.meta.env.VITE_API_URL as string;
import { Category } from "../types/Category.interface";
const ERROR_MESSAGE = import.meta.env.VITE_ERROR_MESSAGE as string;

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/api/categories`);
    const data = await response.json();
    if (!response.ok) {
      return Promise.reject(new Error(data.message));
    }
    return Promise.resolve(data.data.categories as Category[]);
  } catch (error) {
    return Promise.reject(new Error(ERROR_MESSAGE));
  }
};
