import React, { useState } from "react";
import identity from "../identity/identity.module.scss";
import main from "./main.module.css";
import { ajax } from "../../utilities/ajax";

export default function CreateAccount({
  setActive,
  setCustomerData,
  customerData,
}) {
  const [errorMessage, setErrorMessage] = useState([""]);
  const [checkedInput, setCheckedInput] = useState("Current");

  function createAccount(e) {
    e.preventDefault();
    ajax
      .post(
        "customer/createAccount",
        "form",
        new FormData(e.currentTarget),
        true
      )
      .then((account) => {
        setErrorMessage([""]);
        const updatedAccounts = [...customerData.accounts, account[0]];
        setCustomerData({ ...customerData, accounts: updatedAccounts });
        setActive("Home");
      })
      .catch((errors) => {
        if (typeof errors === "string") setErrorMessage([errors]);
        else setErrorMessage(errors);
      });
  }

  return (
    <div className={identity.sign}>
      <div className={identity.form}>
        <form className={identity.formBody} onSubmit={createAccount}>
          <h1> Create New Account</h1>
          <div className={identity.input}>
            <label htmlFor="type">Type</label>
            <div className={`${main.flex} ${main.radio}`}>
              <input
                type="radio"
                name="type"
                value="Current"
                checked={checkedInput === "Current"}
                onChange={(e) => setCheckedInput(e.target.value)}
              />
              <label htmlFor="Current">Current</label>
              <input
                type="radio"
                name="type"
                value="Saving"
                checked={checkedInput === "Saving"}
                onChange={(e) => setCheckedInput(e.target.value)}
              />
              <label htmlFor="Saving">Saving</label>
            </div>
            <label htmlFor="credit">Starting Credit</label>
            <input type="number" min={1000} name="credit" required />
            <div className={identity.errorMessage}>
              {errorMessage.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          </div>
          <div className={identity.flex}>
            <button
              style={{ marginBottom: 10, marginTop: 20 }}
              className={identity.btnSign}
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
