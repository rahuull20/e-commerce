import React, { useEffect } from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom'//to get id from url

const UpdateProduct = () => {
    //collect data when button is clicked
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const params= useParams();
    const navigate= useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[])//empty array to run one time only

    const getProductDetails= async()=>{
        console.warn(params);
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`//to send token in headers, bearer to verify token 
            }
        });
        result= await result.json();
        //to prefilled boxes with db data
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        console.warn(name,price,category,company);
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-type':"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result= await result.json();
        if(result){
            alert("Data Updated")
            console.warn(result);
            navigate('/');

        }


    }



    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input className='inputbox' type='text' placeholder='Enter Name'
                value={name} onChange={(e) => { setName(e.target.value) }} />
            
            {/* if error true(when space is blank and click on submit) show message */}

            <input className='inputbox' type='text' placeholder='Enter Product Price'
                value={price} onChange={(e) => { setPrice(e.target.value) }} />
               

            <input className='inputbox' type='text' placeholder='Enter Category'
                value={category} onChange={(e) => { setCategory(e.target.value) }} />
               

            <input className='inputbox' type='text' placeholder='Enter Company'
                value={company} onChange={(e) => { setCompany(e.target.value) }} />
               

            <button onClick={updateProduct} className='appbutton' type='button'>Update Product</button>
        </div>
    )
}
export default UpdateProduct