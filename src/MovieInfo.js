import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
const api_key = "683bb5ee";

const MovieInfo = ({ selectedMovie, setSelectedMovie }) => {
  const [movieInfo, setMovieInfo] = useState("");

  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?i=${selectedMovie}&apikey=${api_key}`)
      .then((response) => {
        setMovieInfo(response.data);
      });
  }, [selectedMovie]);

  return (
    <section className="container mx-auto pb-4 border-b-2 border-gray-600">
      {movieInfo ? (
        <>
          <div className="w-2/3 mx-auto  flex justify-center py-2">
            <ImCancelCircle
              size={40}
              className="bg-slate-100 rounded-xl hover:cursor-pointer hover:text-slate-100 hover:bg-slate-800"
              onClick={() => setSelectedMovie()}
            />
          </div>
          <div id="main_container" className="flex  w-2/3 ">
            <div className="w-1/3  h-[300px] ">
              <img
                src={movieInfo?.Poster}
                className="object-cover h-full"
                alt=""
              />
            </div>
            <div className="w-2/3 px-6  self-center">
              <p className="text-xl mb-3 font-bold">
                <span className="font-bold">Movie: </span> {movieInfo?.Title}
              </p>
              <p>
                <span className="font-bold"> IDMB Rating:</span> 5.69
              </p>
              <p>
                <span className="font-bold">Year: </span> {movieInfo?.Year}
              </p>
              <p>
                <span className="font-bold">Language: </span>{" "}
                {movieInfo?.Language}
              </p>
              <p>
                <span className="font-bold">Rated: </span> {movieInfo?.Rated}
              </p>
              <p>
                <span className="font-bold"> Released: </span>{" "}
                {movieInfo?.Released}
              </p>
              <p>
                <span className="font-bold">Run time: </span>{" "}
                {movieInfo?.Runtime}
              </p>
              <p>
                <span className="font-bold">Genre: </span> {movieInfo?.Genre}
              </p>
              <p>
                <span className="font-bold">Director: </span>
                {movieInfo?.Director}
              </p>
              <p>
                <span className="font-bold">Actors: </span>
                {movieInfo?.Actors}
              </p>
              <p>
                <span className="font-bold">Plot: </span>
                {movieInfo?.Plot}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-xl font-bold"> Loading...</p>
      )}
    </section>
  );
};

export default MovieInfo;
