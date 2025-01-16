import React, { createContext, useState } from "react";
import { getAllPosts, getPostDetails, getAllComments } from '../components/lib/lib'; 

export const postContext = createContext({
  getAllPosts: () => {},
  getPostDetails: () => {},
  getAllComments: () => {},
  loading: false,
  error: null,
});

export default function PostContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (apiCall, ...params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall(...params);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message || "حدث خطأ غير متوقع");
    }
  };

  const postCtx = {
    getAllPosts: (params) => fetchData(getAllPosts, params),
    getPostDetails: (id) => fetchData(getPostDetails, id),
    getAllComments: (postId) => fetchData(getAllComments, postId),
    loading,
    error,
  };

  return (
    <postContext.Provider value={postCtx}>
      {children}
    </postContext.Provider>
  );
}
