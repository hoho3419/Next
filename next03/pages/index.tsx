import path from "path";
import fs from "fs/promises";
import { GetStaticProps } from "next";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
};

type Props = {
  product: [];
};
//  브라우저에서 실행되는 영역
export default function Home(props: Props) {
  const { product } = props;
  return (
    <ul>
      {product.map((el: Product) => (
        <Link href={`/product/${el.id}`} key={el.id}>
          <li>{el.title}</li>
        </Link>
      ))}
    </ul>
  );
}
// 서버에서 실행되는 영역 빌드될때만 실행되기 때문에 revalidate를 해줘야 한다.
export const getStaticProps: GetStaticProps = async (context) => {
  // GetStaticProps를 next에서 임폴트해서 사용한다.
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // console.log(filePath); 파일에 절대경로를 가져온다.
  const jsonData = await fs.readFile(filePath);
  // console.log(jsonData); 버퍼의 값을 읽어온다.
  const data = JSON.parse(jsonData.toString());
  // console.log(data); 파싱한 데이터들을 가져온다.

  console.log("프리렌더링");
  return {
    props: {
      product: data.products,
    },
    revalidate: 5, // 서버에서 5초마다 재실행을 한다. 알아서 가져오는게 아닌 사용자가 새로고침을 했을때 가져옴
    // notFound: true, // 데이터 페칭을 실패했을떄 에러페이지를 띄운다.
    // redirect: { // 강제로 다른 경로로 보내버린다.
    //   destination: "/no-data",
    // },
  };
};
