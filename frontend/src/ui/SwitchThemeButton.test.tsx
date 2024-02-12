import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import SwitchThemeButton from "./SwitchThemeButton";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const initialState = { theme: { theme: "dark" } };

describe("SwitchThemeButton component", () => {
  let store;

  test("should render the button", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("should display FaMoon icon when theme is light", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const icon = screen.getByLabelText("jasny motyw");
    expect(icon).toBeInTheDocument();
  });

  test("should display FaSun icon when theme is dark", () => {
    store = mockStore({ theme: { theme: "light" } });
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const icon = screen.getByLabelText("ciemny motyw");
    expect(icon).toBeInTheDocument();
  });

  test("should dispatch setThemeLight action when theme is dark", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const button = screen.getByRole("button");
    button.click();
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "theme/setThemeLight" });
  });

  test("should dispatch setThemeDark action when theme is light", () => {
    store = mockStore({ theme: { theme: "light" } });
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const button = screen.getByRole("button");
    button.click();
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "theme/setThemeDark" });
  });

  test("should add dark class to documentElement when theme is light and click", () => {
    store = mockStore({ theme: { theme: "light" } });
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const button = screen.getByRole("button");
    button.click();
    expect(document.documentElement.classList.contains("dark")).toBeTruthy();
  });

  test("should remove dark class from documentElement when theme is dark and click", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const button = screen.getByRole("button");
    button.click();
    expect(document.documentElement.classList.contains("dark")).toBeFalsy();
  });

  test("should set theme to dark in localStorage when theme is light and click", () => {
    store = mockStore({ theme: { theme: "light" } });
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const button = screen.getByRole("button");
    button.click();
    expect(localStorage.getItem("ElektroHub:theme")).toBe("dark");
  });

  test("should set theme to light in localStorage when theme is dark and click", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SwitchThemeButton />
      </Provider>
    );
    const button = screen.getByRole("button");
    button.click();
    expect(localStorage.getItem("ElektroHub:theme")).toBe("light");
  });
});
