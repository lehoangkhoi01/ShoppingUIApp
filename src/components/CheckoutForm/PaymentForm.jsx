import React from "react";
import Review from "./Review";

const PaymentForm = ({
  orderData,
  setOrderData,
  nextStep,
  backStep,
  onCheckout,
}) => {
  return (
    <>
      <Review
        nextStep={nextStep}
        backStep={backStep}
        orderData={orderData}
        setOrderData={setOrderData}
        onCheckout={onCheckout}
      />
    </>
  );
};

export default PaymentForm;
