import React from "react";

export default function Customer() {
  function createAccount(e) {
    e.preventDefault();

    fetch("https://localhost:7035/api/customer/createAccount", {
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

    fetch("https://localhost:7035/api/customer/makeTransaction", {
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

    fetch("https://localhost:7035/api/customer/getTransactionLog", {
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
      <h1>Create Account</h1>
      <form onClick={createAccount}>
        <select name="type" defaultValue="Current">
          <option value="Current">Current</option>
          <option value="Saving">Saving</option>
        </select>
        <input type="number" name="credit" placeholder="Starting credit" />
        <button type="submit">submit</button>
      </form>

      <h1>Make Transaction</h1>
      <form onClick={makeTransaction}>
        <select name="action" defaultValue="Deposit">
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Transfer">Transfer</option>
        </select>
        <input type="number" name="credit" placeholder="Starting credit" />
        <button type="submit">submit</button>
      </form>

      <h1>Get Transaction Log</h1>
      <button onClick={getTransactionLog}>Get Transaction Log</button>
    </>
  );
}
