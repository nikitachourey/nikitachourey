import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../shopifycontext'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
   const [quantity, setValue] = useState(0);
   const handleChange = (e) => setValue(e.target.value);


   const [coupon, setCoupon] = useState("");
   const handleCouponChange = (e) => setCoupon(e.target.value);


   const navigate = useNavigate();

   // const { ShippingAddress, Address, updateShippingAddress, updateAddress } = useContext(shopContext)


   const { fetchCart, cart, removeProduct, updateQuantity, addDiscountCoupon, removeDiscountCoupon } = useContext(shopContext);
   useEffect(() => {
      fetchCart((localStorage.cart_id))

   }, [fetchCart, cart])


   //    const decreaseValue = () => {
   //       let value = quantity - 1;
   //       setValue(value);
   //   }


   //   const increaseValue = () => {
   //       let value = quantity + 1;
   //       setValue(value);
   //   


   const removeProductFromCart = async (cartId, lineItems) => {
      await removeProduct(cartId, lineItems);
   }


   const addDiscountCo = async () => {
      await addDiscountCoupon(cart.id, coupon);

   }


   const removeDiscountCo = async () => {
      await removeDiscountCoupon(cart.id, coupon);

   }


   const increaseValue = async (lineItemId) => {
      let lineItem = cart.lineItems.filter(x => x.id === lineItemId)[0];
      await updateQuantity(cart.id, lineItem.id, lineItem.quantity + 1)
   }




   const decreaseValue = async (lineItemId) => {
      let lineItem = cart.lineItems.filter(x => x.id === lineItemId)[0];
      if (lineItem.quantity && lineItem.quantity > 0) {
         await updateQuantity(cart.id, lineItem.id, lineItem.quantity - 1)

      }



   }



   //   AddDiscountToCart= async(checkoutId, discountCode) =>{
   //    const cart= await client.checkout.addDiscount(checkoutId, discountCode)
   //    this.setstate({cart: cart});
   //   }

   const naviagtetoAddress = async () => {
      // await updateAddress (ShippingAddress, Address);
      navigate('/address');


   }



   return (

      <div class="flex">

         <div class="container" style={{ margin: "10px" }}>
            <h1>Cart items</h1>
            {cart.lineItems.map(item =>
            (
               <div className="row" style={{ height: "15%", marginTop: "15px" }}>
                  <div className="col-sm-3" style={{ height: "15%" }}>
                     <img class="cart-product-img" src={item.variant.image.src} alt="image" />
                  </div>
                  <div className="col-sm-3" style={{ height: "15%" }}>
                     <span ><b>{item.title}</b></span>
                     <br></br>
                     <span ><b>${item.variant.price}</b></span>
                  </div>

                  <div className="col-sm-3" style={{ height: "15%" }}>

                     <div style={{ paddingBottom: "10px", margin: "-2px", height: "5px" }}>
                        <Button onClick={() => decreaseValue(item.id)} style={{ height: "35px", backgroundColor: "black" }} value="Decrease Value">-</Button>
                        <input type="number" id="number" value={item.quantity} onChange={handleChange} />
                        <Button onClick={() => increaseValue(item.id)} style={{ height: "35px", backgroundColor: "black" }} value="Increase Value">+</Button>
                     </div>
                  </div>

                  <div className="col-sm-2" style={{ height: "15%" }}>
                     <span key={item.title}><b>  Price: ${(item.variant.price * item.quantity).toFixed(2)}</b></span>
                  </div>


                  <div className="col-sm-1">
                     <Button style={{ height: "35px", backgroundColor: "black" }} onClick={() => removeProductFromCart(cart.id, [item.id])}>Remove</Button>
                  </div>
               </div>))}

            
       </div>
        
         
         <div class="row">

         {cart.discountApplications.map(coupon => (
            <div class="col-sm-4" >
               <div class="container">
                  <div class="row">
                     <b>{coupon.code},{coupon.value.percentage}%OFF  <Button style={{  margin:"10px", height: "30px", backgroundColor: "black" }} onClick={removeDiscountCo}>X</Button></b>
                  </div>
                  <div class="row">
                     
                  </div>
               </div>


            </div>))}

         <div class="col-sm-4">
            <input type="text" value={coupon} onChange={handleCouponChange}></input>
         </div>
         <div class="col-sm-4">
            <Button style={{width:"200px", height: "35px", backgroundColor: "black"  }} onClick={() => addDiscountCo()} >Add Coupon</Button>
         </div>

       

      </div>
   

      <div class="container" style={{ marginTop: "20px" }}>
      <div class="row">
         <span ><b> Sub Total : ${cart.subtotalPrice}</b></span>

      </div>
   </div>


      
         
         <div class="col"><Button style={{   margin:"10px", height: "35px", backgroundColor: "black" }} onClick={naviagtetoAddress}>Checkout</Button>
         </div>

         <div  class="row" >
         </div>
      
        
   

      </div>


   )

}


export default Cart;
