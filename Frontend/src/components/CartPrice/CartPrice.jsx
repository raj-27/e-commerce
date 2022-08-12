import React from "react";
import { useSelector } from "react-redux";

const CartPrice = () => {
  const cartTotalPrice = useSelector((state) =>
    state.cart.cartItems.reduce((a, b) => a + Number(b.totalPrice), 0)
  );
  // const cartTotalPrice = data.reduce((a, b) => a + Number(b.totalPrice));
  return (
    <>
      {cartTotalPrice && (
        <>
          <div className="cart-text cart-price">
            <p>Total Price</p>
            <h3>{+cartTotalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </>
  );
};

export default CartPrice;
