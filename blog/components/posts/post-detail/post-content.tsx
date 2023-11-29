import React from "react";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";

type Props = {
  post: Post;
};

const PostContent = (props: Props) => {
  const { content } = props.post;
  return (
    <article className={classes.content}>
      <PostHeader post={props.post} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
