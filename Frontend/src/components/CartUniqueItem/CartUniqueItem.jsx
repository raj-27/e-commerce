import React from "react";
import { useSelector } from "react-redux";

const CartUniqueItem = () => {
  const UniqueItem = useSelector((state) =>state.cart.cartItems.length);
  return (
    <>
      {UniqueItem && (
        <>
          <div className="cart-unique-item cart-text">
            <p>Total Unique Item</p>
            <h3>{Math.round(UniqueItem)}</h3>
          </div>
        </>
      )}
    </>
  );
};

export default CartUniqueItem;
