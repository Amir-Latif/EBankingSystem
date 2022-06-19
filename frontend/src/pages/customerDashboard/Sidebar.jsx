import React, { useState, useEffect } from "react";
import side from "./Sidebar.module.css";

export default function Sidebar(props) {
  // async function handlename(e) {
  //   if (props.active !== "") {
  //     const ele = document.getElementById(`${props.active}`);
  //     ele.classList.remove(side.actives);
  //     props.setActive(e.target.value);
  //   } else if (props.active === "") {
  //     props.setActive(e.target.value);
  //   }
  // }
  // if (props.active !== "") {
  //   handleItems();
  // }

  return (
    <>
      {props.disable === true && (
        <div>
          <div className={side.disable}>
            {/*}profile image & text{*/}
            <div className={side.disable}>
              <img src={require("./images/admin.png")} alt="profile_picture" />
              <h3>{props.customerName}</h3>
              <p>User</p>
            </div>
            {/*} menu item {*/}
            <div>
              <ul>
                <li
                  id="Home"
                  className={`${side.disable} ${
                    props.active === "Home" ? side.actives : ""
                  }`}
                >
                  <span>
                    <input
                      type="button"
                      disable={true}
                      value="Home"
                      onClick={(e) => props.setActive(e.target.value)}
                    />
                  </span>
                </li>
                <li
                  id="Transactions"
                  className={`${side.disable} ${
                    props.active === "Transactions" ? side.actives : ""
                  }`}
                >
                  <span>
                    <input
                      type="button"
                      disable={true}
                      value="Transactions"
                      onClick={(e) => props.setActive(e.target.value)}
                    />
                  </span>
                </li>
                <li
                  id="make-transaction"
                  className={`${side.disable} ${
                    props.active === "Make Transaction" ? side.actives : ""
                  }`}
                >
                  <span>
                    <input
                      type="button"
                      disable={true}
                      value="Make Transaction"
                      onClick={(e) => props.setActive(e.target.value)}
                    />
                  </span>
                </li>
                <li
                  id="Settings"
                  className={`${side.disable} ${
                    props.active === "Settings" ? side.actives : ""
                  }`}
                >
                  <span id="Settings">
                    <input
                      type="button"
                      disable={true}
                      value="Settings"
                      onClick={(e) => props.setActive(e.target.value)}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {props.disable !== true && (
        <div className={side.sidebar}>
          {/*}profile image & text{*/}
          <div className={side.profile}>
            <img src={require("./images/admin.png")} alt="profile_picture" />
            <h3>{props.customerName}</h3>
            <p>User</p>
          </div>
          {/*} menu item {*/}
          <div>
            <ul>
              <li
                id="Home"
                className={`${side.li} ${
                  props.active === "Home" ? side.actives : ""
                }`}
              >
                <span>
                  <input
                    type="button"
                    disable={true}
                    value="Home"
                    onClick={(e) => props.setActive(e.target.value)}
                  />
                </span>
              </li>
              <li
                id="Transactions"
                className={`${side.li} ${
                  props.active === "Transactions" ? side.actives : ""
                }`}
              >
                <span>
                  <input
                    type="button"
                    disable={true}
                    value="Transactions"
                    onClick={(e) => props.setActive(e.target.value)}
                  />
                </span>
              </li>
              <li
                id="make-transaction"
                className={`${side.li} ${
                  props.active === "Make Transaction" ? side.actives : ""
                }`}
              >
                <span>
                  <input
                    type="button"
                    disable={true}
                    value="Make Transaction"
                    onClick={(e) => props.setActive(e.target.value)}
                  />
                </span>
              </li>
              <li
                id="Settings"
                className={`${side.li} ${
                  props.active === "Settings" ? side.actives : ""
                }`}
              >
                <span id="Settings">
                  <input
                    type="button"
                    disable={true}
                    value="Settings"
                    onClick={(e) => props.setActive(e.target.value)}
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
