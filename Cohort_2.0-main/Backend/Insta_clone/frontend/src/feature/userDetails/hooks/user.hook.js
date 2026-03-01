import React, { useState } from "react";
import {
  followApi,
  getFollowerApi,
  getFollowingApi,
  getSuggestApi,
  unFollowApi,
} from "../services/user.api";

const useUserHook = () => {
  const [following, setFollowing] = useState({
    following: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [follower, setFollower] = useState({
    follower: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [suggest, setSuggest] = useState({
    follower: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });

  const handleGetFollowing = async () => {
    try {
      const data = await getFollowingApi();
      setFollowing(data);
    } catch (error) {
      console.log("following : ", error);
    }
  };

  const handleGetFollower = async () => {
    try {
      const data = await getFollowerApi();

      setFollower(data);
    } catch (error) {
      console.log("follower : ", error);
    }
  };

  const handleGetSuggest = async () => {
    try {
      const data = await getSuggestApi();

      setSuggest(data);
    } catch (error) {
      console.log("follower : ", error);
    }
  };

  const handleFollowUser = async (userId) => {
    try {
      await followApi(userId);
      setSuggest((prev) => ({
        ...prev,
        suggestions: prev.suggestions.filter((user) => user._id !== userId),
      }));


      await handleGetFollowing();
    } catch (error) {
      console.log("handleFollowUser :", error);
    }
  };

  const handleUnFollowUser = async (userId) => {
    try {
      await unFollowApi(userId);
      handleGetFollowing();
      handleGetSuggest();
    } catch (error) {
      console.log("handleUnFollowUser :", error);
    }
  };

  return {
    following,
    follower,
    suggest,
    handleGetSuggest,
    handleGetFollower,
    handleGetFollowing,
    handleFollowUser,
    handleUnFollowUser,
  };
};

export default useUserHook;
