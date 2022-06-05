//#region Manage Customer
document
  .getElementById("manageCustomer")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("https://localhost:7023/api/admin/manageCustomer", {
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
//#region Manage Account
document
  .getElementById("manageAccount")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("https://localhost:7023/api/admin/manageAccount", {
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
//#region Get Customer Details
document
  .getElementById("getCustomerDetails")
  .addEventListener("click", function (e) {
    e.preventDefault();

    fetch("https://localhost:7023/api/admin/getCustomerDetails", {
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
