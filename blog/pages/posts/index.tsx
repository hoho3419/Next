import AllPosts from "@/components/posts/all-posts";
import React from "react";
import { getFeaturedPosts } from "@/lib/posts-util";
import { GetStaticProps } from "next";

type Props = {
  posts: Post[];
};

const AllPostsPage = (props: Props) => {
  return (
    <>
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
