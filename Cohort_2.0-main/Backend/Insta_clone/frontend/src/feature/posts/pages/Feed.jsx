import React, { useEffect, useState } from "react";
import "../styles/Feed.scss";
import Posts from "../component/Posts";
import { UsePost } from "../hooks/UsePost";
import Nav from "../../shared/components/Nav";

const Feed = () => {
  const { feed, post, handleGetFeed, loading, handleUnLike, handleLike } =
    UsePost();

 

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is Loading</h1>
      </main>
    );
  }

  return (
    <main>
      <Nav />
      <div className="feed">
        {feed.map((posts) => {
          return <Posts user={posts.user} post={posts} loading={loading} handleUnLike={handleUnLike} handleLike={handleLike} />;
        })}
      </div>
    </main>
  );
};

export default Feed;
