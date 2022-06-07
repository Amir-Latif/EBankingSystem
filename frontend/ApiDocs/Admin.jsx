import React from "react";

export default function Admin() {
  function manageCustomer(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/admin/manageCustomer", {
      method: "POST",
      headers: {
        mode: "cors",
        authorization: `Bearer ${document.cookie.split("j=")[1].split(";")[0]}`,
      },
      body: new FormData(e.currentTarget),
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok) response.json();
      // if not, check what is the error
      else response.json().then((data) => console.log(data.description));
    });
  }

  function manageAccount(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/admin/manageAccount", {
      method: "POST",
      headers: {
        mode: "cors",
        authorization: `Bearer ${document.cookie.split("j=")[1].split(";")[0]}`,
      },
      body: new FormData(e.currentTarget),
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok) response.json();
      // if not, check what is the error
      else response.json().then((data) => console.log(data.description));
    });
  }

  function getCustomerStatus(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/admin/getCustomerStatus", {
      method: "GET",
      headers: {
        mode: "cors",
        authorization: `Bearer ${document.cookie.split("j=")[1].split(";")[0]}`,
      },
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok) {
        response.json().then((data) => console.log(data));
      }
      // if not, check what is the error
      else response.json().then((data) => console.log(data.description));
    });
  }

  return (
    <>
      <h1>Admin APIs</h1>
      <h2>Manage Customer</h2>
      <form onClick={manageCustomer}>
        <input type="text" name="email" placeholder="email" />
        <select name="status" defaultValue="Active">
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Suspended">Suspended</option>
        </select>
        <button type="submit">submit</button>
      </form>

      <h2>Manage Account</h2>
      <form onClick={manageAccount}>
        <input type="text" name="account" placeholder="account Id" />
        <select name="status" defaultValue="Active">
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Suspended">Suspended</option>
        </select>
        <button type="submit">submit</button>
      </form>

      <h2>Get Customer Status</h2>
      <button onClick={getCustomerStatus}>Get Customer Status</button>
    </>
  );
}
