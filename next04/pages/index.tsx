import { useRef } from "react";

export default function Home() {
  const email = useRef<HTMLInputElement>(null);
  const formText = useRef<HTMLTextAreaElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const reqBody = {
      email: email.current?.value,
      formText: formText.current?.value,
    };
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const status = response.status;
      console.log(status);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="eamil">email</label>
          <input type="text" id="email" ref={email} />
          <label htmlFor="text">text</label>
          <textarea name="text" id="text" ref={formText}></textarea>
          <button>Submit Button</button>
        </form>
      </div>
    </div>
  );
}
