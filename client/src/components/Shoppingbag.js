import React, { useState } from 'react'
import Header from './Header'
import {RiDeleteBinFill} from 'react-icons/ri'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import {useSynchronousState} from '@toolz/use-synchronous-state'


const Shoppingbag = () => {
const [products,setProducts]=useState([])
const [err,setErr]=useState("")
const [userid,setUserid] = useSynchronousState(0)
const [username,setUsername]=useState('')
const [total,setTotal]=useState(0)
const history = useNavigate()

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
        (async()=>{
            await axios.get("http://localhost:3001/cart").then(res=>{
                if(!res.data.err){
                  setProducts(res.data)
                  axios.post("http://localhost:3001/total",{
                      userid:userid()
                  }).then(res=>{
                      setTotal(res.data[0].totalprice)
                  })
                }
                else{
                    setErr(res.data.err)
                }
            })
        })()
    }, [products])

   
    return (
        <div className='cart'>
          <Header username={username}/>
           <h1 className="loginh">Your Cart</h1>

            {
            err=="" && products!=''? 
            products.map(product=>{
                
                return(
                product.user_id == userid() &&
                <div className="cartproducts" key={product.product_id}>
                <div>
                 <h3 className="name">{product.name}</h3>
                <p className="price">Price: ${product.totalprice}</p>
                </div>
                <p className="quantity">Quantity: {product.quantity}</p>
                <RiDeleteBinFill size="25" className='shopping-bag' onClick={async()=>{
                    await axios.post("http://localhost:3001/delete",{
                        userid:userid(),
                        productid:product.product_id
                    }).then(res=>{
                        console.log(res.data)
                    })
                }}/>
            </div>
            )
            }) : <h1 className='emptycart'>{err}</h1>
            
            }
           { 
           err=="" && <div className='orderplace'>
            <h2 className="total">Subtotal</h2>
           <p className="price">${total}</p>
           <button type="button" className='btn placeorder-btn' onClick={async()=>{
               await axios.post("http://localhost:3001/orders",{
                   userid:userid()
               }).then(res=>{
                   console.log(res.data)
               })
           }}>Place Order</button>
           </div>}
           

        </div>
    )
}

export default Shoppingbag
