import { AppRouter } from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
export const MovieRentalApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
