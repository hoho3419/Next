import classes from "./newsletter-registration.module.css";
import { useState } from "react";

function NewsletterRegistration() {
  const [email, setEmail] = useState("");

  async function registrationHandler(event: React.FormEvent) {
    event.preventDefault();
    const sendData = {
      email: email,
    };

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    const { status } = response;
    if (status === 422) {
      alert("에러다");
      return;
    }
    const resData = await response.json();
    console.log(resData.message);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
