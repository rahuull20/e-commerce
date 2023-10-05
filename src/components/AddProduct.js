import React from 'react';

const AddProduct = () => {
    //collect data when button is clicked
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const addProduct = async () => {
        console.warn(!name)
        if (!name || !price || !category || !company) {
            setError(true);
            return false;//below this code will not execute
        }


        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;//fetched user id

        //intergrate with backend
        let result = await fetch("http://localhost:5000/addproduct", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        result = await result.json();
        console.warn(result);
        alert("Product Added Successfully")

    }



    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input className='inputbox' type='text' placeholder='Enter Name'
                value={name} onChange={(e) => { setName(e.target.value) }} />
            {error &&  !name&& <span className='invalid-input'>Enter valid name</span>}
            {/* if error true(when space is blank and click on submit) show message */}

            <input className='inputbox' type='text' placeholder='Enter Product Price'
                value={price} onChange={(e) => { setPrice(e.target.value) }} />
                {error &&  !price&& <span className='invalid-input'>Enter valid price</span>}

            <input className='inputbox' type='text' placeholder='Enter Category'
                value={category} onChange={(e) => { setCategory(e.target.value) }} />
                {error &&  !category&& <span className='invalid-input'>Enter valid category</span>}

            <input className='inputbox' type='text' placeholder='Enter Company'
                value={company} onChange={(e) => { setCompany(e.target.value) }} />
                {error &&  !company&& <span className='invalid-input'>Enter valid company</span>}

            <button onClick={addProduct} className='appbutton' type='button'>Add Product</button>
        </div>
    )
}
export default AddProduct