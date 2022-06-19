import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import Transaction from "./Transaction";
import Pending from "./Pending";
import Decided from "./Decided";
import { useNavigate } from "react-router-dom";
import { ajax } from "../../utilities/ajax";
import { cookies } from "../../utilities/cookies";

export default function AdminPanel() {
  const [activeItem, setActiveItem] = useState("Transaction log");
  const [barActive, setBarActive] = useState(false);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const navigateTo = useNavigate();

  function signOut() {
    ajax.get("identity/logOut");
    cookies.remove(["j", "r"]);
    navigateTo("/");
  }

  return (
    <div style={{ height: "1000px" }}>
      <Menu stackable inverted fixed="top">
        <h3 style={{ marginTop: "10px", marginLeft: "30px", color: "white" }}>
          Admin Panel
        </h3>
        <Menu.Item position="right">
          <Icon
            name="bars"
            style={{ cursor: "pointer" }}
            onClick={() => setBarActive(!barActive)}
          ></Icon>
        </Menu.Item>
      </Menu>
      {barActive === false && (
        <Menu
          vertical
          fixed="right"
          style={{ marginTop: "50px", minHeight: "610px" }}
        >
          <Menu.Item>
            <Menu.Header>Activities</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="Transaction log"
                active={activeItem === "Transaction log"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>User Registration requests</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="PendingCustomers"
                active={activeItem === "PendingCustomers"}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="DecidedCustomers"
                active={activeItem === "DecidedCustomers"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Bank-Account requests</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                name="PendingAccounts"
                active={activeItem === "PendingAccounts"}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="DecidedAccounts"
                active={activeItem === "DecidedAccounts"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header style={{ cursor: "pointer" }} onClick={signOut}>
              Logout
            </Menu.Header>
          </Menu.Item>
        </Menu>
      )}
      {activeItem === "PendingAccounts" && <Pending type="Account" />}
      {activeItem === "PendingCustomers" && <Pending type="Customer" />}
      {activeItem === "DecidedCustomers" && <Decided type="Customer" />}
      {activeItem === "DecidedAccounts" && <Decided type="Account" />}
      {activeItem === "Transaction log" && <Transaction />}
    </div>
  );
}
