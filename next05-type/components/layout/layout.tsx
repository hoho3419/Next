import { Fragment } from "react";

import MainHeader from "./main-header";

type Props = {
  children: React.ReactNode;
};

function Layout(props: Props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
