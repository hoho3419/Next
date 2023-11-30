import PostContent from "@/components/posts/post-detail/post-content";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getPostData, getPostsFiles } from "@/lib/posts-util";

type Props = {
  post: Post;
};

const PostDetailPage = (props: Props) => {
  return <PostContent post={props.post} />;
};

export default PostDetailPage;

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;
  const slug = params?.slug as string;
  if (!slug) {
    return {
      props: {
        post: [],
      },
    };
  }
  const PostItem = getPostData(slug);

  return {
    props: {
      post: PostItem,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const postFilename = getPostsFiles();

  const slugs = postFilename.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};
