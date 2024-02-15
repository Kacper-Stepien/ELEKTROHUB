import { beforeEach, describe, expect, test } from "vitest";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { Provider } from "react-redux";
import React, { ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { useGlobalLoading } from "./useGlobalLoading";

const mockStore = configureStore([]);

const initialState = {
  loading: {
    loading: false,
  },
};

describe("useGlobalLoading hook", () => {
  let store: MockStoreEnhanced<unknown, NonNullable<unknown>>;
  let result;

  beforeEach(() => {
    store = mockStore(initialState);
    result = renderHook(() => useGlobalLoading(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
      ),
    }).result;
  });

  test("should have loading set to false initially", () => {
    const { isLoading } = result!.current;

    expect(isLoading).toBe(false);
  });

  test("startLoadingHandler should set loading to true", () => {
    const { startLoadingHandler, isLoading } = result!.current;

    startLoadingHandler();
    setTimeout(() => {
      expect(isLoading).toBe(true);
    }, 50);
  });

  test("stopLoadingHandler should set loading to false", () => {
    const { stopLoadingHandler, isLoading, startLoadingHandler } =
      result!.current;

    startLoadingHandler();
    setTimeout(() => {
      expect(isLoading).toBe(true);
    }, 50);
    stopLoadingHandler();
    setTimeout(() => {
      expect(isLoading).toBe(false);
    }, 50);
  });
});
