import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import style from "./Login.module.scss";

export default function Login() {
  return (
    <div className={style.wrapper}>
      <LoginForm />
    </div>
  );
}
