import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

// 해당에 맞는 파일 일기
export const getPostData = (fileName: string) => {
  const postSlug = fileName.replace(/\.md$/, ""); // 파일 확장자 제거
  const filePath = path.join(postsDirectory, `${postSlug}.md`); // 들어온 파일에 경로를 읽기 D:\Code\Front\Next\blog\posts\getting-started-with-nextjs.md
  const fileContent = fs.readFileSync(filePath, "utf-8"); // 경로의 데이터 읽기
  const { data, content } = matter(fileContent); // md 에 있는 --- --- 안에 있는 YML 데이터는 data 이고 그 외 나머지는 content이다

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };
  return postData;
};

// 모든 게시물을 읽고 날짜별 내림차순으로 정리
export const getAllPosts = () => {
  // posts 안에 있는 md 파일 읽기 [ 'getting-started-with-nextjs.md' ]
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postfile) => {
    return getPostData(postfile);
  });

  // 앞이 클때 음수면 내림차순
  const sortedPosts = allPosts.sort((postA: any, postB: any) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post: any) => post.isFeatured);

  return featuredPosts;
};
