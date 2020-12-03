import React, { useState, useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import style from "./RegisterForm.module.scss";

interface UserForm {
  firstname: string;
  secondname: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  isExt: boolean;
}

export default function RegisterForm() {
  const [admin, setAdmin] = useState<boolean>();
  const [ext, setExt] = useState<boolean>();
  const [username, setUsername] = useState<string>();

  const { register, handleSubmit, watch, errors } = useForm<UserForm>();
  const onSubmit = (data: UserForm, e) => {
    console.log(data);
    sendRegister(data);
    e.target.reset();
  };

  const sendRegister = (data: UserForm) => {
    axios
      .post("/register", data, { withCredentials: true })
      .then((res: AxiosResponse) => {
        if (res.data === "OK") {
          console.log("New user registered with username: " + data.username);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper}>
      <div>
        <input
          className={errors.firstname ? style.error : undefined}
          name="firstname"
          ref={register({ required: true, maxLength: 20 })}
          placeholder="Firstname"
        />
        <input
          className={errors.secondname ? style.error : undefined}
          name="secondname"
          ref={register({ required: true, maxLength: 20 })}
          placeholder="Lastname"
        />
      </div>
      <input
        name="username"
        ref={register({ required: true, maxLength: 22 })}
        placeholder="Username"
        className={errors.username ? style.error : undefined}
        value={username}
      />
      <input
        name="password"
        type="password"
        ref={register({ required: true, maxLength: 30 })}
        placeholder="Password"
        className={errors.password ? style.error : undefined}
      />
      <input
        name="email"
        ref={register({ required: true })}
        placeholder="Email"
        className={errors.email ? style.error : undefined}
      />
      <div className={style.checks}>
        <div>
          <label className={ext ? style.disabled : undefined}>Admin</label>
          <input
            name="isAdmin"
            type="checkbox"
            ref={register}
            onChange={() => {
              setAdmin(!admin);
            }}
            disabled={ext ? true : false}
          />
        </div>
        <div>
          <label className={admin ? style.disabled : undefined}>External</label>
          <input
            name="isExt"
            type="checkbox"
            ref={register}
            onChange={() => {
              setExt(!ext);
            }}
            disabled={admin ? true : false}
          />
        </div>
      </div>
      {/* Gather dynamic userstats and stick em here */}
      <input className={style.submit} type="submit" value="Register" />
    </form>
  );
}
