import React from 'react';  
import './footer.css';

class Footer extends React.Component {
    render() {
        return (
        <div className="footer"> 
        <div class="row">
        <div class="col-sm-6">
        <a href="#">About us</a>
        </div>
        <div class="col-sm-4">
        <a  href="#" >Contact</a>
        </div>
        </div>
        </div>
       );
    }
}

export default Footer;