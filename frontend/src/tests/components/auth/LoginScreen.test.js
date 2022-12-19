import { mount } from "enzyme";
import { Provider } from "react-redux";
import configuerStore from "redux-mock-store";
import thunk from "redux-thunk";

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/authActions";
import Swal from "sweetalert2";

Swal.fire = jest.fn();
jest.mock("../../../actions/authActions", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));

const initState = {};
const middlewares = [thunk];
const mockStore = configuerStore(middlewares);
const store = mockStore(initState);
store.dispatch = jest.fn();
const { dispatch, clearActions } = store;

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);
describe("pruebas en <DeleteEventFab/>", () => {
  beforeEach(() => {
    clearActions();
    jest.clearAllMocks();
  });
  test("debe de hacer match con el snapshot", () => {
    wrapper.find('input[name="email_login"]').simulate("change", {
      target: {
        name: "email_login",
        value: "test@mail.com",
      },
    });
    wrapper.find('input[name="password_login"]').simulate("change", {
      target: {
        name: "password_login",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });
    expect(startLogin).toBeCalledWith("test@mail.com", "123456");
  });

  test("no hay registro si las contraseñas son diferentes", () => {
    wrapper.find('input[name="name_register"]').simulate("change", {
      target: {
        name: "name_register",
        value: "Testing",
      },
    });

    wrapper.find('input[name="email_register"]').simulate("change", {
      target: {
        name: "email_register",
        value: "test@mail.com",
      },
    });
    wrapper.find('input[name="password_register"]').simulate("change", {
      target: {
        name: "password_register",
        value: "12345",
      },
    });
    wrapper.find('input[name="password2_register"]').simulate("change", {
      target: {
        name: "password2_register",
        value: "1234567",
      },
    });
    wrapper
      .find("form")
      .at(1)
      .simulate("submit", { preventDefault() {} });

    expect(startRegister).not.toBeCalled();
    expect(Swal.fire).toBeCalledWith(
      "Error",
      "Las contraseñas deben coincidir",
      "error"
    );
  });

  test("debe registrar si todo es correcto", () => {
    wrapper.find('input[name="name_register"]').simulate("change", {
      target: {
        name: "name_register",
        value: "Testing",
      },
    });

    wrapper.find('input[name="email_register"]').simulate("change", {
      target: {
        name: "email_register",
        value: "test@mail.com",
      },
    });
    wrapper.find('input[name="password_register"]').simulate("change", {
      target: {
        name: "password_register",
        value: "123456",
      },
    });
    wrapper.find('input[name="password2_register"]').simulate("change", {
      target: {
        name: "password2_register",
        value: "123456",
      },
    });
    wrapper
      .find("form")
      .at(1)
      .simulate("submit", { preventDefault() {} });

    expect(Swal.fire).not.toBeCalled();
    expect(startRegister).toBeCalledWith("Testing", "test@mail.com", "123456");
  });
});
