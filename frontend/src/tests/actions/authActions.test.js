import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import {
  startChecking,
  startLogin,
  startRegister,
} from "../../actions/authActions";
import * as fetchModule from "../../helpers/fetch";
import { types } from "../../types/types";
import { user } from "../fixtures/user";
// import '@testing-library/jest-dom';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
const { dispatch, getActions, clearActions } = store;
Storage.prototype.setItem = jest.fn();

Swal.fire = jest.fn();
beforeEach(() => {
  clearActions();
  jest.clearAllMocks();
});

const fakeUser = {
  ok: true,
  name: "TesteMock",
  uid: "123",
  token: "MockedToken",
};

describe("pruebas en Auth", () => {
  test("Prueba en la accion startLogin datos correctos", async () => {
    await dispatch(startLogin(user.email, user.password));
    const actions = getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        name: expect.any(String),
        uid: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("Prueba en la accion startLogin contraseña incorrecta", async () => {
    await dispatch(startLogin(user.email, "INCORRECT_PASS"));
    let actions = getActions();
    expect(actions.length).toBe(0);
    expect(Swal.fire).toBeCalledWith("Error", "Contraseña invalida", "error");
  });

  test("Prueba en la accion startLogin correo incorrecta", async () => {
    await dispatch(startLogin("fail@user.com", user.email));
    let actions = getActions();
    expect(actions.length).toBe(0);
    expect(Swal.fire).toBeCalledWith("Error", "El usuario no existe", "error");
  });

  test("Prueba en la accion startRegister datos correctos", async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json: () => ({
        ok: true,
        name: "TesteMock",
        uid: "123",
        token: "MockedToken",
      }),
    }));
    const { name, email, password } = user;
    await dispatch(startRegister(name, email, password));
    const actions = getActions();
    expect(fetchModule.fetchSinToken).toBeCalledWith(
      "auth/new",
      { email, name, password },
      "POST"
    );
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: "123", name: "TesteMock" },
    });
  });

  test("Prueba en la accion startChecking", async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json: () => fakeUser,
    }));
    await dispatch(startChecking());
    const actions = getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: fakeUser.uid, name: fakeUser.name },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });
});
