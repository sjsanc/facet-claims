import React, { useContext, useState, useEffect } from "react";
import style from "./Navbar.module.scss";
import { context } from "../../context/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import Brand from "../../assets/brand-gold.png";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

export default function Navbar() {
  const ctx = useContext(context);

  const [expanded, setExpanded] = useState<boolean>(false);

  const expandProfile = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    // Handle click outside of profile dropdown
    if (expanded) window.addEventListener("click", expandProfile);
    return () => {
      window.removeEventListener("click", expandProfile);
    };
  }, [expandProfile]);

  const logout = () => {
    axios
      .get("/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/";
        }
      });
  };

  return (
    <div className={style.wrapper}>
      <Link to="/">
        <div className={style.brand}>
          <img src={Brand}></img>
        </div>
      </Link>
      {ctx ? (
        // only display searchbar to users
        <>
          <div className={style.searchbar}>
            <select>
              <option value="FCT">FCT</option>
              <option value="GEM">GEM</option>
            </select>
            <ExpandMoreIcon className={style.prefixSelect} />
            <input placeholder="Search for a claim..." />
            <button>
              <SearchIcon fontSize="small" />
            </button>
          </div>

          <div className={style.links}>
            <Link to="/claims">Claims</Link>
            <Link to="/reports">Reports</Link>
            {ctx.isAdmin ? <Link to="/admin">Admin</Link> : null}
          </div>

          <div className={style.profile}>
            <div>
              <p>Welcome,</p>
              <Link to="/profile">
                <h2>{ctx.firstname}</h2>
              </Link>
            </div>
            <div onClick={expandProfile}>
              <AccountBoxIcon />
            </div>
            <div
              className={
                expanded
                  ? [style.profileDropdown, style.expanded].join(" ")
                  : style.profileDropdown
              }
            >
              <div>
                <Link to="/profile">Profile</Link>
              </div>
              <div onClick={logout}>Logout</div>
            </div>
          </div>
        </>
      ) : (
        <Link className={style.signin} to="/login">
          <h3>Sign in</h3>
        </Link>
      )}
    </div>
  );
}
