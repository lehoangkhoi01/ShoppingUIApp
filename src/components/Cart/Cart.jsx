import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./style";
import CartItem from "./CartItem/CartItem";
import CartContext from "../../context/Cart/CartContext";
import { formatPriceWithSymbol } from "../../lib/utils";

const Cart = () => {
  const classes = useStyles();
  const { cartItems, emptyCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart
      <Typography>
        <Link to="/" className={classes.link}>
          Start adding some
        </Link>
      </Typography>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {formatPriceWithSymbol(totalPrice)}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={emptyCart}
          >
            Empty cart
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        totalPrice += item.price;
      });
    }
    setTotalPrice(totalPrice);
  }, [cartItems]);

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your shopping cart
      </Typography>
      {!cartItems.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
