import React, { useContext } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import useStyles from "./style";
import { formatPriceWithSymbol } from "../../../lib/utils";
import CartContext from "../../../context/Cart/CartContext";

const CartItem = ({ item }) => {
  const classes = useStyles();
  const { removeItem, updateCartQty } = useContext(CartContext);

  return (
    <Card>
      <CardMedia image={item.imageUrl} className={classes.media} />
      <CardContent>
        <Typography variant="h5">{item.productName}</Typography>
        <Typography variant="h6">
          {formatPriceWithSymbol(item.price)}
        </Typography>
      </CardContent>
      <CardActions className={classes.CardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={
              item.quantity === 1
                ? () => removeItem(item.id)
                : () => updateCartQty(item.id, item.quantity - 1)
            }
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => updateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => removeItem(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
