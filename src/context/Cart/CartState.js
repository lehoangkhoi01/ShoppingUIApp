import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { ADD_TO_CART, REMOVE_ITEM, GET_ITEM, UPDATE_CART, EMPTY_CART } from './Types'

const CartState = ({ children }) => {
    const initialState = {
        cartItems: []
    };
    const [state, dispatch] = useReducer(CartReducer, initialState);

    const addToCart = (item, quantity, cartItems) => {
        dispatch({ type: ADD_TO_CART, payload: item, quantity: quantity, cart: cartItems });
    }

    const removeItem = (itemId) => {
        dispatch({ type: REMOVE_ITEM, payload: itemId});
    }

    const emptyCart = () => {
        dispatch({ type: EMPTY_CART });
    }

    const getItem = () => {
        dispatch({ type: GET_ITEM})
    }

    const updateCartQty = (itemId, quantity) => {
        dispatch({ type: UPDATE_CART, payload: itemId, quantity: quantity})
    }

    return (
        <CartContext.Provider value={{
            cartItems: state.cartItems,
            addToCart,
            removeItem,
            getItem,
            updateCartQty,
            emptyCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartState