import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [productList, setProductList] = useState([]);
  // const {name,price,category,company,userId} = AddProduct()

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let products = await fetch("http://localhost:5000/products");
    products = await products.json();
    setProductList(products);
  };
  console.log(productList);

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      // yaha id le rhe dinamically isiliye backtick me dale
      method: "delete",
    });
    result = await result.json();
    if (result) {
      fetchProducts(); // yaha pe fetchProducts call kiye taki jb delete ho to instantly screen se hat jaye product because yeh change hga to useEffect rerender krega
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value; // yeh define kiye taki onchnge pe value le ske 
    if (key) {                // agr key me kch value h to search krega 
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProductList(result);
      } 
    }else {                   // nh to  sara products show kr dega
      fetchProducts();
    }
  };


  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input
        className="search-product-box"
        type="text"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      { productList.length>0 ? productList.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>${item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={`/update/${item._id}`}>Update</Link>
            {/* Link dale h qki jb ispe click krenge to direct updateproduct component khulega aur usme item._id dale taki pata chale kis item ko target kiye h */}
          </li>
        </ul>
      ))
      : <h1>No Result Found</h1>
    }
    </div>
  );
}

export default ProductList;
