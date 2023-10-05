import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user'); //to check localstorage for user info
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear()//ckear user data from localstorage
        navigate('/signup');
    }
    return (//if auth ture(localsorage have data) then upper conditon 
        <div>
            <img 
            alt="logo"
            className='logo'
            src='https://www.360webdesigns.com/wp-content/uploads/2016/07/Services_ECommerce_v2-01.png'/>
            {auth ? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update/:id">Update Products</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>  
            </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">SignUP</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}
export default Nav;