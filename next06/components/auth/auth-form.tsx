import { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import axios from "axios";

const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post("api/auth/signup", { email, password });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  const SubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLogin) {
      // 회원가입
      const userData = {
        email: email.current?.value as string,
        password: password.current?.value as string,
      };
      try {
        const result = await createUser(userData);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      // 로그인
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={email} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={password} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
