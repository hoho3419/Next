import React from "react";
import classes from "./featured-posts.module.css";
import PostsGrid from "../posts/posts-grid";

type Props = {
  posts: Post[];
};

const FeaturedPosts = (props: Props) => {
  const { posts } = props;

  return (
    <section className={classes.latest}>
      <h2>게시글</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
