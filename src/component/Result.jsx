import "../App.css";

const Result = ({ result, openDetail }) => {
  const posterUrl = result.poster_path
    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
    : "path/to/default/image.jpg";

  return (
    <div
      className="card bg-black result"
      onClick={(event) => {
        openDetail(result.id);
      }}
    >
      <div className="card-body">
        <img src={posterUrl} alt="poster" />
      </div>
      <div className="text-center">
        <p className="bg-black text-white"> {result.title}</p>
      </div>
    </div>
  );
};

export default Result;
