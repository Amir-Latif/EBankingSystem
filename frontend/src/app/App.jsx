import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Landingpage from "../pages/Landingpage";
import Layout from "../layout";
import SignIn from "../pages/identity/SignIn";
import Register from "../pages/identity/Register";
import AdminPanel from "../pages/adminPanel";
import UserDashboard from "../pages/customerDashboard";
import { cookies } from "../utilities/cookies";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Landingpage />} />
        <Route path="register" element={<Register />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="customerDashboard" element={<UserDashboard />} />
        <Route path="adminPanel" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
