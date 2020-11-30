import React, { useState } from "react";
import style from "./UserAdmin.module.scss";
import axios, { AxiosResponse } from "axios";
import { User } from "src/server/models/User.model";

export default function UserAdmin() {
  const [userList, setUserlist] = useState<User[]>([]);
  const [extCheck, setExtCheck] = useState<boolean>();
  const [activeCheck, setActiveCheck] = useState<boolean>();

  //   TODO build checks into search

  const searchUser = (name: string) => {
    axios
      .get("/getallusers", { withCredentials: true })
      .then((res: AxiosResponse) => {
        let users: User[] = [];
        res.data.forEach((user: User) => {
          if (name !== "") {
            if (
              user.username.includes(name) ||
              [user.firstname, user.secondname].join(" ").includes(name)
            ) {
              users.push(user);
            }
          }
        });
        setUserlist(users);
        console.log(users);
      });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.userSearchPanel}>
        <div>
          <h1>User Search</h1>
          <div>
            <label>External</label>
            <input type="checkbox"></input>
            <label>Active</label>
            <input type="checkbox"></input>
          </div>
        </div>
        <input
          type="text"
          className={style.search}
          placeholder="Search for a user"
          onChange={(e) => {
            searchUser(e.target.value);
          }}
        ></input>
        {userList.length > 0
          ? userList.map((x) => (
              <div
                className={
                  x.isActive === false
                    ? [style.user, style.inactive].join(" ")
                    : style.user
                }
                key={x.username}
              >
                <p>
                  {x.firstname + " " + x.secondname}
                  {x.isActive === false ? <span>inactive</span> : null}
                </p>
                <div>
                  {x.isAdmin ? (
                    <span className={style.adminTag}>admin</span>
                  ) : null}
                  {x.isExternal ? (
                    <span className={style.extTag}>external</span>
                  ) : null}
                </div>
              </div>
            ))
          : null}
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
