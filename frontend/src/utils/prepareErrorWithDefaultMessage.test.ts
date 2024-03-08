import { prepareErrorWithDefaultMessage } from "./prepareErrorWithDefaultMessage";

describe("prepareErrorWithDefaultMessage", () => {
  const ERROR_MESSAGE = "An error occurred";
  const error = new Error("An error occurred");

  test("should return the error if it is an instance of Error", () => {
    expect(prepareErrorWithDefaultMessage(error)).toBe(error);
  });

  test("should return a new Error with the default message if the error is not an instance of Error", () => {
    expect(prepareErrorWithDefaultMessage(null, ERROR_MESSAGE)).toEqual(
      new Error(ERROR_MESSAGE),
    );
  });
});
