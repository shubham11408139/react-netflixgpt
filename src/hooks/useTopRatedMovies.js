import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies, addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
    // Fetch data from TMDB API and update the Redux store
    const dispatch = useDispatch();

     const getTopRatedMovies = async () => {
        try {
           const url = 'https://api.themoviedb.org/3/movie/top_rated?page=1';
            const data = await fetch(url, API_OPTIONS);
            const json = await data.json();
            console.log("Top Rated Movie:", json.results);
            dispatch(addTopRatedMovies(json.results));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getTopRatedMovies();
    }, []);
   

}

export default useTopRatedMovies;

