import React, { useState } from "react";
import style from "./Admin.module.scss";

import Subnav from "../../components/Subnav/Subnav";
import UserAdmin from "../../components/UserAdmin/UserAdmin";

export default function Admin() {
  const links = ["User Admin", "Policy Admin"];
  const [comp, setComp] = useState<string>("");

  const setCurrentComponent = (component: string): void => {
    setComp(component);
  };

  return (
    <div className={style.wrapper}>
      <Subnav links={links} setComp={setCurrentComponent} />
      {comp === links[0] ? <UserAdmin /> : null}
    </div>
  );
}
