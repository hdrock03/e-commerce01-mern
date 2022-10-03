import React,{useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError]= useState(false)

    const params = useParams() // isko use kiye h taki sara parameter aa jaye url ka
    const navigate = useNavigate();


    useEffect(() => {
        getProductDetails()
    },[])

    const getProductDetails = async () => {
        console.log(params.id)
        let result = await fetch(`http://localhost:5000/product/${params.id}`) // yaha id nikal liye params se
        result = await result.json() // yaha pe us id se related object aaya tha
        setName(result.name) // fr yaha pe set kr diye jo value aaya tha 
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async () =>{
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, { // yaha pe fetch kiye h url aur fr uspe put method lagaye taki frontend se backend me jaye 
            method: 'put', 
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        result= await result.json() // json krete h qki phle result string form me rhta hai 
        console.log(result)
        navigate('/')
        setName('')
        setPrice('')
        setCategory('')
        setCompany('')
    }
    
    return(
        <div className='product'>
            <h1>Update Product</h1>
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

            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct