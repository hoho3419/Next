import React from "react";
import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

type Props = {
  posts: Post[];
};

const AllPosts = (props: Props) => {
  const { posts } = props;

  return (
    <section className={classes.posts}>
      <h1>모든 게시물</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
