import ReactDOM from "react-dom";

import classes from "./notification.module.css";

type Props = {
  status: string;
  title: string;
  message: string;
};

function Notification(props: Props) {
  const { title, message, status } = props;

  let statusClasses = "";
  const portalContainer = document.getElementById("notification");
  if (!portalContainer) {
    return null;
  }
  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    portalContainer
  );
}

export default Notification;
