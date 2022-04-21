import React, { useState, useContext } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import useStyles from "./style";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import axios from "axios";
import { BASE_URL } from "../../../constant";
import CartContext from "../../../context/Cart/CartContext";

const steps = ["Shipping address", "Order details"];

const Checkout = () => {
  const { emptyCart, cartItems } = useContext(CartContext);
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    fullname: "",
    address: "",
    email: "",
    phoneNumber: "",
    totalPrice: 0,
  });

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitCheckout = (totalPrice) => {
    let itemList = [];
    cartItems.forEach((item) => {
      const itemData = {
        price: item.price,
        quantity: item.quantity,
        productId: item.id,
      };
      itemList.push(itemData);
    });

    let data = {
      customerName: orderData.fullname,
      customerEmail: orderData.email,
      phoneNumber: orderData.phoneNumber,
      address: orderData.address,
      totalPrice: totalPrice,
      orderDetails: [...itemList],
    };

    axios
      .post(BASE_URL + "/orders", data)
      .then((respone) => {
        console.log(respone);
        setOpen(true);
        setTimeout(() => {
          history.push("/");
          emptyCart();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        nextStep={nextStep}
        orderData={orderData}
        setOrderData={setOrderData}
      />
    ) : (
      <PaymentForm
        nextStep={nextStep}
        backStep={backStep}
        orderData={orderData}
        setOrderData={setOrderData}
        onCheckout={submitCheckout}
      />
    );

  const Confirmation = () => <div>Confirmation</div>;
  return (
    <div>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Your order are successful. Please check your email.
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
};

export default Checkout;
