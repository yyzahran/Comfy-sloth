import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
    const { gridView, filteredProducts } = useFilterContext()
    if (filteredProducts.length < 1) {
        return <h5 style={{ textTransform: 'none' }}>
            Sorry, no products match your search...
        </h5>
    }

    if (gridView === false) {
        return <ListView products={filteredProducts} />
    } else {
        return <GridView products={filteredProducts}>
        </GridView>
    }
}

export default ProductList;
