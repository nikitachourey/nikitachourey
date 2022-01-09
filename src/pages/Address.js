import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/button'
import { useNavigate } from 'react-router-dom';
import { shopContext } from '../shopifycontext'




const Address = () => {
    const navigate = useNavigate();
    const { fetchCart, cart, getShippingModes, shippingAddress, updateShippingAddress } = useContext(shopContext);


    useEffect(() => {

        fetchCart(cart.id);
    }, [fetchCart]);

    const sa = cart.shippingAddress;

    const [firstName, setFirstName] = useState(sa?.firstName);
    const [lastName, setLastName] = useState(sa?.lastName);
    const [address1, setAddress1] = useState(sa?.address1);
    const [address2, setAddress2] = useState(sa?.address2);
    const [city, setCity] = useState(sa?.city);
    const [state, setState] = useState(sa?.province);
    const [country, setCountry] = useState(sa?.country);
    const [zip, setZip] = useState(sa?.zip);
    const [phone, setPhone] = useState(sa?.phone);


    const updateShippAddress = async () => {

        const shippingAddress = {
            firstName,
            lastName,
            address1,
            address2,
            city,
            province: state,
            country,
            zip,
            phone
        };

        await updateShippingAddress(cart.id, shippingAddress);
        navigate('/shipping');
    }


    const navigateToShipping = async () => {
         const shippingAddress = {
                firstName : firstName,
                lastName : lastName,
                address1 : address1,
                address2 : address2,
                city : city,
                province: state,
                country : country,
                zip : zip,
                phone : phone
            };
        await updateShippingAddress(cart.id, shippingAddress);
        await getShippingModes();
        // //   await updateAddress (ShippingAddress, Address);
        navigate('/shipping');

    }

    return (
        <div>

            <form>

                <div class="container">

                    <h2>Shipping Address</h2>
                    <br/>
                    <div class="row">


                        <div class="row" id="First Name">
                            <label><b>First Name</b></label>
                            <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div class="row" id="Last Name">
                            <label><b>Last Name</b></label>
                            <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div class="row" id="Address1">
                            <label><b>Address1</b></label>

                            <input type="text" placeholder="Address1" onChange={e => setAddress1(e.target.value)} />
                        </div>
                        <div class="row" id="Address2">
                            <label><b>Address2</b></label>
                            <input type="text" placeholder="Address2" onChange={e => setAddress2(e.target.value)} />
                        </div>
                        <div class="row" id="City">
                            <label><b>City</b></label>
                            <input type="text" placeholder="City" onChange={e => setCity(e.target.value)} />
                        </div>
                        <div class="row" id="State">
                            <label><b>State</b></label>

                            <input type="text" placeholder="Province" onChange={e => setState(e.target.value)} />
                        </div>
                        
                        <div class="row" id="Country">
                            <label><b>Country</b></label>
                         
                            <input type="text" placeholder="Country" onChange={e => setCountry(e.target.value)} />
                           
                        </div>
                    
                        <div class="row" id="Zip">
                            <label><b>Zip Code</b></label>

                            <input type="text" placeholder="Zip" onChange={e => setZip(e.target.value)} />
                        </div>
                        <div class="row" id="Phone">
                            <label><b>Phone</b></label>

                            <input type="text" placeholder="Phone" onChange={e => setPhone(e.target.value)} />
                        </div>

                        <div class="row"></div>
                        <div class="col">
                            <Button style={{ height: "35px", backgroundColor: "black" }} onClick={() => navigateToShipping()} > Procced </Button>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    )
}


export default Address;
