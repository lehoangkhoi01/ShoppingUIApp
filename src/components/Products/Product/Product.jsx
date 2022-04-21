import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";

import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./style";
import { formatPriceWithSymbol } from "../../../lib/utils";
import CartContext from "../../../context/Cart/CartContext";

function Product({ product }) {
  const classes = useStyles();
  const { addToCart, cartItems } = useContext(CartContext);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.imageUrl}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6" gutterBottom>
            {product.productName}
          </Typography>
          <Typography variant="h6">
            {formatPriceWithSymbol(product.price)}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.productDescription }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to cart"
          onClick={() => addToCart(product, 1, cartItems)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product;
