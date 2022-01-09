  import React from 'react'
  import { useContext, useEffect } from "react";
  import gql from 'graphql-tag';
  import { shopContext } from '../shopifycontext'
  import Button from 'react-bootstrap/button'
  import { useNavigate } from 'react-router-dom';
 

 const Payment = () => {
  const navigate = useNavigate();
  const { fetchCart,setShippingCharge, shippingPrice, getShippingModes, cart, checkout } = useContext(shopContext);
  useEffect(() => {
    getShippingModes()

  }, [fetchCart,getShippingModes, shippingPrice,cart])

  // const { getApolloQueryResponse, res } = useContext(ShopifyContext);

  // const checkoutQuery = gql`
  //     {
  //         node(id: ${localStorage.cart_id}) {
  //             Checkout {
  //                 totalTax
  //                 taxesIncluded
  //                 taxExempt
  //                 subtotalPrice
  //                 totalPrice
  //                 email
  //                 createdAt
  //                 requiresShipping
  //             }
  //         }
  //     }
  // `;

  // useEffect(() => {

  //     getApolloQueryResponse(checkoutQuery);

  // }, [ getApolloQueryResponse, checkoutQuery ]);

  // console.log(res);


  const navigateToSummary = () => {
    // await updateAddress (ShippingAddress, Address);
    navigate('/summary');
 }
    
 

    

    return (

         <div class="container"> 
        
         <div class="row"> 
                     <h2>Payment</h2>

                    </div>
                     
                    <div  style={{margin:"20px"}}  class="row">
                    <div class="a">
                    <h4>Price Details</h4>
                 
                    <h6> <span > Cart Total :  ${cart.subtotalPrice}</span></h6>
                    <h6> <span>Shipping Price :  ${cart.shippingLine.price}</span></h6>
                    <h6> <span><b>Total Amount :</b> ${cart.totalPrice}</span></h6>
                   
                    </div>
                    </div>

                       
                        
                         <div style={{margin:"20px"}} class='row'>
                         <div class="a">
                             <h4>Payment Option </h4>
                            
                       <input type="radio" style={{float: "left"}} value="Credit Card" name="payment"  /><h6>Credit card</h6>
                     
                    
                       <input type="text" placeholder="Enter card number" ></input>
                       <input type="text" placeholder="Enter Name on card" ></input>

                       <input type="text" placeholder=" (MM/YY)" ></input>

                       <input type="text" placeholder="Enter Security code" ></input>
                      
                       <br/>
               
                      
                           </div>
                           </div>



                       <div class="row"> 
                     <div  style={{margin:"10px"}}class="row">
                     <div class="a">
                     
                         <div class="row"> 
                         <h4 >Billing Address</h4>
                        <span> <h7> Address:  {cart.shippingAddress.address1},{cart.shippingAddress.address2},{cart.shippingAddress.city},{cart.shippingAddress.province}
                        ,{cart.shippingAddress.country},{cart.shippingAddress.zip} </h7></span>
                   </div>
              </div>
              </div>
                     </div>


                       <div class="row"></div>
                <div class="col">
                <Button style={{  margin:"40px", height: "35px", backgroundColor: "black" }} onClick={navigateToSummary} >Confirm order</Button>
                </div>
          </div>


          
        
    )


     }

 export default Payment ;