import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    let existingCartItem = cartItems.find(
        cartItem => cartItem.id === productToAdd.id
    )

    //If found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 } :
                cartItem
        )
    }

    //return new array with new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    let existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    // check if quantity is equal to 1, if it is remove item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }


    //return back cartitems with matching cart item with reduced quantit
    return cartItems.map((cartItem) => (
        cartItem.id === cartItemToRemove.id ?
            { ...cartItem, quantity: cartItemToRemove.quantity - 1 }
            : cartItem
    ))
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cartCount: 0,
    clearItemFromCart: () => { },
    cartTotal: 0,
})

const CartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case (CART_ACTION_TYPES.SET_CART_ITEMS):
            return {
                ...state,
                ...payload
            }
        case (CART_ACTION_TYPES.SET_IS_CART_OPEN):
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error('Unhandled type ${type} in CartReducer');
    }
}

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartProvider = ({ children }) => {

    const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(CartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        //Generate new cart count
        const newCartCount = newCartItems.reduce((accumulator, cartItem) =>
            accumulator + cartItem.quantity
            , 0);

        //Generate new cart total
        const newTotal = newCartItems.reduce((accumulator, cartItem) =>
            accumulator + cartItem.quantity * cartItem.price
            , 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newTotal
            })
        )
    }

    const addItemToCart = (productToAdd) => {
        const newCartItem = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItem)
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItem = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItem)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItem = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItem)
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        )
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal
    }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}