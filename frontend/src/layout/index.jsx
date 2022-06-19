import React from "react";
import { Outlet } from "react-router-dom";
import Nav from './Nav'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
