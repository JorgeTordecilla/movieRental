import { mount } from "enzyme";
import { Provider } from "react-redux";
import configuerStore from "redux-mock-store";
import thunk from "redux-thunk";
import { eventStartDelete } from "../../../actions/eventsActions";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
jest.mock("../../../actions/eventsActions", () => ({
  eventStartDelete: jest.fn(),
}));
const initState = {};
const middlewares = [thunk];
const mockStore = configuerStore(middlewares);
const store = mockStore(initState);
store.dispatch = jest.fn();
const { dispatch, clearActions } = store;

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);
describe("pruebas en <DeleteEventFab/>", () => {
  beforeEach(() => {
    clearActions();
  });
  test("debe de hacer match con el snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe llamar la accion eventStartDelete(", () => {
    wrapper.find("button").simulate("click");
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(eventStartDelete).toHaveBeenCalled();
  });
});
