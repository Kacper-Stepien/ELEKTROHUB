const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse, createErrorResponseFromError } from "./utils";

export const getCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/api/categories`);
        const data = await response.json();
        if (!response.ok) {
            return createErrorResponse(response.status, data.message);
        }
        return {
            success: true,
            statusCode: response.status,
            message: "Pobrano kategorie",
            data: data.data.categories,
        };
    }
    catch (error) {
        return createErrorResponseFromError(error);
    }
}