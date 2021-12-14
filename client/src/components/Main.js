import React from 'react'
import {BiShoppingBag} from 'react-icons/bi'
import {FaRegUserCircle} from 'react-icons/fa'
import pic7 from '../img/pic7.jpg'
import VideoPlayer from 'react-video-js-player'
import Videof from '../video/Videof.mp4'
import pic11 from '../img/pic11.jpg'
import pic8 from '../img/pic8.jpg'
import pic9 from '../img/pic9.jpg'
import pic10 from '../img/pic10.jpg'
import Header from './Header'
import Footer from './Footer'
import { useEffect,useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Main = () => {
    const videoSrc = Videof;
    const poster="C:\react\shopping cart\client\src\video";
    const history=useNavigate()
    const [username,setUsername]=useState('')
    
    useEffect(() => {
        (
            async()=>{
                await axios.get("http://localhost:3001/user",{withCredentials:true}).then(res=>{
                    if(!res.data.err){
                        setUsername(res.data.username)
                        
                    }
                    else
                    {
                        history('/login')
                    }
                })
            }
        )()
    }, [])

    
   
    return (
        <div className="header-main-div">
            <Header username={username}/>
            <main className="main">
                <img src={pic7} alt="" className="pic1"/>
                <div className="m1">
                    <VideoPlayer
                        src={videoSrc}
                        poster={poster}
                        className="video"
                        playbackRates={[1]}
                        autoplay ="muted"
                        
                        
                        
                    />
                    <div className="description">
                        <h1 className="heading">Why Shopping Cart?</h1>
                        <p className="passage">
                        "To me, owning basic items is luxury. Many of us underestimate the value of essentials.
                        I want my audience to have the best.
                        Luxury doesn’t always have to come at a cost,
                        it must be easily accessible to everyone who aspire good quality products.
                        Simple is beautiful.
                        I want you to experience simplicity with a touch of luxury at an affordable price. "
                        <br/>
                        Malvika, CEO & Founder
                        <br/>
                        MASIC Beauty</p>
                    </div>
                </div>
                <div className="latest">
                    <p className="latestp">Shop Our Latest Collections</p>
                    <button type="button" className="btn">SHOP NOW</button>
                </div>
                <div className="images">
                        <img src={pic11} alt="" className="mainpics"/>
                        <img src={pic8} alt="" className="mainpics"/>
                        <img src={pic9} alt="" className="mainpics"/>
                        <img src={pic10} alt="" className="mainpics"/>
                    </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Main
