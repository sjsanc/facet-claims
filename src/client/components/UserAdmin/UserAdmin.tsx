import React, { useState } from "react";
import style from "./UserAdmin.module.scss";
import axios, { AxiosResponse } from "axios";
import { User } from "src/server/models/User.model";

import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function UserAdmin() {
  const [userList, setUserlist] = useState<User[]>([]);
  const [extCheck, setExtCheck] = useState<boolean>(false);
  const [inactiveCheck, setInactiveCheck] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();

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
              if (inactiveCheck === false && extCheck === false) {
                if (user.isActive === true && user.isExternal === false)
                  users.push(user);
              } else if (inactiveCheck === true && extCheck === false) {
                if (
                  user.isActive === false ||
                  (user.isActive === true && user.isExternal === false)
                ) {
                  users.push(user);
                }
              } else if (inactiveCheck === true && extCheck === true) {
                users.push(user);
              } else if (inactiveCheck === false && extCheck === true) {
                if (
                  (user.isActive === true && user.isExternal === true) ||
                  user.isExternal === false
                ) {
                  users.push(user);
                }
              }
            }
          }
        });
        // userlist will overflow, fix css
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
            <input
              type="checkbox"
              onChange={() => {
                setExtCheck(!extCheck);
              }}
            ></input>
            <label>Inactive</label>
            <input
              type="checkbox"
              onChange={() => {
                setInactiveCheck(!inactiveCheck);
              }}
            ></input>
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
                onClick={() => {
                  setSelectedUser(x);
                }}
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
      <div className={style.userDisplayPanel}>
        {selectedUser ? (
          <>
            <div className={style.displayHeader}>
              <div>
                <div>
                  <h4>{selectedUser.firstname}</h4>
                  <h3>
                    {selectedUser.secondname}{" "}
                    <span>({selectedUser.username})</span>
                  </h3>
                </div>

                <div>
                  {selectedUser.isActive === false ? <p>Inactive</p> : null}
                </div>

                <div>
                  {selectedUser.isAdmin ? (
                    <span className={style.adminTag}>admin</span>
                  ) : null}
                  {selectedUser.isExternal ? (
                    <span className={style.extTag}>external</span>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={style.userDisplayBody}></div>
          </>
        ) : (
          <p className={style.noUser}>No user selected</p>
        )}
      </div>
      <div className={style.splitPanel}>
        <div>
          <h1>Register a new user</h1>
          <RegisterForm />
        </div>
        <div>
          <h1>Stats</h1>
        </div>
      </div>
    </div>
  );
}
