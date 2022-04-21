import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";

const AddressForm = ({ nextStep, orderData, setOrderData }) => {
  const { register } = useForm();
  const methods = useForm();

  const submitForm = (data) => {
    setOrderData({
      fullname: data.target[0].value,
      address: data.target[1].value,
      phoneNumber: data.target[2].value,
      email: data.target[3].value,
    });
    nextStep();
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={submitForm}>
          <Grid container spacing={3}>
            <FormInput
              {...register("fullname")}
              required
              name="fullname"
              label="Full name"
              defaultValue={orderData.fullname}
            />
            <FormInput
              required
              {...register("address")}
              name="address"
              label="Address"
              defaultValue={orderData.address}
            />
            <FormInput
              required
              {...register("phoneNumber")}
              name="phoneNumber"
              label="Phone Number"
              defaultValue={orderData.phoneNumber}
            />
            <FormInput
              required
              {...register("email")}
              name="email"
              label="Email"
              defaultValue={orderData.email}
            />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
