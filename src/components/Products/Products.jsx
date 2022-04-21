import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./style";

const Products = ({ products, category }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {category.categoryName ? (
        <Typography variant="h6" gutterBottom>
          You search for {category.categoryName}
        </Typography>
      ) : null}
      <Grid container justifyContent="center" spacing={4}>
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product}></Product>
              </Grid>
            ))}
          </>
        ) : (
          <div>No products found.</div>
        )}
      </Grid>
    </main>
  );
};

export default Products;
