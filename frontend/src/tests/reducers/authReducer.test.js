import { login } from "../../actions/authActions";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";
import { user } from "../fixtures/user";

describe("Pruebas en authReducer", () => {
  const initialState = {
    checking: true,
  };
  test("debe retornar el estado por defecto", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("debe retornar el usuario logeado", () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: 123,
        name: "Test",
      },
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ checking: false, ...action.payload });
  });
});
