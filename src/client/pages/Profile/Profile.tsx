import React, { useContext } from "react";
import { context } from "../../context/Context";
import style from "./Profile.module.scss";

export default function Profile() {
  const ctx = useContext(context);

  return (
    <div className={style.profile}>
      You are logged in as {ctx ? ctx.username : null}
    </div>
  );
}
