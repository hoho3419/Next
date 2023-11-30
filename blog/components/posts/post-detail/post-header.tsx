import React from "react";
import Image from "next/legacy/image";
import classes from "./post-header.module.css";

type Props = {
  post: Post;
};

const PostHeader = (props: Props) => {
  const { title, image, slug } = props.post;
  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={imagePath} alt={title} width={200} height={150} />
    </header>
  );
};

export default PostHeader;
