const ERROR_MESSAGE = import.meta.env.VITE_ERROR_MESSAGE as string;

import { ErrorResponse } from "../types/ErrorResponse.interface";

interface SuccessResponse {
  ok: true;
  status: "success";
  message: string;
}

export const createErrorResponseFromError = (error: unknown): ErrorResponse => {
  if (error instanceof Error) {
    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };
  }
  return {
    success: false,
    statusCode: 500,
    message: ERROR_MESSAGE,
  };
};

export const createErrorResponse = (
  statusCode: number,
  message: string,
): ErrorResponse => {
  return {
    success: false,
    message,
    statusCode,
  };
};

export const createSuccessResponse = (message: string): SuccessResponse => {
  return {
    ok: true,
    status: "success",
    message,
  };
};
