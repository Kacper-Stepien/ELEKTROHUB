import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Logo from "./Logo";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const initialState = { theme: { theme: "dark" } };

describe("Logo component", () => {
  let store;

  test("should render the logo", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  });

  test("should render the dark logo when theme is dark", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );
    const logo = screen.getByAltText("Logo");
    expect(logo).toHaveAttribute("src", "/src/assets/logo-dark.png");
  });

  test("should render the light logo when theme is light", () => {
    store = mockStore({ theme: { theme: "light" } });
    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );
    const logo = screen.getByAltText("Logo");
    expect(logo).toHaveAttribute("src", "/src/assets/logo-light.png");
  });
});
