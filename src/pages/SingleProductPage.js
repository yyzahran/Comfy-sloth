import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
    Loading,
    Error,
    ProductImages,
    AddToCart,
    Stars,
    PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
    // useParams gets the query parameters of the url
    // console.log(useParams()); // {id: 'recNZ0koOqEmilmoz'}
    const { id } = useParams();
    const history = useHistory()
    const { getSingleProduct, singleProductLoading, singleProductError, singleProduct } = useProductsContext()
    useEffect(() => {
        getSingleProduct(`${single_product_url}${id}`)
        // eslint-disable-next-line
    }, [id])

    // Navigate back to the home page programmatically using react-router-dom if there was an error
    useEffect(() => {
        if (singleProductError) {
            setTimeout(() => {
                history.push('/')
            }, 3000)
        }
        // eslint-disable-next-line
    }, [singleProductError])

    if (singleProductLoading) {
        return <Loading />
    }
    if (singleProductError) {
        return <Error />
    }
    // console.log(singleProduct);
    const { name, price, stock, description, stars,
        images, id: sku, company, reviews } = singleProduct;

    return <Wrapper>
        <PageHero title={name} isProduct={true} />
        <div className="section section-center page">
            <Link className='btn' to='/products'>back to products</Link>
            <div className="product-center">
                <ProductImages images={images} />
                <section className="content">
                    <h2>{name}</h2>
                    <Stars stars={stars} reviews={reviews} />
                    <h5 className='price'>{formatPrice(price)}</h5>
                    <p className="description">{description}</p>
                    {/* stock */}
                    <p className="info">
                        <span>Available: </span>
                        {stock ? "In stock" : "Out of stock"}
                    </p>
                    {/* sku */}
                    <p className="info">
                        <span>SKU: </span>
                        {sku}
                    </p>
                    {/* brand */}
                    <p className="info">
                        <span>Brand: </span>
                        {company}
                    </p>
                    <hr />
                    {stock && <AddToCart product={singleProduct} />}
                </section>
            </div>
        </div>
    </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
