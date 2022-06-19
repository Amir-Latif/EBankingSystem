import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import Home_Dash from "./Home";
import Sidebar from "./Sidebar";
import Transaction from "./Transactions";
import Settings from "./Settings";
import CreateAccount from "./CreateAccount";
import MainStyle from "./main.module.css";
import { ajax } from "../../utilities/ajax";
import EditCustomerData from "./EditCustomerData";
import MakeTransaction from "./MakeTransaction";

export default function UserDashboard() {
  const [barActive, setBarActive] = useState(false);
  const [active, setActive] = useState("Home");

  //#region Customer Data
  const [customerData, setCustomerData] = useState({});
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    ajax.get("customer/getCustomerData", true).then((data) => {
      setCustomerData(data);
      setDidMount(true);
    });
  }, []);

  //#endregion

  return didMount && customerData.status === "Active" ? (
    <>
      <Menu stackable fixed="top">
        <h3
          style={{
            marginTop: "10px",
            marginLeft: "30px",
            color: "white",
            color: "black",
          }}
        >
          Dashboard
        </h3>

        <Menu.Item position="right">
          <Icon
            name="bars"
            style={{ cursor: "pointer" }}
            onClick={() => setBarActive(!barActive)}
          ></Icon>
        </Menu.Item>
      </Menu>

      <div className={MainStyle.flexContainer}>
        {barActive === false && (
          <Sidebar
            customerName={customerData.name}
            active={active}
            setActive={setActive}
            disable={false}
          />
        )}
        {barActive === true && (
          <Sidebar
            customerName={customerData.name}
            active={active}
            setActive={setActive}
            disable={true}
          />
        )}

        <div className={MainStyle.active}>
          {active === "Home" && (
            <Home_Dash customer={customerData} setActive={setActive} />
          )}
          {active === "Transactions" && (
            <Transaction
              customerName={customerData.name}
              customerId={customerData.id}
              accounts={customerData.accounts.map((account) => {
                return {
                  type: account.type,
                  id: account.id,
                };
              })}
            />
          )}
          {active === "Settings" && (
            <Settings setActive={setActive} customer={customerData} />
          )}
          {active === "Make Transaction" && (
            <MakeTransaction
              setActive={setActive}
              accounts={customerData.accounts.map((account) => account.id)}
            />
          )}
          {active === "CreateAccount" && (
            <CreateAccount
              setActive={setActive}
              customerData={customerData}
              setCustomerData={setCustomerData}
            />
          )}{" "}
          {active === "editCustomerData" && (
            <EditCustomerData
              customer={customerData}
              setActive={setActive}
              setCustomerData={setCustomerData}
            />
          )}
        </div>
      </div>
    </>
  ) : didMount && customerData.status !== "Active" ? (
    <div className={MainStyle.inactiveAccount}>
      <p>Your account is not active.</p>
      <p>Kindly contact the admin</p>
    </div>
  ) : (
    <div></div>
  );
}
