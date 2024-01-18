import React, { useEffect, useContext, useReducer } from 'react'
import filter_reducer from '../reducers/filter_reducer'
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
    filteredProducts: [],
    allProducts: [],
    gridView: true,
    sort: 'price-lowest',
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        minPrice: 0,
        maxPrice: 0,
        price: 0,
        shipping: false,
    }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filter_reducer, initialState);

    // Getting the products from another context
    const { products } = useProductsContext();
    // console.log(products);
    // Whenever the product array changes, we reload
    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products })
    }, [products])

    /** Sorting products */
    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS })
        dispatch({ type: SORT_PRODUCTS })
    }, [products, state.sort, state.filters])

    const setGridView = () => {
        dispatch({ type: SET_GRIDVIEW })
    }

    const setListView = () => {
        dispatch({ type: SET_LISTVIEW })
    }

    const updateSort = (event) => {
        const { value } = event.target
        dispatch({ type: UPDATE_SORT, payload: value })
    }

    const updateFilters = (event) => {
        let { name, value } = event.target;
        // handling case of clicking on a category button
        if (name === 'category') {
            // textContent === value, but for buttons
            value = event.target.textContent
        }
        // handling case of color
        if (name === 'color') {
            value = event.target.dataset.color // gets the attribute 'data-color'
        }
        // changing the price from string to number
        if (name === 'price') {
            value = Number(value)
        }
        // handling case of shipping checkbox (boolean)
        if (name === 'shipping') {
            value = event.target.checked
        }
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
    }

    const valuesToShare = {
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
    }
    return (
        <FilterContext.Provider value={valuesToShare}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}
