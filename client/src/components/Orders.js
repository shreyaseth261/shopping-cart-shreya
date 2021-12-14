import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Header from './Header'
import { Link } from 'react-router-dom'
const Orders = () => {
    const history = useNavigate()
    const [username,setUsername]=useState('')
    const [orders,setOrders] = useState([])

    useEffect(() => {
        (
            async()=>{
                await axios.get("http://localhost:3001/admin",{
                    withCredentials:true
                }).then(res =>{
                    if(res.data.err){
                        history("/login")
                    }
                })
            }
        )()
    }, [])

    useEffect(() => {
        (
            async()=>{
                await axios.get("http://localhost:3001/adminorders").then(res=>{
                    if(!res.data.err){
                        setOrders(res.data)
                    }
                    else{
                        console.log(res.data)
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
                        <h4 className="adminh4">Order ID</h4>
                        {orders.map(order=>{
                            return(
                                <p className="adminid">{order.order_id}</p>
                            )
                        })}
                    </div>
                    <div className="adminname">
                        <h4 className="adminh4">User ID</h4>
                        {orders.map(order=>{
                            return(
                                <p className="adminid">{order.user_id}</p>
                            )
                        })}
                    </div>
                    <div className="adminprice">
                        <h4 className="adminh4">Product ID</h4>
                        {orders.map(order=>{
                            return(
                                <p className="adminid">{order.product_id}</p>
                            )
                        })}
                    </div>
                    <div className="admincategory">
                        <h4 className="adminh4">Quantity</h4>
                        {orders.map(order=>{
                            return(
                                <p className="adminid">{order.quantity}</p>
                            )
                        })}
                    </div>
                </div>
        </div>
    )
}

export default Orders
