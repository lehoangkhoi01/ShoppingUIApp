import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import { formatPriceWithSymbol } from "../../lib/utils";
import CartContext from "../../context/Cart/CartContext";

const Review = ({ backStep, onCheckout }) => {
  const { cartItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        totalPrice += item.price;
      });
    }
    setTotalPrice(totalPrice);
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => (
          <ListItem style={{ padding: "10px 0" }} key={item.productName}>
            <ListItemText
              primary={item.productName}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body2">
              {formatPriceWithSymbol(item.price)}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {formatPriceWithSymbol(totalPrice)}
          </Typography>
        </ListItem>
      </List>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Button variant="outlined" onClick={backStep}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onCheckout(totalPrice)}
        >
          Checkout
        </Button>
      </div>
    </>
  );
};

export default Review;
