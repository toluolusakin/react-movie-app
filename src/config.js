// Configuration for TMDB
// To set the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '6183a257b7f4e8a6ad8302dad6725a6f';
const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTgzYTI1N2I3ZjRlOGE2YWQ4MzAyZGFkNjcyNWE2ZiIsInN1YiI6IjVlZDk1MmViMWIxNTdkMDAxZTU4YmVhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y9V-Q2X8QmB0O52DDrkTz85JLn6ldW6PhcKwjsi5Slk';

// Images
// An image URL looks like this example:
// http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg

const IMAGE_BASE_URL ='http://image.tmdb.org/t/p/';

//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export {
  API_URL,
  API_KEY,
  API_ACCESS_TOKEN,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
}