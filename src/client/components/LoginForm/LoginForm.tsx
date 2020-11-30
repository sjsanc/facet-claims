import React, { useState } from "react";
import style from "./LoginForm.module.scss";
import axios, { AxiosResponse } from "axios";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = () => {
    axios
      .post(`/login`, { username, password }, { withCredentials: true })
      .then(
        (res: AxiosResponse) => {
          if (res.data === "OK") {
            window.location.href = "/";
          }
        },
        () => {
          console.log("Login failed");
        }
      );
  };

  return (
    <div className={style.wrapper}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
