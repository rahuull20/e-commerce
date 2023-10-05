import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    //calls api in use effect
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products' ,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`//to send token in headers, bearer to verify token 
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`//to send token in headers, bearer to verify token 
            }
        });
        result = await result.json();
        if (result) {
            alert("record is deleted")
            getProducts();//remove dleeted itemm from table
        }
    }

    const searchHandle=async(event)=>{
        let key=event.target.value;
        
        if(key){
            let result=await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                   authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`//to send token in headers, bearer to verify token 
                }
            })
            result= await result.json();
            if(result){
                setProducts(result);//show tables with have smae char as searched
            }
        }
        else{
            getProducts();
        }

    }

    return (
        <div className='product-list'>
            <h1>Products List</h1>
            <input className='search-product-box' type='text' placeholder='Search Product'
            onChange={searchHandle}
            />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {//this turnury optr to print no prdt found if after search no match is there
              products.length>0?  products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                        <Link to={'/update/'+item._id}>Update</Link>;
                        {/* link to go to update page by product id to be updated */}
                        </li>
                    </ul>
                )
                : <h1>No Product Found</h1>
                }
        </div>
    )
}
export default ProductList;