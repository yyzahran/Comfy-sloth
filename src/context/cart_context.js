import React, { useEffect, useContext, useReducer } from 'react';
import cart_reducer from '../reducers/cart_reducer';
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} from '../actions';

// If there's a cart key in local storage, then get the cart
// from there. If nothing, then cart = []
const getLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return []
    }
}

const initialState = {
    // cart: [],
    cart: getLocalStorage(),
    totalItems: 0,
    totalAmount: 0,
    shippingFee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cart_reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
    }

    const removeItem = (id) => {
        dispatch({ type: REMOVE_CART_ITEM, payload: id })
    }

    const toggleAmount = (id, value) => {
        console.log(id, value);
        dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
    }

    const clearCart = () => {
        dispatch({ type: CLEAR_CART })
    }

    useEffect(() => {
        // storing the cart contents in the localStorage
        localStorage.setItem('cart', JSON.stringify(state.cart))
        dispatch({ type: COUNT_CART_TOTALS })
    }, [state.cart])

    const valuesToShare = {
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
    }
    return (
        <CartContext.Provider value={valuesToShare}>{children}</CartContext.Provider>
    )
}
// make sure use
export const useCartContext = () => {
    return useContext(CartContext)
}
