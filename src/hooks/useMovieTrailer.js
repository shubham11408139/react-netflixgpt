import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId)=>{
    // fetch trailer video && updating the store with trailer video data
    const dispatch = useDispatch();
        useEffect(() => {
               getMovieVideos(movieId)
            }, [movieId]);
    //fetch trailer videos
    const getMovieVideos = async (movieId) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
            const data = await fetch(url, API_OPTIONS);
            const json = await data.json();
            const trailer = json.results.find((video) => video.type === "Trailer") || json.results[0];
            dispatch(addTrailerVideo(trailer));
        } catch (error) {
            console.log(error);
        }
    }
}

export default useMovieTrailer;