import Link from "next/link";

import classes from "./button.module.css";

type Props = {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
};

function Button(props: Props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
