import axios from "axios";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Movie from "./Movie";
import MovieInfo from "./MovieInfo";

const api_key = "683bb5ee";

function App() {
  const [search, setSearch] = useState("");
  const [time, setTime] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const moviesPerPage = 4;
  const pagesVisited = pageNumber * moviesPerPage;
  const pageCount = Math.ceil(movieList.length/moviesPerPage)

  const changePage = ({selected}) => {
setPageNumber(selected)
  }
  

  const displayMovies = movieList
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((oneMovie, index) => (
      <Movie
        key={index}
        oneMovie={oneMovie}
        selectedMovie={setSelectedMovie}
      />
    ));

  const fetchData = async (searchString) => {
    const res = await axios.get(
      `http://www.omdbapi.com/?s=${searchString}&apikey=${api_key}`
    );

    setMovieList(res.data.Search);
  };

  const handleInputChange = (e) => {
    clearTimeout(time);
    setSearch(e.target.value);

    const timeOut = setTimeout(() => fetchData(e.target.value), 500);
    setTime(timeOut);
  };

  return (
    <div className=" ">
      <section className="navbar mb-4 bg-gray-800 text-white py-4 px-20 drop-shadow-lg">
        <div className="flex   items-center flex-row md:justify-between">
          <div id="brand">
            <p className="text-2xl font-bold ">FaveMovies</p>
          </div>
          <div id="link">
            <ul className="hidden md:flex md:flex-row md:space-x-10 text-xl">
              <li>
                <a href="/">Home</a>
              </li>
              {/* <li>
                <a href="/">Trending</a>
              </li> */}
            </ul>
          </div>
          <div id="search">
            <form
              method=""
              className="hidden md:flex md:flex-row md:space-x-10 text-xl"
            >
              <div className="relative text-gray-800 focus-within:text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name={`http://www.omdbapi.com/?s=${search}&apikey=${api_key}`}
                  className="py-2 px-3 w-[300px] text-md text-black  rounded-md pl-10   focus:text-gray-900 focus:outline-slate-700"
                  placeholder="Search..."
                  value={search}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
        </div>

        <div>
          <ul className="flex flex-col  space-y-5 mt-5 md:hidden text-xl">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Trending</a>
            </li>
            <form method="">
              <div className="relative text-gray-800 focus-within:text-gray-600">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="q"
                  className="py-2 px-1 w-full text-md text-black  rounded-md pl-10   focus:text-gray-900 focus:outline-slate-700"
                  placeholder="Search..."
                  value={search}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </form>
          </ul>
        </div>
      </section>

      <section>
        {selectedMovie && (
          <MovieInfo
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        )}
      </section>

      {
       movieList && movieList?.length  ? (
          
      <section className="container mx-auto mt-20  ">
        <div className="grid gap-10  sm:grid-cols-2 md:px-3 justify-center md:grid-cols-3 lg:grid-cols-4 ">
          { displayMovies }
        </div>
        <div className="container mx-auto my-auto  mt-20 col">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBtn"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </section>
        ): (
          <section className="container mx-auto">
            <div className="mx-auto my-12 flex justify-center items-center space-x-10">
              <p className="font-bold text-2xl text-center">No movie search...</p>
              <img src="/Hourglass.gif" alt="" className="h-[100px]" />
            </div>
          </section>
        )
      }

    </div>
  );
}

export default App;
