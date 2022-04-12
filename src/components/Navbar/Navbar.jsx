import React, { useState } from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Drawer,
  List,
  ListItem, 
  ListItemText,
  Divider,
  Button,
  InputBase
} from "@material-ui/core";

import { ShoppingCart, Search } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./style";
import logo from "../../assets/commerce.png";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(false);
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Commerce.js
          </Typography>
          
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button className={classes.navbarText}>About</Button>
          <Button className={classes.navbarText}>Contact</Button>
          {location.pathname === "/" ? (
            <div className={classes.cartButton}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={(e) => handleDrawerClose(e)}>
        <div className={classes.list}>
          <List>
            <Typography variant="h5" align="center" className={classes.menuTitle}>
              Category
            </Typography>
            <Divider />
            <ListItem button key={1}>
              <ListItemText primary="Jeans" />
            </ListItem>
            <ListItem button key={2}>
              <ListItemText primary="Jackets" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
