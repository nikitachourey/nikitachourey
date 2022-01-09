import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../shopifycontext'



const Summary = () => {

    const { fetchCart,setShippingCharge,shippingPrice, getShippingModes, cart, checkout } = useContext(shopContext);
    useEffect(() => {
      getShippingModes()
  
    }, [fetchCart,getShippingModes, cart])







return(

       <div   class="container">
         <div class="row">
         <h1> Order Summary</h1>
         <span><b>Total Amount :</b>{cart.totalprice}</span>
         
         </div>
       
       
       </div>




)
}


    export default Summary;