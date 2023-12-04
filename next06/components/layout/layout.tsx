import { Fragment } from "react";

import MainNavigation from "./main-navigation";

type Props = {
  children: React.ReactElement;
};

function Layout(props: Props) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
