import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Props = {
  id: string;
};

const UserIdPage = (props: Props) => {
  return <div>{props.id}</div>;
};

export default UserIdPage;

// 이 함수가 빌드할때 실행되는 시점은 미리 생성되지는 않는다.
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;
  const userId = params?.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
};
