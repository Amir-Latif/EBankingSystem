import React, { useState } from "react";
import identity from "../identity/identity.module.scss";
import { ajax } from "../../utilities/ajax";

export default function EditCustomerData({
  customer,
  setActive,
  setCustomerData,
}) {
  const [firstName, setFirstName] = useState(customer.name.split(" ")[0]);
  const [lastName, setLastName] = useState(customer.name.split(" ")[1]);
  const [Email, setEmail] = useState(customer.email);
  const [Phone, setPhone] = useState(customer.phone);
  const [currentPassword, setCurrentPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(customer.address);
  const [city, setCity] = useState(customer.city);
  const [country, setCountry] = useState(customer.country);
  const [postalCode, setPostalCode] = useState(customer.postal);
  const [errorMessage, setErrorMessage] = useState([""]);

  function edit(e) {
    e.preventDefault();

    if (confirmPassword !== Password) {
      setErrorMessage(["Passwords do not match"]);
      return;
    }

    var formdata = new FormData();
    formdata.append("FirstName", firstName);
    formdata.append("LastName", lastName);
    formdata.append("Email", Email);
    formdata.append("Phone", Phone);
    formdata.append("currentPassword", currentPassword);
    formdata.append("Password", Password);
    formdata.append("address", address);
    formdata.append("city", city);
    formdata.append("country", country);
    formdata.append("postalCode", postalCode);

    ajax
      .post("customer/editCustomerData", "form", formdata, true)
      .then(() => {
        setErrorMessage([""]);
        setCustomerData({
          ...customer,
          name: `${firstName} ${lastName}`,
          email: Email,
          phone: Phone,
          address: address,
          city: city,
          country: country,
          postal: postalCode,
        });
        setActive("Settings");
      })
      .catch((errors) => {
        if (typeof errors === "string") setErrorMessage([errors]);
        else setErrorMessage(errors);
      });
  }

  return (
    <>
      <div className={identity.sign}>
        <main className={identity.form}>
          <form onSubmit={(e) => edit(e)} className={identity.formBody}>
            <h1>Edit Customer Data</h1>
            <div className={identity.input}>
              <div className={identity.inputItems}>
                <div className={identity.inputItem}>
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="first-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className={identity.inputItem}>
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="last-name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className={identity.inputItems}>
                <div className={identity.inputItem}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={identity.inputItem}>
                  <label htmlFor="phone-number">Contact Number</label>
                  <input
                    type="tel"
                    id="phone-number"
                    name="phoneNumber"
                    pattern="[0-5]{3}[0-9]{8}"
                    required
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className={identity.inputItems}>
                <div className={identity.inputItem}>
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="current-password"
                    pattern="[0-9-a-z]{8,20}[A-Z]{1}[*-+-?-!]{1}"
                    required
                    minLength="8"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={identity.inputItems}>
                <div className={identity.inputItem}>
                  <label htmlFor="password">Password (8 characters)</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    pattern="[0-9-a-z]{8,20}[A-Z]{1}[*-+-?-!]{1}"
                    required
                    minLength="8"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={identity.inputItem}>
                  <label htmlFor="confirm password">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    required
                    minLength="8"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className={identity.inputItems}>
                <div className={identity.inputItem}>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    required
                    minLength="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className={identity.inputItem}>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    minLength="3"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className={identity.inputItems}>
                <div className={identity.inputItem}>
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    required
                    minLength="3"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className={identity.inputItem}>
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postal-code"
                    required
                    minLength="5"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>
              <div className={identity.errorMessage}>
                {errorMessage.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            </div>
            <div className={identity.flex}>
              <button
                style={{ marginBottom: "10px", marginTop: "25px:" }}
                className={identity.btnSign}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
