import axios from 'axios'
import React from 'react'
import {BiShoppingBag} from 'react-icons/bi'
import {FaRegUserCircle} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
const Header = ({username}) => {
    const history=useNavigate();
    return (
        <div>
             <header className="header">
                <div className="h1">
                    <h1 className="cartname">Shopping Cart</h1>
                    <div className="user-name">
                        <FaRegUserCircle size="25" className='user-pic'/>
                        <p className="user">{username}</p>
                        
                    </div>
                    <p className="view-orders"><Link to="/vieworders" className='header-link responsive-link'>View orders</Link></p>
                </div>
                <div className="h2">
                    <p className="section"><Link to="/" className='header-link responsive-link'>Home</Link></p>
                    <p className="section"><Link to="/women" className='header-link responsive-link'>Women</Link></p>
                    <p className="section"><Link to="/men" className='header-link responsive-link'>Men</Link></p>
                </div>
                <div className='logout'>
                    <BiShoppingBag size="28" className="shopping-bag" onClick={()=>{
                        history("/shoppingbag")
                    }}/>
                    <button type='button' className='logoutbtn' onClick={async()=>{
                            await axios.get("http://localhost:3001/logout",{withCredentials:true}).then(res=>{
                                if(!res.data.err){
                                    history("/login")
                                }
                            })
                    }}>Logout</button>
                </div>
            </header>
        </div>
    )
}

export default Header
