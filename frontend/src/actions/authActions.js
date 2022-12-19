import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          balance: body.balance,
          isPremium: body.isPremium,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/new",
      { name, email, password },
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          balance: body.balance,
          isPremium: body.isPremium,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          balance: body.balance,
          isPremium: body.isPremium,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
};

export const startRemoveUser = (uid) => {
  return async (dispatch) => {
    await fetchConToken("users/remove", { uid }, "POST");
    localStorage.removeItem("token");
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });

export const startRenting = (uid, balance, isPremium, moviePrice) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "users/rent",
      { uid, balance, isPremium, moviePrice },
      "POST"
    );
    const body = await resp.json();
    dispatch(startChecking());
    if (body.ok) {
      console.log(body);
    } else {
      dispatch(checkingFinish());
    }
  };
};
