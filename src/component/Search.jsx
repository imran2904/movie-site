import React from "react";

const Search = ({ handleInput, SearchResult }) => {
  return (
    <div className="search-input mt-3 mb-5">
      <input
        type="text"
        name="movie"
        placeholder="search movie"
        className="w-50 p-2 "
        onChange={handleInput}
        onKeyDown={SearchResult}
      />
    </div>
  );
};

export default Search;


//https://api.themoviedb.org/3/movie/550?api_key=b3a1a81d4a54861862e37dc0a9836439


//http://www.omdbapi.com/?i=tt3896198&apikey=70eefb49