import React from "react";
import Navs from "./Nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ajax } from "../../utilities/ajax";
import { cookies } from "../../utilities/cookies";

function Nav() {
  const navigateTo = useNavigate();

  function signOut() {
    ajax.get("identity/logOut");
    cookies.remove(["j", "r"]);
    navigateTo("/");
  }

  return (
    <header>
      <div className={Navs.container}>
        <a className={Navs.logo} href="index.html">
          MaZe Bank
        </a>
        <div className={Navs.flex}>
          {cookies.get("j", true) ? (
            <a href style={{ cursor: "pointer" }} onClick={signOut}>
              Sign Out
            </a>
          ) : (
            <>
              <Link to="/signIn">Sign in</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;
