import React from "react";

export default function Customer() {
  function createAccount(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/customer/createAccount", {
      method: "POST",
      headers: {
        mode: "cors",
        authorization: `Bearer ${document.cookie.split("j=")[1].split(";")[0]}`,
      },
      body: new FormData(e.currentTarget),
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok) response.json().then((data) => console.log(data));
      // if not, check what is the error
      else response.json().then((data) => console.log(data.description));
    });
  }

  function makeTransaction(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/customer/makeTransaction", {
      method: "POST",
      headers: {
        mode: "cors",
        authorization: `Bearer ${document.cookie.split("j=")[1].split(";")[0]}`,
      },
      body: new FormData(e.currentTarget),
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok) response.json().then((data) => console.log(data));
      // if not, check what is the error
      else response.json().then((data) => console.log(data.description));
    });
  }

  function getTransactionLog(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/customer/getTransactionLog", {
      method: "GET",
      headers: {
        mode: "cors",
        authorization: `Bearer ${document.cookie.split("j=")[1].split(";")[0]}`,
      },
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok) response.json().then((data) => console.log(data));
      // if not, check what is the error
      else response.json().then((data) => console.log(data.description));
    });
  }

  return (
    <>
      <h1>Customer APIs</h1>
      <h2>Create Account</h2>
      <form onSubmit={createAccount}>
        <select name="type" defaultValue="Current">
          <option value="Current">Current</option>
          <option value="Saving">Saving</option>
        </select>
        <input
          type="number"
          name="credit"
          placeholder="Starting credit"
          required
          min={1000}
        />
        <button type="submit">submit</button>
      </form>

      <h2>Make Transaction</h2>
      <form onClick={makeTransaction}>
        <select name="action" defaultValue="Deposit">
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Transfer">Transfer</option>
        </select>
        <input type="text" name="account" required placeholder="Account ID" />
        <input
          type="number"
          name="amount"
          placeholder="amount"
          required
          min={1}
        />
        <input
          type="text"
          name="transferredTo"
          placeholder="if you choose to transfer, kindly type the account ID of the account you want to transfer to"
        />
        <button type="submit">submit</button>
      </form>

      <h2>Get Transaction Log</h2>
      <button onClick={getTransactionLog}>Get Transaction Log</button>
    </>
  );
}
