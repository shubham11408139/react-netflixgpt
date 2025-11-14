
import { lazy, Suspense } from 'react';
import { createBrowserRouter,  RouterProvider } from 'react-router'



const Login = lazy(() => import('./Login'));
const Browse = lazy(() => import('./Browse'));

const Body = () => {
   

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

  
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
        <RouterProvider router={appRouter}/>
    </Suspense>
  )
}

export default Body