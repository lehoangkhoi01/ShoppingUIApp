import { ADD_TO_CART, GET_ITEM, REMOVE_ITEM, UPDATE_CART, EMPTY_CART } from "./Types";

const CartReducer = (state, action) => {
    switch(action.type) {
        case ADD_TO_CART: {
            let newCartItems;
            if(action.cart.find(i => i.id === action.payload.id)) {
                newCartItems = [...state.cartItems];
                newCartItems.find(i => i.id === action.payload.id).quantity += action.quantity;
            } else {
                action.payload.quantity = action.quantity;
                newCartItems = [...state.cartItems, action.payload];                 
            }  
            localStorage.setItem("cart", JSON.stringify(newCartItems)); 
            return {
                ...state,
                cartItems: [...newCartItems]
            }
        }
        case REMOVE_ITEM: {
            const newCartItems = state.cartItems.filter((item) => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            return {
                ...state,
                cartItems: [...newCartItems]
            }
        }
        case EMPTY_CART: {
            localStorage.removeItem("cart");
            return {
                ...state,
                cartItems: []
            }
        }
        case GET_ITEM: {
            let items = [];
            if(localStorage.getItem("cart")) {
                items = JSON.parse(localStorage.getItem("cart"));
            } 
            return {
                ...state,
                cartItems: [...items]
            }
        }   
        case UPDATE_CART: {
            const newCartItems = [...state.cartItems];
            newCartItems.find(i => i.id === action.payload).quantity = action.quantity;
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            return {
                ...state,
                cartItems: [...newCartItems]
            }
        }
        default: 
            return state
    }
}

export default CartReducer