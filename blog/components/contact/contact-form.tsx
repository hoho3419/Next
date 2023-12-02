import React, { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const ContactSendData = async (params: any) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "에러가 발생했습니다.");
  }
};

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(""); // pending, success, error
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus("");
        setRequestError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setRequestStatus("pending");

    try {
      await ContactSendData({
        email,
        name,
        message,
      });
      setRequestStatus("success");
    } catch (error: any) {
      setRequestStatus("error");
      setRequestError(error?.message);
    }
  };

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "메세지 전송중...",
      message: "메세지가 가고 있다.",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "성공!!!",
      message: "메세지 전송이 성공적으로 완료했다",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "실패",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>연락 주세요</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="message">문의 내용</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>전송</button>
          </div>
        </div>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          status={notification.status}
          title={notification.title}
        />
      )}
    </section>
  );
};

export default ContactForm;
