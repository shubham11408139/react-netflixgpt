import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef } from "react";
import client from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {

    const langKey = useSelector((store)=> store.config.lang);
    const serachText = useRef(null);
    const dispatch = useDispatch();


    // serach movie in tmdb based on gpt response
    const serchMovieTMDB = async (movieName)=>{
        const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
        const data = await fetch(url, API_OPTIONS)
        const json = await data.json();
        return json.results;
    }

    const handleGptSearchClick = async () =>{
        const query = serachText.current.value;
        console.log("Query is:", query);
        //Make an API call to OpenAI GPT and get API response
        const response = await client.responses.create({
            model: 'gpt-3.5-turbo',
            instructions: 'You are a recoommendation assistant that suggests movies,tv shows based on user queries.',
            input: `Suggest me some movies or tv shows based on the following query: ${query}, only give me name of 5 movies or tv shows in the response without any additional information.
            It should be comma-separated, like the example: Movie1, Movie2, Movie3, Movie4, Movie5`,
        });
        if(!response || !response.output_text){
            console.log("No response from GPT");
            return;
        }
        const gptMovies =  response.output_text.split(",").map((item)=> item.trim());
        console.log("GPT Movies:", gptMovies)
        //["","","",","",""]
        //For each movie, fetch additional details from TMDB API

        const promiseArray = gptMovies.map((movieName)=>{
            return serchMovieTMDB(movieName)
        })

        const tmdbResults = await Promise.all(promiseArray);
        console.log("TMDB Results:", tmdbResults);
        //tmdbResults is an array of arrays, each containing search results for corresponding movie
        dispatch(addGptMovieResult({movieNames:gptMovies, movieResults : tmdbResults}));
        
 
    }
  return (
    <div className="pt-[10%] flex justify-center">
       <form className="bg-black w-1/2 grid grid-cols-12" onSubmit={(e)=> e.preventDefault()}>
          <input type="text" ref={serachText} className="p-4 m-4 col-span-9" placeholder={lang[langKey].gptSearchPlaceHolder} />
          <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
             onClick={handleGptSearchClick}
          > {lang[langKey].search} </button>
       </form>

    </div>
  )
}

export default GptSearchBar