import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import './address.scss'
const Address = ({previous,next}) => {
  let [userInfo, setUserInfro] = useState({
    Name: "",
    Email: "",
    Country: "",
    Pincode: "",
   Phone_Number: "",
  });

  const handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setUserInfro({ ...userInfo, [name]: value });
  };

  let handleSubmit=(e)=>{
    e.preventDefault();
    console.log(userInfo);
    next();
  };

  return (
    <>
    <Typography variant="h6"  className="address-heading">Address</Typography>
      <form noValidate autoComplete="off" className="form" onSubmit={handleSubmit}>
        <Grid container justifyContent="center" spacing={2} >
            <Grid item xs={12}  sm={6}>
              <TextField fullWidth variant="filled" className="form-inputfield" name='Name' value={userInfo.Name} type="text" id="standard-secondary" label='Name' color="secondary" onChange={handleInput} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth variant="filled" className="form-inputfield" name='Email' value={userInfo.Email} type="text" id="standard-secondary" label='Email' color="secondary" onChange={handleInput} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth variant="filled" className="form-inputfield" name='Phone_Number' value={userInfo.Phone_Number} type="number" id="standard-secondary" label='Phone_Number' color="secondary" onChange={handleInput} />
            </Grid>
            <Grid item xs={12} >
              <TextField fullWidth variant="filled" className="form-inputfield" name='Country' value={userInfo.Country} type="text" id="standard-secondary" label='Country' color="secondary" onChange={handleInput} />
            </Grid>
            <Grid item xs={12} >
              <TextField fullWidth variant="filled" className="form-inputfield" name='Pincode' value={userInfo.Pincode} type="number" id="standard-secondary" label='Pincode' color="secondary" onChange={handleInput} />
            </Grid>
        </Grid>
        <div className="form-btn">
          <button className="prev-btn btn" onClick={()=>previous()} >Previous</button>
          <button className="Submit-btn btn">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Address;
