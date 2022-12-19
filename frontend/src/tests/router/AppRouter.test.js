import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { AppRouter } from "../../router/AppRouter";

jest.mock("react-modal", () => ({
  setAppElement: () => {},
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("pruebas en <AppRouter/>", () => {
  test("debe de mostrar la pantalla de loading", () => {
    const initState = {
      auth: {
        checking: true,
      },
    };
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.find("h1").text()).toBe("Espere..");
  });

  test("debe de mostrar la pantalla del login", () => {
    const initState = {
      auth: {
        checking: false,
      },
    };
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });
});
