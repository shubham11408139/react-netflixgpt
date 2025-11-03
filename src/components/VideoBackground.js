import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
    useMovieTrailer(movieId);
    const trailer = useSelector((state) => state.movies?.trailerVideo);
    if (!trailer) return;
    // console.log("Trailer is", trailer);

    const youtubeURL = `https://www.youtube.com/embed/${trailer?.key}?controls=0&autoplay=1&loop=1&mute=1`;
    return (
        <div className="w-screen">
            <iframe className="w-screen aspect-video" src={youtubeURL} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
        </div>
    )
}

export default VideoBackground