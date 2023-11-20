import fs from "fs/promises";
import { GetStaticProps } from "next";
import path from "path";
import React from "react";

type Product = {
  id: string;
  title: string;
  desc: string;
};

type Props = {
  product: Product;
};

const ProductDetailPage = (props: Props) => {
  // fallback: true 를 사용하면 사전에 불러오는게 아니기 때문에 에러가 날 수 있다.
  // 그래서 값을 체크해서 에러가 아닌 로딩을 반환하게 해준다.
  if (!props.product) {
    return <p>로딩중...</p>;
  }

  const { desc, id, title } = props.product;

  return (
    <>
      <h1>{title}</h1>
      <p>{desc}</p>
    </>
  );
};

export default ProductDetailPage;

const getData = async () => {
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData.toString());
  return data;
};

// getStaticProps는 기본으로 생성하는건데 현재 [] 페이지는 동적으로 생성되는 페이지이기 때문에
// getStaticPaths 를 사용해야 한다.
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const pathname = params?.pid;
  console.log(pathname);

  const data = await getData();
  const product = data.products.find((el: Product) => el.id === pathname);

  return {
    props: {
      product,
    },
  };
};

// 정적 페이지 생성기로 사전에 어떤 페이지를 어떤 데이터로 보여줄지 미리 알려주어야 한다.
//  동적 페이지는 (static build) 페이지는 처음 사이트에 들어오게 되면 각 동적페이지에 대한 json을 미리 다운받고
// html을 바꾸며 페이지를 이동한다.
export const getStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((propduct: Product) => propduct.id);

  const pathWithParams = ids.map((id: string) => ({ params: { pid: id } })); // 새로운 객체 배열을 반환하는 것
  return {
    paths: pathWithParams,
    fallback: false, // 여기 있는 페이지만 생성하기 때문에 없으면 접근하지 못한다.
    // fallback: "blocking", // 을 사용하면 미리 에러가 안나기 때문에 로딩 스피너를 안띄워줘도 된다.
    // fallback: true, 여기 요소에 추가되지 않은 페이지도 불러올 수 있게 한다.
  };
};
