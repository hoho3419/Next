import React from "react";
import MainNavigation from "./main-navigation";

type Props = {
  children: React.ReactElement;
};

const Layout = (props: Props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
