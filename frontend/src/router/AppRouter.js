import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../actions/authActions";
import { LoginScreen } from "../components/auth/LoginScreen";
import { MainScreen } from "../components/ui/MainScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { USerScreen } from "../components/ui/UserScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h1>Espere..</h1>;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path="/login"
          component={LoginScreen}
          isAuthenticated={!!uid}
        />

        <PrivateRoute
          exact
          path="/"
          component={MainScreen}
          isAuthenticated={!!uid}
        />
        <PrivateRoute
          exact
          path="/user"
          component={USerScreen}
          isAuthenticated={!!uid}
        />

        <Redirect to={"/"} />
      </Switch>
    </Router>
  );
};
