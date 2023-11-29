import PostContent from "@/components/posts/post-detail/post-content";
import React from "react";

type Props = {
  post: Post;
};

const PostDetailPage = (props: Props) => {
  return <PostContent post={props.post} />;
};

export default PostDetailPage;
