import React from "react";
import classes from "./posts-grid.module.css";
import PostsItem from "./posts-item";

type Props = {
  posts: Post[];
};

const PostsGrid = (props: Props) => {
  const { posts } = props;

  if (!posts) {
    return <div>게시글을 만드는 중입니다...</div>;
  }

  return (
    <ul className={classes.grid}>
      {posts.map((el) => (
        <PostsItem post={el} key={el.slug} />
      ))}
    </ul>
  );
};

export default PostsGrid;
