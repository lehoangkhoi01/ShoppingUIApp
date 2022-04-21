import React, { useState, useEffect, useContext } from "react";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BASE_URL } from "./constant";
import axios from "axios";
import CartContext from "./context/Cart/CartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [filterCategory, setFilterCategory] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { cartItems, getItem } = useContext(CartContext);

  const fetchProducts = async () => {
    await axios
      .get(BASE_URL + "/Products")
      .then((res) => {
        setProducts(res.data);
        setFilterCategory(0);
        sessionStorage.setItem("filterCategory", 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCategories = async () => {
    await axios
      .get(BASE_URL + "/Categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategoryById = async (id) => {
    if (id > 0) {
      await axios
        .get(BASE_URL + "/Categories/" + id)
        .then((res) => {
          setCategory(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCategory({});
    }
  };

  const searchProductByCategory = async (categoryId) => {
    await axios
      .get(BASE_URL + "/Products/Category/" + categoryId)
      .then((res) => {
        setProducts(res.data);
        setFilterCategory(categoryId);
        sessionStorage.setItem("filterCategory", categoryId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchProductByName = async (searchValue) => {
    if (!searchValue || searchValue === "") {
      return;
    }
    await axios
      .get(BASE_URL + "/Products/Search/" + searchValue)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const filter = sessionStorage.getItem("filterCategory");
    if (filter > 0) {
      searchProductByCategory(filter);
    } else {
      fetchProducts();
    }
    fetchCategories();
    getItem();
  }, []);

  useEffect(() => {
    let total = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        total += item.quantity;
      });
    }
    setTotalItems(total);
  }, [cartItems]);

  useEffect(() => {
    getCategoryById(filterCategory);
  }, [filterCategory]);

  return (
    <Router>
      <div className="App">
        <Navbar
          totalItems={totalItems}
          categories={categories}
          searchProductByCategory={searchProductByCategory}
          searchAll={fetchProducts}
          searchByName={searchProductByName}
        />
        <Switch>
          <Route exact path="/">
            <Products products={products} category={category} />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
