import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import "./Navbar.scss";

const Navbar = () => {
  const items = useSelector((state) => state.cart.cartItems);
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <h3>Logo</h3>
          </Link>
        </div>
        <div className="links">
          <Link className="nav-links" to="/">
            <h3>Home</h3>
          </Link>
          <Link className="nav-links" to="/cart">
            <h3>Cart</h3>
            <Badge color="primary" badgeContent={items?.length} overlap="rectangular">
              <ShoppingCartIcon className="icon" />
            </Badge>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
