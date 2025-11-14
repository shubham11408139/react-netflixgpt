import { useNavigate } from "react-router-dom";
import auth from "../utils/authentication";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user)
  const showGptSearch = useSelector((state)=> state.gpt.showGptSearch)


    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in/signed up, see docs for a list of available properties
            const {uid, email, displayName,photoURL} = user;
            // console.log("User is signed in:", user);
            dispatch(addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL}));
            import("./Browse").then(()=> console.log("Browse page loaded")); // prefetch bundle
            navigate("/browse");

        } else {
            // User is signed out
            dispatch(removeUser());
           navigate("/");
            // console.log("User is signed out");
        }
        });

        // Unsubscribe when component unmounts
        return ()=>{
          unsubscribe();
        }
    },[])
  const handleSignout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User signed out successfully");

    }).catch((error) => {
      // An error happened.
      console.log("Error signing out:", error);
      navigate("/error")
    });
  }

  const handleGptSearchClick = () =>{
    // Toggle GPT Search button
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange  = (e)=>{
    console.log("Language changed to:", e.target.value);
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-40'
        src={LOGO} alt="Netflix Logo" />

      {user &&  <div className="flex p-2">
        {showGptSearch && <select className="bg-gray-900 text-white rounded-lg m-2 p-2" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang)=>{
            return <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
          })}
        </select>}
        
          <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{showGptSearch ? "Home Page": "GPT Search"}</button>
          <img className="w-10 h-10" alt="usericon" src={user?.photoURL} />
          <button className="font-bold text-white" onClick={handleSignout}>(Sign Out)</button>
        </div>}
    </div>
  )
}

export default Header;