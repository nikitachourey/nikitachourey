import React, {useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/button'


const Login = () => {
    

    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const navigateTOCart = async ()=>{
    //    const res = await fetch('http://localhost:8080/users/');
    //    const users = await res.json();
    //    const user = users.filter(xyz => xyz.username==username);
    //    if(user[0]!==undefined){
          navigate("/cart")
       }
    

    return (
        <form>
        <div className="container">
        <h2 style={{textAlign: 'center'} }>Login</h2>
        <br/>
            <label><b>User Name</b></label>
            <input type="text" placeholder=" Ener User Name" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label><b>Password</b></label>
            <input type="text" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <br/>


            <div  class =" col">
            
            <Button  style={{ height: "35px", backgroundColor: "black", margin:"30px"}}  onClick={navigateTOCart}>Login</Button>
            
            </div>
            
        </div>
        </form>
    )
}

export default Login
