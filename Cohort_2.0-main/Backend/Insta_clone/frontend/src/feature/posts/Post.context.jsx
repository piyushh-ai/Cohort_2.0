import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(null);
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState(null);
  const [allComments, setAllComments] = useState([])

  return (
    <PostContext.Provider
      value={{ loading, setLoading, post, setPost, feed, setFeed, allComments, setAllComments }}
    >
      {children}
    </PostContext.Provider>
  );
};
