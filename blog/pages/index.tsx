import FeaturedPosts from "@/components/home-page/featured-post";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-util";
import { GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  posts: Post[];
};

export default function Home(props: Props) {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>철호 블로그에 오신걸 환영합니다!</title>
        <meta
          name="description"
          content="프로그래밍과 웹 개발에 대해 포스팅합니다."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
};
