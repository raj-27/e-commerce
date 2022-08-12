import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { remove, increment, decrement, fetchCart } from "../../store/cartSlice";
import axios from "axios";
import { CartPrice, CartUniqueItem } from "../../components/Index";
import { FaTrash } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import "./cart.scss";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const products = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleRemove = (id) => {
    axios.delete(`http://localhost:5000/${id}`);
    dispatch(remove(id));
  };

  const handleIncrement = (id, quantity) => {
    dispatch(increment(id));
    axios.post(`http://localhost:5000/quantity/${Number(id)}`,{text:'increment'});
  };

  const handleDecrement = (id, quantity) => {
    dispatch(decrement(id));
    axios.post(`http://localhost:5000/quantity/${Number(id)}`,{text:'decrement'});
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
                <AiOutlineMinus/>
              </button>
              <p className="quantity">{product.quantity}</p>
              <button
                className="btn-plus common"
                onClick={() => handleIncrement(product.id, product.quantity)}
              >
                <AiOutlinePlus/>
              </button>
            </div>
            <h5>{+product.totalPrice.toFixed(2)}</h5>
            <button
              className="btn-remove"
              onClick={() => handleRemove(product.id)}
            >
              <FaTrash/>
            </button>
          </div>
        ))}
        <CartPrice />
        <CartUniqueItem />
        <div className="cart-button">
          <div className="home-redirect">
            <button className="btn common" onClick={() => navigate('/')}>Home</button>
          </div>
          <div className="cart-action-btn">
            <button className="btn common">Empty Cart</button>
            <button className="btn common" onClick={() => navigate('/checkout')}>Checkout</button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;