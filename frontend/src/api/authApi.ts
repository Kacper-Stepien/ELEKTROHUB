const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse, createErrorResponseFromError } from "./utils";

import { UserForRegistration } from "../types/UserForRegistration.interface";

export const registerUser = async ({
  name,
  surname,
  email,
  phone,
  password,
}: UserForRegistration) => {
  try {
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        phone,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      return createErrorResponse(response.status, data.message);
    }
    return {
      success: true,
      statusCode: response.status,
      message: "Konto zostało utworzone",
      data: data.data as UserForRegistration,
    };
  } catch (error) {
    return createErrorResponseFromError(error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      return createErrorResponse(response.status, data.message);
    }
    return {
      success: true,
      statusCode: response.status,
      message: "Zalogowano",
      data: data.data.user,
    };
  } catch (error) {
    return createErrorResponseFromError(error);
  }
};
