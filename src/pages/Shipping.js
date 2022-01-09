import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/button'
import { shopContext } from '../shopifycontext'
import './Shippping.css'


const Shipping = () => {
   const navigate = useNavigate();
   // const{shippingAddress,updateShippingAddress}= useState("");

   const { getShippingModes,updateShippingLine, cart, checkout } = useContext(shopContext);

   useEffect(() => {
      getShippingModes()
   }, [getShippingModes])

   // updateShippingMethod(localStorage.cart.id);
   // navigate('/payment');

   const navigateToPayment = async () => {
      // await updateAddress (ShippingAddress, Address);
      navigate('/payment');
   }
   return (

      <div class="container">

         <div>
            <h3 style={{ margin: "20px" }}>  Shipping </h3>
            <div class="a">
               <h5>Ship To:</h5>
               <p>Contact: {cart.shippingAddress.firstName}{cart.shippingAddress.lastName} , Phone No:{cart.shippingAddress.phone}</p>
               <p> Address: {cart.shippingAddress.address1},{cart.shippingAddress.city} ,{cart.shippingAddress.province}, {cart.shippingAddress.zip}</p>
               <p> Country:{cart.shippingAddress.country} </p>
            </div>

         </div>

         <div class='row'>
            <h1></h1>
         </div>


         <div class='row'>
            <h1></h1>
         </div>
        
         
         <div class='row'>
         <div class="a">
            <h5> Shipping Method </h5>
            {checkout.availableShippingRates?.shippingRates?.map(x => (
               <div>
                  <input type="radio" value="DHL Express Worldwide" onClick={()=> updateShippingLine(x.handle)} name="shippment" radioGroup='shippment'/><h6>{x.title} </h6><p>${x.priceV2.amount}</p>
               </div>
            ))}
         </div>
         </div>
         <div class="row"></div>

         <div class="row"></div>
         <div class="col">
            <Button style={{ height: "35px", backgroundColor: "black" }} onClick={navigateToPayment}> Procced </Button>
         </div>




      </div>
   )

}

export default Shipping;




 // <div class='row'>
         //    <h5> Shipping Method </h5>
         //    {checkout.availableShippingRates.shippingRates.map(x => (
         //       <div>
         //          <input type="radio" value="DHL Express Worldwide" radioGroup='shippment'/><h6>{x.title}</h6><p>{x.priceV2.amount}</p>
         //       </div>
         //    ))}
         // </div>