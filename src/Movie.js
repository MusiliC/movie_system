import React from "react";

function Movie({ oneMovie, selectedMovie }) {
  const { Title, Year, imdbID, Type, Poster } = oneMovie;

  return (
    <div className="">
      <section id="main">
        <div id="main-container ">
          {/* one movie */}
          <div className="flex flex-col space-y-2 max-w-[280px]   bg-slate-50 rounded overflow-hidden pb-4 shadow-lg hover:cursor-pointer" onClick={() => selectedMovie(imdbID)}>
            <div>
              <img
                className="w-full max-h-[170px] object-cover"
                src={Poster}
                alt="pic"
              />
            </div>
            <div className="flex flex-col space-y-2 mx-2 ">
              <div>
                <h1 className="text-xl font-bold">{Title}</h1>
              </div>
              <div className="flex flex-row justify-between">
                <h2 className="text-xl">Year : {Year}</h2>
                <h2 className="text-xl">Type : {Type}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Movie;
