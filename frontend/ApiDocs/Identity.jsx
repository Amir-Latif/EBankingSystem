import React from "react";

export default function Identity() {
  function register(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/identity/register", {
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
    fetch("https://ebankingsystem.herokuapp.com/api/identity/login", {
      method: "POST",
      headers: {
        mode: "cors",
      },
      body: new FormData(e.currentTarget),
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok)
        return response
          .json()
          .then((data) => (document.cookie = `j=${data.j}`));
      // if not, check what is the error
      else response.json().then((data) => console.log(data.description));
    });
  }

  function logout() {
    document.cookie = "j=''; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    fetch("https://ebankingsystem.herokuapp.com/api/identity/logout", {
      method: "GET",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function requestPasswordReset(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/identity/requestPasswordReset", {
      method: "POST",
      headers: {
        mode: "cors",
        authorization: `Bearer ${document.cookie.split("j=")[1].split(";")[0]}`,
      },
      body: new FormData(e.currentTarget),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function changePassword(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/identity/changePassword", {
      method: "POST",
      headers: {
        mode: "cors",
      },
      body: new FormData(e.currentTarget),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function resetPassword(e) {
    e.preventDefault();

    fetch("https://ebankingsystem.herokuapp.com/api/identity/resetPassword", {
      method: "POST",
      headers: {
        mode: "cors",
      },
      body: new FormData(e.currentTarget),
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok) return response.json();
      // if not, check what is the error
      else return response.json().then((data) => console.log(data.description));
    });
  }

  return (
    <>
      <h1>Identity</h1>
      <h2>Register new user</h2>
      <form onSubmit={register}>
        <input type="text" name="firstName" placeholder="First Name" required />
        <input type="text" name="lastName" placeholder="Last Name" required />
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

      <h2>Login</h2>
      <form onSubmit={login}>
        <input type="email" name="email" placeholder="email" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          minLength={8}
          required
        />
        <label htmlFor="rememberMe">Remember Me</label>
        <input type="checkbox" name="rememberMe" />
        <button type="submit">login</button>
      </form>

      <h2>Logout</h2>
      <button onClick={logout}>logout</button>

      <h2>Request password reset</h2>
      <form onSubmit={requestPasswordReset}>
        <input type="email" name="email" placeholder="email" required />
        <button type="submit">request password reset</button>
      </form>

      <h2>Reset Password</h2>
      <form onSubmit={resetPassword}>
        <input
          type="text"
          name="userId"
          placeholder="userId from url"
          required
        />
        <input type="text" name="code" placeholder="code from url" required />
        <input
          type="password"
          name="newPassword"
          placeholder="new password"
          required
        />
        <button type="submit">submit</button>
      </form>

      <h2>Change password</h2>
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
    </>
  );
}
