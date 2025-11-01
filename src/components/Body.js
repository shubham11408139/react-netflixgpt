import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter,  RouterProvider } from 'react-router'
import { useEffect } from 'react';
import auth from '../utils/authentication';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
const Body = () => {
    const dispatch = useDispatch();
    


    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Login />
        },
        {
            path : "/browse",
            element : <Browse />
        }

    ]);

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in/signed up, see docs for a list of available properties
            const {uid, email, displayName,photoURL} = user;
            console.log("User is signed in:", user);
            dispatch(addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL}));
           

        } else {
            // User is signed out
            dispatch(removeUser());
           
            // console.log("User is signed out");
        }
        });
    },[])
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body