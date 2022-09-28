import React, { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError]= useState(false)

    const addProduct = async () =>{
        if(!name || !price || !category || !company){ // agr yeh 4 field nh rhega to error true ho jayega aur niche wala code execute nh hga 
            setError(true)
            return false; // yeh true hone ke baad niche ka codee execute nh hoga
        }
        
        const userId = JSON.parse(localStorage.getItem('user'))._id // user ka id nikalna tha to getItem use kiye but string ke form me tha to json.parse use kiye
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        result = await result.json()
        console.log(result);
        setName('')
        setPrice('')
        setCategory('')
        setCompany('')
    }
    return(
        <div className='product'>
            <h1>Add Product</h1>
            <input type='text' placeholder='Enter Product Name' className='inputBox' 
            onChange={(e)=> {setName(e.target.value)}} value={name}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>} 
            {/* jb error true hoga aur name nh rhega then enter vaild name bolega */}

            <input type='text' placeholder='Enter Product Price' className='inputBox'
            onChange={(e)=> {setPrice(e.target.value)}} value={price}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            {/* jb error true hoga aur price nh rhega then enter vaild price bolega */}

            <input type='text' placeholder='Enter Product Category' className='inputBox'
            onChange={(e)=> {setCategory(e.target.value)}} value={category}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            {/* jb error true hoga aur category nh rhega then enter vaild category bolega */}

            <input type='text' placeholder='Enter Product Company' className='inputBox'
            onChange={(e)=> {setCompany(e.target.value)}} value={company}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            {/* jb error true hoga aur company nh rhega then enter vaild company bolega */}

            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct