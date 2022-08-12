import { Container, Paper, Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import Confirmation from "../Confirmation/Confirmation";
import Summary from "../Summary/Summary";
import Address from "../Address/Address";
import "./checkout.scss";
let steps = ["Summary", "Address"];
const Checkout = () => {
  let [activeStep, setActiveStep] = useState(0);
  let next = () => setActiveStep(activeStep + 1);
  let previous = () => setActiveStep(activeStep - 1);
  let Form = () => {
    return (
      <>
        {activeStep === 0 ? (
          <Summary next={next} />
        ) : (
          <Address next={next} previous={previous} />
        )}
      </>
    );
  };
  return (
    <>
      <Container
        className="checkout-container"
        justifyContent="center"
        align="center"
      >
        <h2 className="checkout-heading">Checkout</h2>
        <Paper elevation={2} className="checkout-paper">
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </Container>
    </>
  );
};

export default Checkout;
