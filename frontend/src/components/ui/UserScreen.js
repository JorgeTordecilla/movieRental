import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rentMoviesStartLoading } from "../../actions/moviesActions";
import { startRemoveUser } from "../../actions/authActions";
import { Navbar } from "./Navbar";
import { MoviesRentList } from "../movies/MoviesRentList";
import Swal from "sweetalert2";

export const USerScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(rentMoviesStartLoading());
    })();
  }, [dispatch]);

  const { rentals } = useSelector((state) => state.movies);
  const auth = useSelector((state) => state.auth);

  let userMod = { ...auth };
  delete userMod.checking;
  delete userMod.uid;

  userMod = Object.entries(userMod);
  userMod.push(["password", null]);
  userMod.push(["email", null]);

  const handleDelteUser = () => {
    Swal.fire({
      title: "Do you want to delete your user?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        dispatch(startRemoveUser(auth.uid));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <Navbar />
      {rentals &&
        rentals.map((rental) => (
          <MoviesRentList key={rental.date} {...rental} />
        ))}
      <div className="container">
        <h1>User</h1>
        {userMod.map((x) => (
          <div className="form-floating" key={x}>
            <textarea className="form-control" id="floatingTextarea"></textarea>
            <label htmlFor="floatingTextarea">{x[0]}</label>
          </div>
        ))}
        <div className="btn-group-sm   d-flex align-content-center">
          <button className="btn btn-outline-info">Actulizar</button>
          <button
            className="btn btn-outline-danger ml-2"
            onClick={handleDelteUser}
          >
            Dar de baja
          </button>
        </div>
      </div>
    </>
  );
};
