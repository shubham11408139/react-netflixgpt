import { BACKGROUND_IMAGE } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearch = () => {
    return (
        <div>
            <div className="fixed -z-10">
                <img src={BACKGROUND_IMAGE} alt="Netflix Login Background" style={{ width: '100%' }} />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearch