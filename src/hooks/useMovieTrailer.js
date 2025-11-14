import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

//fetch trailer videos
const getMovieVideos = async (movieId, dispatch, signal) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const data = await fetch(url, { ...API_OPTIONS, signal });
        const json = await data.json();
        const trailer = json.results.find((video) => video.type === "Trailer") || json.results[0];
        dispatch(addTrailerVideo(trailer));
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Fetch aborted for movieId:", movieId);
        } else {
            console.error("Error fetching trailer:", error);
        }
    }
}


const useMovieTrailer = (movieId) => {
    // fetch trailer video && updating the store with trailer video data
    const dispatch = useDispatch();
    useEffect(() => {
        if (!movieId) return;
        const abortController = new AbortController();
        const signal = abortController.signal;
        // ✅ pass dependencies explicitly
        getMovieVideos(movieId, dispatch, signal)
        // cleanup
        return () => abortController.abort();
    }, [movieId, dispatch]);

}

export default useMovieTrailer;