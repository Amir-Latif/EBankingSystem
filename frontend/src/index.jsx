import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));

function register(e) {
  e.preventDefault();

  fetch("https://localhost:7035/api/identity/register", {
    method: "POST",
    headers: {
      mode: "cors",
    },
    body: new FormData(e.currentTarget),
  }).then((response) => {
    // Check if the status code == 200
    if (response.ok) response.json();
    // if not, check what is the error
    else response.json().then((data) => console.log(data.description));
  });
}

function login(e) {
  e.preventDefault();
  fetch("https://localhost:7035/api/identity/login", {
    method: "POST",
    headers: {
      mode: "cors",
    },
    body: new FormData(e.currentTarget),
  }).then((response) => {
    // Check if the status code == 200
    if (response.ok) return response.json()
    .then(data => document.cookie = `j=${data.j}`);
    // if not, check what is the error
    else response.json().then((data) => console.log(data.description));
  });
}

function logout() {
  fetch("https://localhost:7035/api/identity/logout", {
    method: "GET",
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function changePassword(e) {
  e.preventDefault();

  fetch("https://localhost:7035/api/identity/changePassword", {
    method: "POST",
    headers: {
      mode: "cors",
    },
    body: new FormData(e.currentTarget),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function manageCustomer(e) {
  e.preventDefault();

  fetch("https://localhost:7035/api/admin/manageCustomer", {
    method: "POST",
    headers: {
      mode: "cors",
      authorization : `Bearer ${document.cookie.split('j=')[1].split(';')[0]}`
    },
    body: new FormData(e.currentTarget),
  }).then((response) => {
    // Check if the status code == 200
    if (response.ok) return response.json();
    // if not, check what is the error
    else return response.json().then((data) => console.log(data.description));
  });
}

root.render(
  <React.StrictMode>
    <>
      <h1>Register new user</h1>
      <form onSubmit={register}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <input
          type="text"
          name="phone"
          minLength="11"
          maxLength="11"
          required
        />
        <button type="submit">Register</button>
      </form>

      <h1>Login</h1>
      <form onSubmit={login}>
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <label htmlFor="rememberMe">Remember Me</label>
        <input type="checkbox" name="rememberMe" />
        <button type="submit">login</button>
      </form>

      <h1>Logout</h1>
      <button onClick={logout}>logout</button>

      <h1>Change password</h1>
      <form onSubmit={changePassword}>
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="currentPassword"
          placeholder="current password"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="new password"
          required
        />
        <button type="submit">changePassword</button>
      </form>

      <h1>Manage Customer</h1>
      <form id="manageCustomer" onSubmit={manageCustomer}>
        <input type="email" name="email" required />
        <select name="status" defaultValue={"Active"}>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
