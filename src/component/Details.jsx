import React from "react";

const Details = ({ selected, close }) => {
  const posterUrl = selected.poster_path
    ? `https://image.tmdb.org/t/p/w500${selected.poster_path}`
    : "path/to/default/image.jpg";

  return (
    <div className="d-flex bg-dark w-100  flex-column align-items-center">
      <div className="container h-100 mt-5">
        <div className="row">
          <div className="col-10  col-md-6 text-center">
            <img className="mb-5 w-75" src={posterUrl} alt="" />
          </div>
          <div className="mt-2 col-12 col-md-6 text-white">
            <h2>{selected.title}</h2>
            <p>{selected.release_date}</p>
            <p>Rating : {selected.vote_average}</p>
            <div>
              <p>Genres:</p>
              {
                <ul>
                  {selected.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              }
            </div>
            <p>{selected.overview}</p>
            <button onClick={close} className="btn btn-danger">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
