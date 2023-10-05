import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateCmp=()=>{
    const auth= localStorage.getItem('user'); //check if signed up or not
    return auth?<Outlet />:<Navigate to="/signup" /> //if not navigate to sugh=nup when try to open any pvtcmp 
}
export default PrivateCmp