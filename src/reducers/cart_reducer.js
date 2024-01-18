import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { id, color, amount, product } = action.payload;
            /** In cart, we'll set the id of each item as the id+color
             * because we can have the same item added to the cart BUT
             * with a different color, so they should be added as separate items
             */
            const tempItem = state.cart.find((item) => item.id === id + color)
            // if item already in cart
            if (tempItem) {
                const tempCart = state.cart.map((cartItem) => {
                    // if item with same color is already in cart
                    if (cartItem.id === id + color) {
                        let newAmount = cartItem.amount + amount;
                        // make sure we're not adding more than the stock item
                        /** for example if we have an item of stock 6, we add 4 in cart,
                         * then we go ahead to product page and add another 4
                         * Only 6 will end up being added
                         */
                        if (newAmount > cartItem.max) {
                            newAmount = cartItem.max
                        }
                        return { ...cartItem, amount: newAmount }
                    } else {
                        // if item doesn't match the item we're trying to add,
                        // simply return as is
                        return cartItem
                    }
                })

                return { ...state, cart: tempCart }
            } else {
                // if item is not in cart
                const newItem = {
                    id: id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.images[0].url,
                    price: product.price,
                    max: product.stock,
                }
                return { ...state, cart: [...state.cart, newItem] }
            }
        case REMOVE_CART_ITEM:
            const tempCart = state.cart.filter((item) => {
                return item.id !== action.payload
            })
            return { ...state, cart: tempCart }
        case CLEAR_CART:
            return { ...state, cart: [] }
        case TOGGLE_CART_ITEM_AMOUNT:
            const { id: cartItemId, value } = action.payload;
            const toggledCart = state.cart.map((item) => {
                if (item.id === cartItemId) {
                    if (value === 'inc') {
                        let newAmount = item.amount + 1;
                        if (newAmount > item.max) {
                            newAmount = item.max
                        }
                        return { ...item, amount: newAmount }
                    } else if (value === 'dec') {
                        let newAmount = item.amount - 1;
                        if (newAmount < 1) {
                            newAmount = 1
                        }
                        return { ...item, amount: newAmount }
                    } else if (value === 'dec') {
                    }
                }
                return item
            })
            return { ...state, cart: toggledCart }
        case COUNT_CART_TOTALS:
            const { totalItems, totalAmount } = state.cart.reduce((total, cartItem) => {
                const { amount, price } = cartItem;
                total.totalItems += amount;
                total.totalAmount += amount * price;
                return total
            }, { totalItems: 0, totalAmount: 0 })
            return { ...state, totalItems, totalAmount }

        default:
            break;
    }
    throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
