import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
    AboutPage, AuthWrapper, CartPage, ErrorPage,
    HomePage, CheckoutPage, PrivateRoute, ProductsPage, SingleProductPage
} from './pages'

function App() {
    return (
        <AuthWrapper>
            <BrowserRouter>
                <Navbar />
                <Sidebar />
                <Switch>
                    <Route exact path='/'>
                        <HomePage />
                    </Route>
                    <Route exact path='/about'>
                        <AboutPage />
                    </Route>
                    <Route exact path='/cart'>
                        <CartPage />
                    </Route>
                    <Route exact path='/products'>
                        <ProductsPage />
                    </Route>
                    <Route exact path='/products/:id' children={<SingleProductPage />} />
                    <PrivateRoute exact path='/checkout'>
                        <CheckoutPage />
                    </PrivateRoute>
                    <Route exact path='*'>
                        <ErrorPage />
                    </Route>
                </Switch>
                <Footer />
            </BrowserRouter>
        </AuthWrapper>)
}

export default App;
