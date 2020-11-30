import React from "react";
import style from "./Subnav.module.scss";

type SubNavProps = {
  links: string[];
  setComp: (comp: string) => any;
};

export default function Subnav({ links, setComp }: SubNavProps) {
  return (
    <div className={style.subnav}>
      <ul>
        {links.map((x) => (
          <li
            key={x}
            onClick={() => {
              console.log(x);
              setComp(x);
            }}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}
