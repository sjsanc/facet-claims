import React, { useState } from "react";
import style from "./UserDisplay.module.scss";
import Tag from "../../components/Tag/Tag";
import ProfileGadget from "./ProfileGadget";

import { User } from "src/server/models/User.model";
import { cap } from "../../../core/cap";

export default function UserDisplay(props: { user: User | undefined }) {
  const [gadget, setGadget] = useState<string>("profile");

  const user = props.user;
  const navLinks = ["profile", "groups", "audit"];

  const switchGadget = (e) => {
    setGadget(e.target.id);
  };

  return (
    <div className={style.wrapper}>
      {user ? (
        <div>
          <div className={style.header}>
            <div>
              <h4>{user.firstname}</h4>
              <h3>
                {user.secondname}
                <span>({user.username})</span>
              </h3>
            </div>
            <div>{user.isActive === false ? <p>Inactive</p> : null}</div>
            <div>
              {user.isAdmin ? <Tag msg="admin" /> : null}
              {user.isExternal ? <Tag msg="external" /> : null}
            </div>
          </div>

          <div className={style.grid}>
            <div className={style.verticalNav}>
              {navLinks.map((x) => (
                <div
                  className={gadget === x ? style.activeLink : undefined}
                  key={x}
                  id={x}
                  onClick={switchGadget}
                >
                  {cap(x)}
                </div>
              ))}
            </div>
            <div className={style.displayBody}>
              {gadget === "profile" ? <ProfileGadget user={user} /> : null}
            </div>
          </div>
        </div>
      ) : (
        <p className={style.error}>No user selected</p>
      )}
    </div>
  );
}
