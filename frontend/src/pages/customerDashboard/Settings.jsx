import React from "react";
import profile from "./profile.module.css";

export default function Settings({ customer, setActive }) {
  return (
    <div className="wrapper">
      <div className={profile.container}>
        <div className={profile.greating}>
          <h3>Welcome, Mr. {customer.name}</h3>
          <p>ID: {customer.id}</p>
        </div>

        <button onClick={()=> setActive("editCustomerData")}>Edit</button>

        <div className={profile.flex}>
          <div className={profile.setting}>
            <div>
              <h2>
                General
              </h2>
            </div>

            <table className={profile.setting_table}>
              <tr>
                <td>Full Name:</td>
                <td>{customer.name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{customer.email}</td>
              </tr>
              <tr>
                <td>Phone number:</td>
                <td>{customer.phone}</td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>**********</td>
              </tr>
            </table>
          </div>
          <div className={profile.setting}>
            <h2>
              Address
            </h2>
            <table className={profile.setting_table}>
              <tr>
                <td>Address:</td>
                <td>{customer.address}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{customer.city}</td>
              </tr>
              <tr>
                <td>Postal code:</td>
                <td>{customer.postal}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{customer.country}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
