import React, { useContext, useEffect } from 'react'
import { shopContext } from '../shopifycontext'
import './home.css';
import banner4 from '../banner7.jpg'
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const navigate = useNavigate();

    const { filteredProducts } = useContext(shopContext);
 

    const navigateToProduct = (handle) => {
        navigate(`/product/${handle} `);
    }

    //     <div>
    //     <h1>Products</h1>
    //          {products.map(product => (
    //              <div class="container">
    //             <Link to={`/product/${product.handle} `} key={product.title}>{product.title}</Link>
    //             </div>
    //             ))}
    //    </div>

    return (
               <div class="container">

          
        <div class="row" style={{fontfamily:"Times New Roman', serif", marginTop:"20px"}}>
        <h1>Search Results</h1>
        </div>
        
      <div class="row">
        {filteredProducts.map(product => (
           
            <div class="col-sm-4">
                <div class="row" style={{height:"30vh"}} onClick={()=> navigateToProduct(product.handle)}>
                    <img  style={{height:"100%", width: "100%", display:"block"}} class="cart-product-img" src={product.images[0].src} alt="image" />
                </div>

                <div class="row">
                    <span><b>{product.title} </b></span>
                    <span><b>Price :$ {product.variants[0].price}</b></span>
                </div>
            </div>))}
       </div>
       </div>
    )
    

        }

export default Search;
