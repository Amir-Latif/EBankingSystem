//#region Register

document.getElementById("register").addEventListener("submit", function (e) {
  e.preventDefault();
  fetch("https://localhost:7023/api/identity/register", {
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
});

//#endregion
//====================================================================

//#region Login
document.getElementById("login").addEventListener("submit", function (e) {
  e.preventDefault();
  fetch("https://localhost:7023/api/identity/login", {
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
});
//#endregion
//====================================================================
//#region Logout
document.getElementById("logout").addEventListener("click", function () {
  fetch("https://localhost:7023/api/identity/logout", {
    method: "GET",
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//#endregion
//====================================================================
//#region ChangePassword
document
  .getElementById("changePassword")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("https://localhost:7023/api/identity/changePassword", {
      method: "POST",
      headers: {
        mode: "cors",
      },
      body: new FormData(e.currentTarget),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
//#endregion
//====================================================================
