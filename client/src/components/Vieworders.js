import React from 'react'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'
import Header from './Header'

const Vieworders = () => {
    const history = useNavigate()
    const [username,setUsername] = useState('')
    const [orders,setOrders]= useState([])
    const [err,setErr] = useState('')
    const[userid,setUserid] = useState(0)
    useEffect(() => {
        (
            async()=>{
                await axios.get("http://localhost:3001/user",{withCredentials:true}).then(res=>{
                    if(!res.data.err){
                        setUsername(res.data.username)
                        setUserid(res.data.id)
                    }
                    else
                    {
                        history('/login')
                    }
                })
            }
        )()
    }, [])
    useEffect(() => {
        (
            async()=>{
                await axios.get("http://localhost:3001/customerorders").then(res=>{
                    if(!res.data.err){
                        setOrders(res.data)
                        console.log(res.data)
                    }
                    else{
                        setErr(res.data.err)
                    }
                })
            }
        )()
    }, [])
    return (
        <div>
            <Header username={username}/>
            <h1 className="loginh">Your Orders</h1>
           {
               orders!='' && err=='' ?
               orders.map(order=>{
                   return(
                       order.user_id==userid &&
                    <div className="cartproducts" key={order.user_id}>
                    <h3 className="name">{order.name}</h3>
                    <p className="price">${order.price}</p>
                    <p className="quantity">Quantity: {order.quantity}</p>
                </div>
                   )
               }): <p className='err'>{err}</p>
           }
        </div>
    )
}

export default Vieworders
