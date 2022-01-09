import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './body.css'
import Button from 'react-bootstrap/button'
import { useNavigate } from 'react-router-dom';



const Registration = () => {

    const [users,setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("Hi");
        const getUser = async() =>{
            const res = await fetch('http://localhost:8080/users/');
            const data = await res.json();
            setUsers(data);

        }

        getUser();

    },[]);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  

    const addUser = async (e) => {
        e.preventDefault()
        console.log(firstname);
        console.log(lastname);
        console.log(email);
        console.log(password);
        console.log(username);
        const obj = { firstname, lastname, email, username, password };
        const res = await fetch('http://localhost:8080/users',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },  
            body: JSON.stringify(obj)
        })
        
        
        const data = await res.json(); 
        setUsers( users=>[...users,data] )
        setFirstname('');
        setLastname('');
        setEmail('');
        setUsername('');
        setPassword('');
    }


    const navigateToLogin = async ()=>{
        navigate("/Login")
       }

    return (
        <div>

        <form>
            <div className="content">
            
                <div className="container">
                <h2 style={{textAlign: 'center'} }>Register</h2>
                <br/>
                    <label><b>First Name</b></label>
                    <input type="text" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />

                    <label><b>Last Name</b></label>
                    <input type="text" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />

                    <label><b>Email</b></label>
                    <input type="text" placeholder="Enter Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />


                    <div class="col">
                    <Button style={{ height: "35px", backgroundColor: "black" }} onClick={()=> navigateToLogin(addUser)}>Submit</Button>
                    </div>
                    <br/>
                    <div class="col">
                    <Link to="/login" style={{margin:"60px"}} Button >Already a User, Login  </Link>
                    </div>
                </div>
                 </div>
        </form>
        
    </div>
    )
}


export default Registration