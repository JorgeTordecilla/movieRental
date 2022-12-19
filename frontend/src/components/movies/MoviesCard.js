import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesStartRent } from "../../actions/moviesActions";
import { startRenting } from "../../actions/authActions";
import Swal from "sweetalert2";

export const MoviesCard = ({
  _id,
  title,
  genre,
  autor,
  urlImage,
  stock,
  price,
  isNewMovie,
}) => {
  const dispatch = useDispatch();

  const { uid, balance, isPremium } = useSelector((state) => state.auth);
  console.log(isPremium);
  const handleMovieBooking = (e) => {
    let movieUid = e.target.dataset.id;
    let moviePrice = e.target.dataset.price;
    let calculateBalance = balance - moviePrice;
    if (calculateBalance < 0) {
      return Swal.fire("Error", "Saldo insuficiente", "error");
    }
    dispatch(moviesStartRent(movieUid, uid));

    dispatch(startRenting(uid, balance, isPremium, moviePrice));
  };

  return (
    <div className="col d-flex justify-content-center">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-lg-6 d-flex justify-content-center">
            <img src={urlImage} className="img-fluid rounded-100" alt={title} />
          </div>
          <div className="col-lg-6">
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                {title}{" "}
                {isNewMovie && (
                  <span className="card-text bg-danger text-center">NEW</span>
                )}{" "}
              </h5>

              <p className="card-text">genre: {genre}</p>
              <p className="text-muted">author: {autor}</p>
              <p className="text-muted">stock: {stock}</p>
              {Boolean(isPremium) ? (
                <div>
                  <p className="text-muted text-decoration-line-through">
                    price: {price}
                  </p>
                  <p className="text-muted">price: {price * 0.9}</p>
                </div>
              ) : (
                <p className="text-muted">price: {price}</p>
              )}

              <button
                className="btn btn-outline-info"
                data-id={_id}
                data-price={price}
                onClick={handleMovieBooking}
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
