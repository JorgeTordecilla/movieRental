import { uiCloseModal, uiOpenModal } from "../../actions/uiActions";
import { uiReducer } from "../../reducers/uiReducer";

describe("Pruebas en uiReducer", () => {
  const initialState = {
    modalOpen: false,
  };

  test("Debe retornar el estado inicial", () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("Debe abrir y cerrar el modal", () => {
    let state = uiReducer(initialState, uiOpenModal());
    expect(state).toEqual({ modalOpen: true });
    state = uiReducer(initialState, uiCloseModal());
    expect(state).toEqual({ modalOpen: false });
  });
});
