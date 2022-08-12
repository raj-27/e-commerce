import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import './confirmation.scss';
const Confirmation = () => {
  let navigate=useNavigate();
  return (
    <motion.div whileInView={{ opacity: [0, 1] }}>
          <Typography variant="h6" gutterBottom >Your order is confirmed!!!</Typography>
          <button onClick={()=>navigate('/')} className="back-to-home">Back to Home</button>
    </motion.div>
  );
};

export default Confirmation;
