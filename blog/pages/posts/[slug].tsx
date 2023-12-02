import PostContent from "@/components/posts/post-detail/post-content";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import Head from "next/head";

type Props = {
  post: Post;
};

const PostDetailPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />;
    </>
  );
};

export default PostDetailPage;

// getStaticProps 와 getStaticPaths 들은 서버에서 실행되는 코드이기 때문에
// 빌드용량은 아예 차지하지 않는다.
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
