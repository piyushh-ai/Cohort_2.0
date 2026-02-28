import { useContext, useEffect } from "react";
import { PostContext } from "../Post.context";
import {
  createPost,
  getFeed,
  likePost,
  unlikePost,
} from "../services/post.api";

export const UsePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data.updatePosts);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (imageFile, caption) => {
    try {
      setLoading(true);
      const data = await createPost(imageFile, caption);
      await handleGetFeed();
      setFeed([data.populatedPost, ...feed]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postid) => {
    try {
      await likePost(postid);

      setFeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === postid ? { ...post, isLiked: true } : post,
        ),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnLike = async (postid) => {
    try {
      await unlikePost(postid);

      setFeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === postid ? { ...post, isLiked: false } : post,
        ),
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnLike,
  };
};
