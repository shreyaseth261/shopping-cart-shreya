import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useEffect,useState } from 'react'
const Products = () => {
    const history =useNavigate()
    const [products,setProducts] = useState([])

    useEffect(() => {
        ( 
            async()=>{
                await axios.get("http://localhost:3001/products").then(res=>{
                    if(!res.data.err){
                        console.log(res.data)
                        setProducts(res.data)
                    }
                })
            }
        )()
    }, [])
    return (
        <div>
            <header className='admin-header'>
                <p className="admin-items"><Link to="/admin" className='link'>Admin</Link></p>
                <p className="admin-items"><Link to="/admin/products" className='link'>Products</Link></p>
                <p className="admin-items"><Link to="/admin/orders" className='link'>Orders</Link></p>
                <p className="admin-items link" onClick={async()=>{
                    await axios.get("http://localhost:3001/adminlogout",{withCredentials:true}).then(res=>{
                        if(!res.data.err){
                            history("/login")
                        }
                    })
                }}>Logout</p>
                
            </header>
                <div className="adminproducts">
                    <div className="adminproductid">
                        <h4 className="adminh4">Product ID</h4>
                        {products.map(product=>{
                            return(
                                <p className="adminid">{product.product_id}</p>
                            )
                        })}
                    </div>
                    <div className="adminname">
                        <h4 className="adminh4">Product Name</h4>
                        {products.map(product=>{
                            return(
                                <p className="adminid">{product.name}</p>
                            )
                        })}
                    </div>
                    <div className="adminprice">
                        <h4 className="adminh4">Product Price</h4>
                        {products.map(product=>{
                            return(
                                <p className="adminid">{product.price}</p>
                            )
                        })}
                    </div>
                    <div className="admincategory">
                        <h4 className="adminh4">Product Category</h4>
                        {products.map(product=>{
                            return(
                                <p className="adminid">{product.category}</p>
                            )
                        })}
                    </div>
                    <div className="adminstock">
                        <h4 className="adminh4">Product Stock</h4>
                        {products.map(product=>{
                            return(
                                <p className="adminid">{product.stock}</p>
                            )
                        })}
                    </div>
                </div>

        </div>
    )
}

export default Products
