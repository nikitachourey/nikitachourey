import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './body.css'
import Home from './Home'
import Cart from './Cart'
import ProductDetail from './ProductDetail'
import Catalog from './Catalog'
import Address from './Address'
import Registration from './Registration'
import Login from './Login'
import Payment from './Payment'
import Shipping from './Shipping'
import Search from './Search'
import Summary from './Summary'

class Body extends React.Component {
    render() {
        return (
            <div   className='content'>
            
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/home' exact element={<Home/>}></Route>
                    <Route path='/cart' exact element={<Cart/>}></Route>
                    <Route path='/product/:handle' exact element={<ProductDetail />}></Route>
                    <Route path='/catalog/:handle' exact element={<Catalog />}></Route>
                    <Route path='/address' exact element={<Address/>}></Route>
                    <Route path='/registration' exact element={<Registration/>}></Route>
                    <Route path='/login' exact element={<Login/>}></Route>
                    <Route path='/payment' exact element={<Payment/>}></Route>
                    <Route path='/shipping' exact element={<Shipping/>}></Route>
                    <Route path='/search' exact element={<Search/>}></Route>
                    <Route path='/summary' exact element={<Summary/>}></Route>
                </Routes>
            </div>
        )
    };
}

export default Body;
