import React from "react";
import { withRouter } from "react-router-dom";
import { getToken, clearToken, clearCart } from "../utils/utils";
import UnAuthNav from "./unAuthNav";
import AuthNav from "./authNav";

const Navbar = ({ history }) => {
  const handleLogout = () => {
    // clear token
    clearToken();
    // clear cart
    clearCart();
    // redirect to home page
    history.push("/");
  };

  return getToken() ? <AuthNav handleLogout={handleLogout} /> : <UnAuthNav />;
};

export default withRouter(Navbar);
