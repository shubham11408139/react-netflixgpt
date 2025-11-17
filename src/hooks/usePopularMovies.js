import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);
    
    const getPopularMovies = useCallback(async () => {
        try {
            const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
            const data = await fetch(url, API_OPTIONS);
            const json = await data.json();
            // console.log("Popular Movie:", json.results);
            dispatch(addPopularMovies(json.results));
        } catch (error) {
            console.log(error);
            // Optionally, return a status or just an empty object to follow hook conventions
            return {};
        }
    }, [dispatch]);

    useEffect(() => {
        if(!popularMovies){
            getPopularMovies();
        }
    }, [getPopularMovies]);
}

export default usePopularMovies;

