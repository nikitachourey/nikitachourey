import { useParams } from 'react-router-dom';
import { shopContext } from '../shopifycontext';
import React, { useContext, useEffect, useState } from 'react'
import './ProductDetail.css'
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import { Button } from 'react-bootstrap';

const ProductDetail = () => {
    const [quantity, setValue] = useState(0);
    const handleChange = (e) => setValue(e.target.value);

    const navigate = useNavigate();
    let { handle } = useParams();
    const { fetchProductByHandle, addItemsToCart, product, images ,  } = useContext(shopContext)


    useEffect(() => {
        fetchProductByHandle(handle)

        return () => {

        }
    }, [fetchProductByHandle, handle]);


    const addProductToCart = async () => {
        await addItemsToCart(product.variants[0], quantity);
        navigate("/cart");
    }

    const decreaseValue = () => {
        let value = quantity - 1;
        setValue(value);
    }


    const increaseValue = () => {
        let value = quantity + 1;
        setValue(value);
    }

    return (
        <div class="container">
            <div class="row">
                <h2>{product.title}</h2>
            </div>
            <div class="row">
                <h5>{product.description}</h5>
               
            </div>
            <div class="row" style={{ height: "40vh" }}>
                <div class="col-sm-4">
               
                </div>
                <div class="col-sm-4">
                    <div>

                        <Carousel variant="dark" style={{ height: "40vh" }}>
                            {images.map(image => (
                                <Carousel.Item>
                                    <img style={{ display: "block !important", height: "40vh !important" }}
                                        className="d-block w-100"
                                        src={image.src}
                                        alt="First slide"
                                    />
                                </Carousel.Item>))}

                        </Carousel>

                    </div>

                </div>
                <div class="col-sm-4">
               
                </div>
            </div>


            <div className='row' style={{ marginTop: "60px" }}>
                <div class="col-sm-2">

                    <Button style={{ backgroundColor: "black" }} onClick={decreaseValue} value="Decrease Value">-</Button>
                    <input type="number" id="number" value={quantity} onChange={handleChange} />
                    <Button style={{ backgroundColor: "black" }} onClick={increaseValue} value="Increase Value">+</Button>

                </div>
                <div class="col-sm-2"><Button style={{ backgroundColor: "black" }} onClick={addProductToCart}>Add to Cart</Button>
                    
                </div>


            </div>
        </div>
    )
}

export default ProductDetail;
