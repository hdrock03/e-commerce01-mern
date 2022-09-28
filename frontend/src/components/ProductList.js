import React, { useEffect, useState } from 'react'

function ProductList() {
    const [productList, setProductList] = useState([])
    // const {name,price,category,company,userId} = AddProduct()

    useEffect(()=> {
        fetchProducts()
    },[])

    const fetchProducts = async () => {
        let products = await fetch('http://localhost:5000/products')
        products = await products.json()
        setProductList(products)
    }
    console.log(productList);
  return (
    <div className='product-list'>
        <h3>Product List</h3>
        <ul>
          <li>S. No</li>  
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
        </ul>
        {productList.map((item,index) => (
            <ul>
            <li>{index+1}</li>  
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
          </ul>
        ))

        }
    </div>
  )
}

export default ProductList