import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostContextProvider from './context/PostContextProvider'; 
import Layout from './components/Layout/Layout';
import AllPosts from './components/AllPosts/AllPosts';
import PostDetails from './components/PostDetails/PostDetails';
import NotFound from './components/NotFound/NotFound';

function App() {
  const createBrowser = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: < AllPosts/> },
        { path: "post/:id", element: < PostDetails/> },
        { path: "*", element: <NotFound /> },
       
      ],
    },
  ]);

  return (
    <PostContextProvider>
      <RouterProvider router={createBrowser} />
    </PostContextProvider>
  );
}

export default App;
