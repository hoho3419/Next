import Link from "next/link";

import classes from "./main-navigation.module.css";
import { signOut, useSession } from "next-auth/react";

function MainNavigation() {
  // const {data,status,update} = useSession();

  const logoutHandler = () => {
    // signOut(); 로그아웃 하기
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/auth">Login</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
