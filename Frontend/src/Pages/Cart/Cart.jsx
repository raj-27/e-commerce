import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { remove, increment, decrement, fetchCart } from "../../store/cartSlice";
import axios from "axios";
import { CartPrice, CartUniqueItem } from "../../components/Index";

import "./cart.scss";

const Cart = () => {
  const products = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/${id}`);
    dispatch(remove(id));
  };

  const handleIncrement = (id, quantity) => {
    let newQuantity = quantity + 1;
    dispatch(increment(id));
    axios.post(`http://localhost:5000/${id}`, { quantity: newQuantity });
  };

  const handleDecrement = (id, quantity) => {
    let newQuantity = quantity - 1;
    dispatch(decrement(id));
    axios.post(`http://localhost:5000/${id}`, { quantity: newQuantity });
  };

  return (
    <>
      <Container>
        <h1 className="cart-heading">cart</h1>
        {products.map((product) => (
          <div className="cart-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className="cart-quantity ">
              <button
                className="btn-minus common"
                onClick={() => handleDecrement(product.id)}
              >
                -
              </button>
              <p className="quantity">{product.quantity}</p>
              <button
                className="btn-plus common"
                onClick={() => handleIncrement(product.id, product.quantity)}
              >
                +
              </button>
            </div>
            <h5>{Math.ceil(product.totalPrice)}</h5>
            <button
              className="btn-remove"
              onClick={() => handleRemove(product.id, product.quantity)}
            >
              Remove
            </button>
          </div>
        ))}
        <CartPrice />
        <CartUniqueItem />
      </Container>
    </>
  );
};

export default Cart;