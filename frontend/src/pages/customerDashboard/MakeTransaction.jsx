import React, { useState } from "react";
import identity from "../identity/identity.module.scss";
import main from "./main.module.css";
import { ajax } from "../../utilities/ajax";

export default function MakeTransaction({ accounts }) {
  const [checkedRadio, setCheckedRadio] = useState("Deposit");
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [feedbackMessage, setFeedbackMessage] = useState([""]);

  const actions = ["Deposit", "Widthraw", "Transfer"];

  function makeTransaction(e) {
    e.preventDefault();
    ajax
      .post(
        "customer/makeTransaction",
        "form",
        new FormData(e.currentTarget),
        true
      )
      .then((res) => {
        setFeedbackMessage([`Transaction is done with ID ${res}`]);
        e.currentTarget.reset();
      })
      .catch((errors) => {
        if (typeof errors === "string") setFeedbackMessage([errors]);
        else setFeedbackMessage(errors);
      });
  }

  return (
    <div className={identity.sign}>
      <div className={identity.form}>
        <form className={identity.formBody} onSubmit={makeTransaction}>
          <h1> Make Transaction</h1>
          <div className={identity.input}>
            <label htmlFor="action">Action</label>
            <div className={`${main.flex} ${main.radio}`}>
              {actions.map((action) => (
                <React.Fragment key={action}>
                  <input
                    type="radio"
                    name="action"
                    value={action}
                    checked={checkedRadio === action}
                    onChange={(e) => setCheckedRadio(e.target.value)}
                  />
                  <label htmlFor={action}>{action}</label>
                </React.Fragment>
              ))}
            </div>

            <label htmlFor="amount">Amount</label>
            <input type="number" name="amount" min={500} required />
            <label htmlFor="account">Account ID</label>
            <select
              name="account"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>
            {checkedRadio === "Transfer" && (
              <>
                <label htmlFor="transferredTo">
                  The account you want to transfer to
                </label>
                <input type="text" name="transferredTo" required />
              </>
            )}

            <div className={identity.feedbackMessage}>
              {feedbackMessage.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
          </div>
          <div className={identity.flex}>
            <button
              style={{ marginBottom: 10, marginTop: 20 }}
              className={identity.btnSign}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
