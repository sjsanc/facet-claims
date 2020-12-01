import React from "react";
import style from "./Footer.module.scss";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function Footer() {
  return (
    <footer className={style.wrapper}>
      <Link to="/">Home</Link>
      <a href="https://github.com/sjsanc">
        <GitHubIcon />
      </a>
      <p>@sjsanc</p>
    </footer>
  );
}
