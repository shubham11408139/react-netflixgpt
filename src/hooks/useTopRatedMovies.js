import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
    // Fetch data from TMDB API and update the Redux store
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies.topRatedMovies);
    const getTopRatedMovies = useCallback(async () => {
        try {
           const url = 'https://api.themoviedb.org/3/movie/top_rated?page=1';
            const data = await fetch(url, API_OPTIONS);
            const json = await data.json();
            // console.log("Top Rated Movie:", json.results);
            dispatch(addTopRatedMovies(json.results));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch])
    useEffect(() => {
        if (!movies?.length) getTopRatedMovies();
    }, [getTopRatedMovies, movies]);

}
export default useTopRatedMovies;

