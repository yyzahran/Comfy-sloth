import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
    if (action.type === LOAD_PRODUCTS) {
        /** we're spreading the payload to copy the values each time we refresh the page or apply a filter
        to not reference the same place in memory*/
        // Update filters upon initial loading
        let maxPrice = Math.max(...action.payload.map((product) => {
            return product.price
        }))
        // console.log(maxPrice);
        return {
            ...state, allProducts: [...action.payload],
            filteredProducts: [...action.payload],
            filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice }
        }
    }
    /** Set view */
    if (action.type === SET_GRIDVIEW) {
        return { ...state, gridView: true }
    }
    if (action.type === SET_LISTVIEW) {
        return { ...state, gridView: false }
    }
    if (action.type === UPDATE_SORT) {
        return { ...state, sort: action.payload }
    }
    /** Sorting products */
    if (action.type === SORT_PRODUCTS) {
        const { sort, filteredProducts } = state;
        let tempProducts = [...filteredProducts]
        switch (sort) {
            case 'price-lowest':
                tempProducts = tempProducts.sort((a, b) => {
                    return a.price - b.price
                })
                break
            case 'price-highest':
                tempProducts = tempProducts.sort((a, b) => {
                    return b.price - a.price
                })
                break
            case 'name-a':
                tempProducts = tempProducts.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
                break
            case 'name-z':
                tempProducts = tempProducts.sort((a, b) => {
                    return b.name.localeCompare(a.name)
                })
                break
            default:
                return tempProducts
        }
        return { ...state, filteredProducts: tempProducts }
    }
    /** Filtering products */
    if (action.type === UPDATE_FILTERS) {
        const { name, value } = action.payload;
        return { ...state, filters: { ...state.filters, [name]: value } }
    }
    if (action.type === FILTER_PRODUCTS) {
        // every time you filter, you wanna get access to a copy of the fresh data
        const { allProducts } = state;
        const { text, company, category, color, price, shipping } = state.filters;
        // making a fresh copy of all the products
        let tempProducts = [...allProducts]
        /** filtering by text */
        if (text) {
            tempProducts = tempProducts.filter((product) => {
                return product.name.toLowerCase().startsWith(text)
            })
        }
        /** filtering on company */
        if (company !== 'all') {
            tempProducts = tempProducts.filter((product) => {
                return product.company === company
            })
        }
        /** filtering on category */
        if (category !== 'all') {
            tempProducts = tempProducts.filter((product) => {
                return product.category === category
            })
        }
        /** filtering on color */
        if (color !== 'all') {
            tempProducts = tempProducts.filter((product) => {
                return product.colors.find((c) => c === color)
            })
        }
        /** filtering on price */
        tempProducts = tempProducts.filter((product) => {
            return product.price <= price
        })
        /** filtering on shipping */
        if (shipping === true) {
            tempProducts = tempProducts.filter((product) => {
                return product.shipping === shipping
            })
        }

        return { ...state, filteredProducts: tempProducts }
    }
    if (action.type === CLEAR_FILTERS) {
        // without the min/max price
        return {
            ...state, filters: {
                ...state.filters,
                text: '',
                company: 'all',
                category: 'all',
                color: 'all',
                price: state.filters.maxPrice,
                shipping: false,
            }
        }
    }
    throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
