import React from "react";
import style from "./UserDisplay.module.scss";

export default function ProfileGadget({ user }) {
  return (
    <div className={style.profileGadgetWrapper}>
      <div>
        <p>Firstname</p>
      </div>
      <div>
        <p>Secondname</p>
      </div>
      <div>
        <p>Username</p>
      </div>
      <div>
        <p>Email</p>
      </div>
      <div>
        <p>Password</p>
      </div>
      <div>
        <p>Confirm password</p>
      </div>
    </div>
  );
}
