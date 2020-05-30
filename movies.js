const key = "126132fe";
// http://www.omdbapi.com/?apikey=126132fe&t=game

let search = "matrix";
const relatedInfo = document.querySelector("#relatedInfo");

const getMovies = (search) => {
  const URL = `http://www.omdbapi.com/?apikey=${key}&t=${search}`;
  fetch(URL)
    .then((response) => onResponse(response, search))
    .catch((error) => onError(error));
};

const getRelatedMovies = (search) => {
  const URL = `http://www.omdbapi.com/?apikey=${key}&s=${search}&page=1`;
  fetch(URL)
    .then((response) => onRelatedMoviesResponse(response))
    .catch((error) => onRelatedMoviesError(error));
};

getMovies(search);

// get movies functions
const onResponse = (response, search) => {
  response.json().then((movies) => buildMovieInfo(movies));
  getRelatedMovies(search);
};
const onError = (error) => console.error("something went wrong", error);

const onRelatedMoviesResponse = (response) =>
  response.json().then((movies) => buildRelatedMovieInfo(movies));

// get related movies functions
const onRelatedMoviesError = (error) =>
  console.error("something went wrong", error);

// buildMovieInfo
const buildMovieInfo = (movie) => {
  console.log(movie);

  const { Poster, Plot, Title } = movie;

  const pTitle = document.querySelector("#title");
  pTitle.innerHTML = Title;

  const imgPoster = document.querySelector("#posterContainer img");
  imgPoster.src = Poster;

  const pPlot = document.querySelector("#plot");
  pPlot.innerHTML = Plot;
};

// RelatedMoviesInfo
const buildRelatedMovieInfo = (moviesInfo) => {
  const { Search, totalResults, Response } = moviesInfo;

  const numberOfRelatedMovies = document.querySelector(
    "#numberOfRelatedMovies"
  );

  if (Response && totalResults > 0) {
    numberOfRelatedMovies.innerHTML = totalResults;

    const relatedMovies = document.createElement("div");
    relatedMovies.className = "relatedMovies";
    relatedInfo.append(relatedMovies);

    // generate the related movies
    for (movie of Search) {
      console.log("related movie", movie);
      const { Poster, Title } = movie;

      const titleDiv = document.createElement("div");
      titleDiv.innerHTML = Title;

      const imgPoster = document.createElement("img");
      imgPoster.src = Poster;
      imgPoster.style.width = "50px";

      relatedMovies.append(titleDiv);
      relatedMovies.append(imgPoster);
    }
  } else {
    relatedMoviesDiv.innerHTML =
      "No related movies found. Try to type Matrix to see the magic";
  }
};

const onSearchType = (event) => {
  const {
    target: { value },
  } = event;
  search = value;

  // Asking if there's something to search
  if (value.length > 0) {
    getMovies(search);
    deleteRelatedMovies();
  }
};

const deleteRelatedMovies = () => {
  if (relatedInfo.children.length > 0)
    relatedInfo.removeChild(relatedInfo.children[0]);
};
