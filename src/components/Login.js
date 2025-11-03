import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../utils/authentication";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {  BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constants";

const Login = () => {

    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true); // true for sign-in, false for sign-up
    const [erroMessage, setErrorMessage] = useState("");

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = (e) => {
        // Validate the form data
        let error = checkValidData(email.current.value, password.current.value);
        setErrorMessage(error);

        if (error) {
            return;
        }
        //Sign up logic here
        if (!isSignInForm) {

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log("User signed up:", user);

                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                        }).then(() => {
                        const {uid, email, displayName,photoURL} = auth.currentUser;
                        dispatch(addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL}));
                        }).catch((error) => {
                           setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    console.log("Error signing up:", error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                })
        } else {
            // Sign in logic here

            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("User signed in:", user);
                })
                .catch((error) => {
                    console.log("Error signing in:", error);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
        e.preventDefault();
    }
    const toggleSignInForm = () => {
        // Logic to toggle between sign-in and sign-up forms
        setIsSignInForm(!isSignInForm)

    }


    return (
        <div >
            <Header />
            <div className="absolute">
                <img src={BACKGROUND_IMAGE} alt="Netflix Login Background" style={{ width: '100%' }} />
            </div>
            <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80" >
                <h1 className="font-bold text-3xl py-3">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-2 my-4 w-full bg-gray-700" />}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-4 w-full bg-gray-700" />
                <input ref={password} type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-700" />
                <p className="text-red-500 text-lg font-bold py-2">{erroMessage}</p>
                <button type="submit" className="p-2 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                <p className="py-2 text-sm cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? 'New to Netflix? Sign up Now' : 'Already Registered? Sign In Now'}</p>
            </form>

        </div>
    )
}

export default Login;