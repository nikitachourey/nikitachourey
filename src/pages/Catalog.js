import  { shopContext } from '../shopifycontext';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';




const Catalog = () => {
  const navigate = useNavigate();

  const { handle } = useParams();

  const { fetchCollectionByHandle,  selectedProducts } = useContext(shopContext);
  useEffect(() => {
    fetchCollectionByHandle(handle)
  },

   [fetchCollectionByHandle, handle])
 


  const navigateToProduct =(handle)=>{
    navigate(`/product/${handle} `);
 }


  return (
    <div class="container" style={{marginTop:"20px"}}>
      <div class="row">
        {selectedProducts.map(product => (
           
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


export default Catalog;
