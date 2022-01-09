import './header.css';
import  { shopContext } from '../shopifycontext';
import React, { useContext, useEffect,  useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState("");
  const handleSearchStringChange = (e) => setSearchString(e.target.value);

  const { fetchCollections, searchProducts, collections  } = useContext(shopContext);
  useEffect(() => {
    fetchCollections()

  }, [fetchCollections])


  const navigateToCatalog = (handle) => {
    navigate(`/catalog/${handle}`);
  }

  const searchProductWithSearchString = ()=>{
    searchProducts(searchString);
   setSearchString("");
    navigate('/search')
  }


  return (
    <div className="header">


      <div class="container" style={{ margin: "0px", padding: "0px", maxWidth: "100%" }}>
        <div className='row'>
          
        </div>
        <div class="row" style={{ margin: "0px", width: "100%" }}>

          <div class="col-sm-1">
            <Link  style={{Bold:"10px", fontSize:"40px"}}  to="/home">Gmart</Link>
          </div>

          

          <div class="col-sm-2">
            <ul>
              <li style={{ float: "left",margin:"10px",marginLeft:"25px" }} >
                <a className="dropdown-link" href="#">Catalog</a>
                <ul>
                  {collections.map(collection =>
                    (<li onClick={() => navigateToCatalog(collection.handle)} key={collection.title}>{collection.title}</li>))}
                </ul>
              </li>
            </ul>
          </div>


          <div class="col-sm-7">
            <div className='searchbar' style={{ marginLeft: "0px",margin:"17px" }}>
              <input type="text" placeholder="Search Products" value={searchString} onChange={handleSearchStringChange}></input>
              <button  type="submit" onClick={searchProductWithSearchString}>Search</button>
            </div>
          </div>
          

          <div class="col-sm-1">
          <Link to="/registration" style={{ float: "right",margin:"10px" }}>Register</Link>

        </div>

          <div class="col-sm-1">
            <Link to="/cart" style={{ float: "right",margin:"10px" }}>Cart</Link>

          </div>
        </div>
      </div>
    </div>





  )
}

export default Header;

