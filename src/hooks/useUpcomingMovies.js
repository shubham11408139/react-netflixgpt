import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies, addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
    // Fetch data from TMDB API and update the Redux store
    const dispatch = useDispatch();

     const getUpcomingMovies = async () => {
        try {
            const url = 'https://api.themoviedb.org/3/movie/upcoming?page=1';
            const data = await fetch(url, API_OPTIONS);
            const json = await data.json();
            console.log("Upcoming Movie:", json.results);
            dispatch(addUpcomingMovies(json.results));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUpcomingMovies();
    }, []);
   

}

export default useUpcomingMovies;

