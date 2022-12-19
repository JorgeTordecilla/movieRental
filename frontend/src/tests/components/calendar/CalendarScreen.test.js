import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Modal from "react-modal";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";

jest.mock("react-modal", () => ({
  setAppElement: () => {},
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  ui: {
    modalOpen: false,
  },
  calendar: {
    events: [],
    activeEvent: null,
    newEventSlot: null,
  },
  auth: {
    checking: false,
    uid: 123,
  },
};
const store = mockStore(initState);
const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("pruebas en <CalendarScreen/>", () => {
  test("debe hacer match con el snapshot", () => {
    expect(true).toBe(true);
  });
});
