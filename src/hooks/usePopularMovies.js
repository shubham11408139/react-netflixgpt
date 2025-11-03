import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
    // Fetch data from TMDB API and update the Redux store
    const dispatch = useDispatch();

     const getPopularMovies = async () => {
        try {
            const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
            const data = await fetch(url, API_OPTIONS);
            const json = await data.json();
            console.log("Popular Movie:", json.results);
            dispatch(addPopularMovies(json.results));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPopularMovies();
    }, []);
   

}

export default usePopularMovies;

