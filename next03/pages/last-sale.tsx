import { useEffect, useState } from "react";
import useSWR from "swr";

type Sales = {
  id: string;
  username: string;
  volume: string;
};

type Props = {
  sales: Sales[];
};
// getStaticProps 에서 먼저 데이터를 조회함으로써 검색엔진에 최적화 시킨 데이터를 Props로 받는다.
function LastSalesPage(props: Props) {
  const [sales, setSales] = useState<Sales[]>(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  // useSWR로 캐싱기능과 포커스를 받으면 재요청 및 데이터 베이스에 데이터가 바뀌지 않았는지 모니터링한다.
  // 리액트 쿼리랑 매우 유사함
  const { data, error } = useSWR(
    "https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );
  // 요청으로 데이터가 변경되면 데이터 구조화를 위해서 useEffect로 감지 후 데이터 구조화를 한다.
  useEffect(() => {
    if (data) {
      const transformedSales: Sales[] = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);
  // 에러처리를 하는 구문
  if (error) {
    return <p>Failed to load.</p>;
  }
  //  현재 데이터가 있는지 감지하고 없으면 로딩을 띄워줌
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale: Sales) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json"
  );
  if (response.status === 404) {
    return {
      notFound: true,
    };
  }
  const data = await response.json();
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
}

export default LastSalesPage;
