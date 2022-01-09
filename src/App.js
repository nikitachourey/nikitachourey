import logo from './logo.svg';
import './App.css';
import React from 'react'
import ShopifyProvider from './shopifycontext';
import Home from './pages/Home';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Body from './pages/body';
// import ProductDetail from './pages/ProductDetail';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
   </div>
  );
}

export default App;
