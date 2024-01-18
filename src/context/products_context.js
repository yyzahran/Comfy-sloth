import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import products_reducer from '../reducers/products_reducer'
import { products_url } from '../utils/constants'
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
    isSidebarOpen: false,
    productsLoading: false,
    productsError: false,
    products: [],
    featuredProducts: [],
    singleProductLoading: false,
    singleProductError: false,
    singleProduct: {}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(products_reducer, initialState)

    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN })
    }
    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE })
    }

    const getProducts = async (url) => {
        dispatch({ type: GET_PRODUCTS_BEGIN })
        try {
            const resp = await axios.get(url)
            const products = resp.data
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
        } catch (error) {
            dispatch({ type: GET_PRODUCTS_ERROR })
        }
    }

    const getSingleProduct = async (url) => {
        dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
        try {
            const resp = await axios.get(url)
            const product = resp.data
            dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product })
        } catch (error) {
            dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
        }
    }

    useEffect(() => {
        getProducts(products_url)
    }, [])

    const valuesToShare = {
        ...state,
        openSidebar,
        closeSidebar,
        getSingleProduct
    }

    return (
        <ProductsContext.Provider value={valuesToShare}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    return useContext(ProductsContext)
}
