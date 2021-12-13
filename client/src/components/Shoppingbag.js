import React from 'react'
import Header from './Header'
import {RiDeleteBinFill} from 'react-icons/ri'
const Shoppingbag = () => {
   
    return (
        <div className='cart'>
          <Header/>
           <h1 className="loginh">Your Cart</h1>

           <div className="cartproducts">
               <div>
                <h3 className="name">Product name</h3>
               <p className="price">Price: $999</p>
               </div>
               <p className="quantity">Quantity: 1</p>
               <RiDeleteBinFill size="25" className='shopping-bag'/>
           </div>
           <div className="cartproducts">
               <div>
                <h3 className="name">Product name</h3>
               <p className="price">Price: $999</p>
               </div>
               <p className="quantity">Quantity: 1</p>
               <RiDeleteBinFill size="25" className='shopping-bag'/>
           </div>
           
           <div className='orderplace'>
            <h2 className="total">Subtotal</h2>
           <p className="total">$1999</p>
           <button type="button" className='btn placeorder-btn'>Place Order</button>
           </div>
           

        </div>
    )
}

export default Shoppingbag
