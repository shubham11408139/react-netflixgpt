import { useState } from "react";
import Header from "./Header";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true); // true for sign-in, false for sign-up
    const toggleSignInForm = () => {
        // Logic to toggle between sign-in and sign-up forms
        setIsSignInForm(!isSignInForm)
    }
    return (
        <div >
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9ba9f0e2-b246-47f4-bd1f-3e84c23a5db8/web/IN-en-20251020-TRIFECTA-perspective_d6da84e9-6145-4b1e-bb51-e402c966a045_small.jpg" alt="Netflix Login Background" style={{ width: '100%' }} />
            </div>
            <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-3">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && <input type="text" placeholder="Full Name" className="p-2 my-4 w-full bg-gray-700" />}
                <input type="text" placeholder="Email Address" className="p-2 my-4 w-full bg-gray-700" />
                <input type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-700" />
                <button type="submit" className="p-2 my-4 bg-red-700 w-full rounded-lg">{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                <p className="py-2 text-sm cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? 'New to Netflix? Sign up Now' : 'Already Registered? Sign In Now'}</p>
            </form>

        </div>
    )
}

export default Login;