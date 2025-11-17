import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
    // Fetch data from TMDB API and update the Redux store
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);
    useEffect(() => {
        if(!nowPlayingMovies){ 
           getNowPlayingMovies();
        }
    }, []);
    const getNowPlayingMovies = async () => {
        try {
            const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
            const data = await fetch(url, API_OPTIONS);
            const json = await data.json();
            // console.log("data is:", json.results);
            dispatch(addNowPlayingMovies(json.results));
        } catch (error) {
            console.log(error);
        }
    }

}

export default useNowPlayingMovies;

