import React from "react";
import style from "./Tag.module.scss";

type TagType = {
  msg: "admin" | "external" | "warning" | "error";
};

export default function Tag({ msg }: TagType) {
  return <div className={style[msg]}>{msg}</div>;
}
