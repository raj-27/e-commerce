import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
// import { fetchCart } from '../../store/cartSlice';
import './summary.scss'
const Summary = ({next}) => {
  let products=useSelector(state=>state.cart.cartItems);
  const TotalAmount = useSelector((state) =>
    state.cart.cartItems.reduce((a, b) => a + Number(b.totalPrice), 0)
  );
  const navigate =useNavigate()

  let handleNext = () => {
    next();
  }

   return (
   <>
    <Typography variant="h6" gutterBottom className="summary-heading">Order summary</Typography>
    <List>
      {products.map((item) => (
        <ListItem style={{ padding: '10px 0' }} key={item.id}>
          <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity}`} />
          <Typography variant="body2">{item.totalPrice}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          {+TotalAmount.toFixed(2)}
        </Typography>
      </ListItem>
    </List>
    <div className="summary-btns">
      <button className="cart-redirect btn" onClick={()=>navigate('/cart')}>Cart</button>
      <button className="next btn" onClick={handleNext}>Next</button>
    </div>
   </>
  )
}

export default Summary