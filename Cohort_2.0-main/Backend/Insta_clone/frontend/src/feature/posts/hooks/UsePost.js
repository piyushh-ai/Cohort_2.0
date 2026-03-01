import { useContext, useEffect } from "react";
import { PostContext } from "../Post.context";
import {
  createPost,
  deleteComment,
  deletePost,
  getComment,
  getFeed,
  likePost,
  postComment,
  unlikePost,
} from "../services/post.api";
import { useState } from "react";

export const UsePost = () => {
  const context = useContext(PostContext);
  const [commentLoading, setCommentLoading] = useState(false);

  const {
    loading,
    setLoading,
    post,
    setPost,
    feed,
    setFeed,
    allComments,
    setAllComments,
  } = context;

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

  const handleGetAllComments = async (postId) => {
    try {
      setCommentLoading(true);
      const data = await getComment(postId);
      setAllComments((prev) => ({
        ...prev,
        [postId]: data.data.post,
      }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const handlePostComments = async (postId, userComment) => {
    try {
      await postComment(postId, userComment);
      await handleGetAllComments(postId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handelDeleteComment = async (postId, commentId) => {
    try {
      await deleteComment(commentId);

      setAllComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment._id !== commentId),
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      setLoading(true);

      await deletePost(postId);

      // 1️ Remove post from feed instantly
      setFeed((prevFeed) => prevFeed.filter((post) => post._id !== postId));

      // 2️ Remove comments of that post from state
      setAllComments((prev) => {
        const updatedComments = { ...prev };
        delete updatedComments[postId];
        return updatedComments;
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    allComments,
    commentLoading,
    handleGetFeed,
    handleCreatePost,
    handleLike,
    handleUnLike,
    handleGetAllComments,
    handlePostComments,
    handelDeleteComment,
    handleDeletePost
  };
};
