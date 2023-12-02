import AllPosts from "@/components/posts/all-posts";
import React from "react";
import { getFeaturedPosts } from "@/lib/posts-util";
import { GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  posts: Post[];
};

const AllPostsPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>모든 게시물</title>
        <meta
          name="description"
          content="웹개발과 프로그래밍에 대한 모든 게시물"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

export default AllPostsPage;

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
};
