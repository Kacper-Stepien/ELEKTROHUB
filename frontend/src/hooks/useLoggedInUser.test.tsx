import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { describe, expect, test } from "vitest";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useLoggedInUser } from "./useLoggedInUser";

const mockStore = configureStore([]);

const initialState = {
  user: {
    _id: "",
    email: "",
  },
};

describe("useLoggedInUser hook", () => {
  let store: MockStoreEnhanced<unknown, NonNullable<unknown>>;
  let result;

  test("should have loggedIn set to false when user id and email are empty", () => {
    store = mockStore(initialState);
    result = renderHook(() => useLoggedInUser(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    }).result;

    const { loggedIn } = result!.current;

    expect(loggedIn).toBe(false);
  });

  test("should have loggedIn set to true when user id and email are not empty", () => {
    store = mockStore({
      user: {
        _id: "1",
        email: "kacper@gmail.com",
      },
    });
    result = renderHook(() => useLoggedInUser(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    }).result;

    const { loggedIn } = result!.current;
    expect(loggedIn).toBe(true);
  });

  test("should have loggedIn set to false when user id is empty and email is not empty", () => {
    store = mockStore({
      user: {
        _id: "",
        email: "kacper@gmail.com",
      },
    });
    result = renderHook(() => useLoggedInUser(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    }).result;

    const { loggedIn } = result!.current;
    expect(loggedIn).toBe(false);
  });

  test("should have loggedIn set to false when user id is not empty and email is empty", () => {
    store = mockStore({
      user: {
        _id: "1",
        email: "",
      },
    });
    result = renderHook(() => useLoggedInUser(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    }).result;

    const { loggedIn } = result!.current;
    expect(loggedIn).toBe(false);
  });

  test("should have loggedIn set to false when user id is undefined and email is undefined", () => {
    store = mockStore({
      user: {},
    });
    result = renderHook(() => useLoggedInUser(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    }).result;

    const { loggedIn } = result!.current;
    expect(loggedIn).toBe(false);
  });
});
