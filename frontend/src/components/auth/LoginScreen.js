import { startLogin, startRegister } from "../../actions/authActions";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import "./login.css";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    email_login: "",
    password_login: "",
  });

  const { email_login, password_login } = formLoginValues;

  const [formRegisterValues, handRegisterInputChange] = useForm({
    name_register: "Pepito",
    email_register: "pepi@mail.com",
    password_register: "123456",
    password2_register: "123456",
  });

  const {
    name_register,
    email_register,
    password_register,
    password2_register,
  } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(email_login, password_login));
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (password_register !== password2_register) {
      return Swal.fire("Error", "Las contraseñas deben coincidir", "error");
    }

    dispatch(startRegister(name_register, email_register, password_register));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="email_login"
                value={email_login}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password_login"
                value={password_login}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name_register"
                value={name_register}
                onChange={handRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="email_register"
                value={email_register}
                onChange={handRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password_register"
                value={password_register}
                onChange={handRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="password2_register"
                value={password2_register}
                onChange={handRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
