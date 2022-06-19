import React from "react";
import main from "./main.module.css";

export default function Home_Dash({ customer, setActive }) {

  return (
    <div>
      <div className="wrapper">
        <div className={main.container}>
          <div className={main.greating}>
            <h3>Welcome, {customer.name}</h3>
            <p>ID: {customer.id}</p>
          </div>
          <div className={main.balance} id="dashboard">
            <h3>Total balance</h3>
            <h1>{customer.totalBalance} EGP</h1>
            <p className={main.active_account}>Active</p>
          </div>
          <div className={main.accountsWrapper}>
            <h2>Current Accounts ({customer.accounts.length})</h2>
            <div className={main.accounts}>
              {customer.accounts.length > 0 &&
                customer.accounts.map((account) => (
                  <div key={account.id} className="current_account">
                    <button>
                      <a href="">
                        <i className="fa-solid fa-credit-card"></i>
                        <p>
                          XXXX-XXXX-XXXX-
                          {account.id.substring(account.id.length - 4)}
                        </p>
                        <p>Type: {account.type}</p>
                        <p>Status: {account.status}</p>
                      </a>
                    </button>
                  </div>
                ))}
              <div
                className={main.add_account}
                onClick={() => setActive("CreateAccount")}
              >
                <button>
                  <a href="">
                    <i className="fa-solid fa-plus"></i>
                    <p>Create New Account</p>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
