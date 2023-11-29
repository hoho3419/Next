import Link from "next/link";
import React from "react";
import Image from "next/legacy/image";
import classes from "./post-item.module.css";

type Props = {
  post: Post;
};

const PostsItem = (props: Props) => {
  const { id, title, image, excerpt, date, slug } = props.post;

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            layout="responsive"
            width={300}
            height={200}
            priority
            alt={title}
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{date}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostsItem;
