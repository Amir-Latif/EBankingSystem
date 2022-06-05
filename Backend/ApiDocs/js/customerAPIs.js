//====================================================================
//#region Create Account
document
  .getElementById("createAccount")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("https://localhost:7023/api/customer/createAccount", {
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
//#region Make Transaction
document
  .getElementById("makeTransaction")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("https://localhost:7023/api/customer/makeTransaction", {
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
//#region Get Transaction Log
document
  .getElementById("getTransactionLog")
  .addEventListener("click", function (e) {
    e.preventDefault();

    fetch("https://localhost:7023/api/customer/getTransactionLog", {
      method: "GET",
      headers: {
        mode: "cors",
      },
    }).then((response) => {
      // Check if the status code == 200
      if (response.ok) response.json();
      // if not, check what is the error
      else response.json().then((data) => console.log(data.description));
    });
  });
//#endregion
//====================================================================