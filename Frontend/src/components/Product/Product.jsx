import React, { useState, useEffect } from "react";
import { Grid, Paper, Container } from "@material-ui/core";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, fetchCart } from "../../store/cartSlice";
import { fetchProducts, STATUSES } from "../../store/productSlice";
import "./product.scss";
const Product = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.product);
  useEffect(() => {
    console.log("Product Loaded");
    dispatch(fetchProducts());
    dispatch(fetchCart());
    return () => console.log("Cleanup..");
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(add(product));
    axios.post(`http://localhost:5000/`, product);
  };

  if (status === STATUSES.LOADING) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h3 className="heading">Products</h3>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {data.map((product) => (
            <Grid
              item
              xs={6}
              md={3}
              sm={4}
              lg={3}
              key={product.id}
              className="card"
            >
              <Paper elevation={3} className="paper">
                <div className="card-img">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="card-text">
                  <p className="card-title">{product.title}</p>
                  <p className="card-price">{product.price}</p>
                </div>
                <div className="card-action">
                  <button
                    className="add-to-cart"
                    onClick={() =>
                      handleAdd({
                        ...product,
                        quantity: 1,
                        totalPrice: product.price,
                      })
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Product;
