import axios, { Axios } from "axios";
import { apiKey } from "../constants";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesUrl = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`; 
const upcomingMoviesUrl = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`; 
const topRatedMoviesUrl = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`; 
const popularMoviesUrl = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`; 
const nowPlayingMoviesUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`; 
const getAMoviesUrl = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`; 
const getAMovieCreditsUrl = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`; 
const getSimilarMovieUrl = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`; 
const getPersonUrl = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`; 
const getPersonMovieCreditUrl = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`; 
const searchMovieUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}`; 

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const defaultImage = "https://cdn.pixabay.com/photo/2017/06/02/22/01/dog-2367414_1280.png";

const apiCall = async(endPoint, params)=>{
    const options = {
        method: 'GET',
        url: endPoint,
        params: params ? params : {},
      };

      try {
        const response = await axios.request(options);
        return response.data;
      } 
      catch (error) {
        console.log("error: ", error);
        return {};
      }
}

export const fetchTrendingMovies =()=>{
   return  apiCall(trendingMoviesUrl);
}

export const fetchUpcomingMovies =()=>{
   return  apiCall(upcomingMoviesUrl);
}

export const fetchTopRatedMovies =()=>{
   return  apiCall(topRatedMoviesUrl);
}
export const fetchNowPlayingMovies =()=>{
   return  apiCall(nowPlayingMoviesUrl);
}

export const fetchPopularMovies =()=>{
   return  apiCall(popularMoviesUrl);
}
export const fetchMovieDetail =(id)=>{
   return  apiCall(getAMoviesUrl(id));
}
export const fetchMovieCredit =(id)=>{
   return  apiCall(getAMovieCreditsUrl(id));
}
export const fetchSimilarMovies =(id)=>{
   return  apiCall(getSimilarMovieUrl(id));
}
export const fetchPersonMovie =(id)=>{
   return  apiCall(getPersonUrl(id));
}
export const fetchPersonMovieCreditss =(id)=>{
   return  apiCall(getPersonMovieCreditUrl(id));
}
export const fetchSearchedMovies =(params)=>{
   return  apiCall(searchMovieUrl, params);
}