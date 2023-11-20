import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Props = {
  username: string;
};

const UserProfile = (props: Props) => {
  return <div>{props.username}</div>;
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params, req, res } = context;
  console.log(params);
  // console.log(req);
  // console.log(res);
  return {
    props: {
      username: "lee",
    },
  };
};
