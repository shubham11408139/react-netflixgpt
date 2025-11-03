import { useNavigate } from "react-router-dom";
import auth from "../utils/authentication";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user)


    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in/signed up, see docs for a list of available properties
            const {uid, email, displayName,photoURL} = user;
            // console.log("User is signed in:", user);
            dispatch(addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL}));
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
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-40'
        src={LOGO} alt="Netflix Logo" />

      {user &&  <div className="flex p-2">
          <img className="w-10 h-10" alt="usericon" src={user?.photoURL} />
          <button className="font-bold text-white" onClick={handleSignout}>(Sign Out)</button>
        </div>}
    </div>
  )
}

export default Header;