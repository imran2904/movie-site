import { useState, useEffect, useRef } from "react";
import "./App.css";
import Search from "./component/Search";
import Result from "./component/Result";

import { BsChevronDown } from "react-icons/bs";
import Details from "./component/Details";
import Section from "./component/Section";

function App() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {},
    loading: false,
    error: "",
  });

  const resultsRef = useRef(null);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=b3a1a81d4a54861862e37dc0a9836439`
        );
        let data = await response.json();
        setState((prevState) => ({
          ...prevState,
          results: data.results,
          loading: false,
        }));
      } catch (err) {
        setState((prevState) => ({ ...prevState, loading: false }));
        alert(err);
      }
    };

    fetchLatestMovies();
  }, []);

  const openDetail = async (id) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      let result = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b3a1a81d4a54861862e37dc0a9836439`
      );

      let data = await result.json();
      setState((prevState) => {
        return { ...prevState, selected: data, loading: false };
      });
      console.log(data);
    } catch (err) {
      setState((prevState) => ({ ...prevState, loading: false }));
      alert(err);
    }
  };

  const handleInput = (event) => {
    let search = event.target.value;

    setState((prevstate) => {
      return { ...prevstate, search: search, error: "" };
    });
  };

  const SearchResult = async (event) => {
    try {
      if (event.key === "Enter" && state.search.trim() !== "") {
        setState((prevState) => ({ ...prevState, loading: true, error: "" }));
        let response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            state.search
          )}&api_key=b3a1a81d4a54861862e37dc0a9836439`
        );
        let data = await response.json();
        if (data.results.length === 0) {
          setState((prevstate) => {
            return {
              ...prevstate,
              results: [],
              loading: false,
              error: "No results found",
            };
          });
        } else {
          setState((prevstate) => {
            return {
              ...prevstate,
              results: data.results,
              loading: false,
              error: "",
            };
          });
        }
      }
    } catch (err) {
      setState((prevState) => ({ ...prevState, loading: false }));
      alert(err);
    }
  };

  const close = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-100 min-wrap d-flex min-vh-100 flex-column">
      {state.selected.title ? (
        <Details selected={state.selected} close={close}></Details>
      ) : (
        <>
          <header className="w-100 mt-5 text-center text-white">
            <div className="heading-container">
              <h1 className=" heading">HD Movies Hub</h1>
            </div>

            <Search
              handleInput={handleInput}
              SearchResult={SearchResult}
            ></Search>
            <Section></Section>
            <button className="btn btn-light my-3" onClick={scrollToResults}>
              <BsChevronDown /> Scroll Down to Results
            </button>
          </header>
          <div ref={resultsRef} className="container">
            {state.loading ? (
              <div className="text-center">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : state.error ? (
              <div className="text-center text-light">
                <p>{state.error}</p>
              </div>
            ) : (
              <div className="row results mb-5">
                {state.results.map((result, index) => (
                  <div
                    key={index}
                    className="col-12 col-md-3 col-lg-3 col-sm-6 my-2"
                  >
                    <Result
                      result={result}
                      openDetail={() => openDetail(result.id)}
                    ></Result>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
