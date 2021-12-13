import React from 'react'
import Header from './Header'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useState,useEffect } from 'react'
import{Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup' 
import pic5 from '../img/pic5.jpg'
const Men = () => {
    const history = useNavigate()
    const [username,setUsername]=useState('')
    const [userid,setUserid] = useState(0)
    const [products,setProducts] = useState([])
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
                await axios.get("http://localhost:3001/products").then(res=>{
                    if(!res.data.err){
                       
                        setProducts(res.data)
                    }
                })
            }
        )()
    }, [])

    const initialvalues={
        userid:0,
        productid:0,
        quantity:1
        
    }
    
    const validation=Yup.object({
        quantity:Yup.number().min(1,"Please select atleast 1 unit.")
    })
    
    const onSubmit = (values,reset)=>{
        console.log(values)
        reset.resetForm()
    }
    return (
        <div>
            <Header username={username}/>
            <div className="products-container">
            {
                products.map(product=>{
                    return(
                        product.category == "men" && 
                        <div className="products" key={product.product_id}>
                            <img src={`http://localhost:3001/${product.photo}`} alt="" className="productimg"/>
                            <div className="product-details">
                                <p className="productname">{product.name}</p>
                                <p className="price">${product.price}</p>
                                <h5 className="instock">In Stock</h5>
                            </div>
                            <Formik initialValues={initialvalues} validationSchema={validation} onSubmit={onSubmit}>
                                {
                                    ({setFieldValue})=>(
                                        <Form className='quantity-form'>
                                            <div>
                                                <label htmlFor="quantity" className='label'>Quantity</label>
                                                <Field type="number" name="quantity" className="field"/>
                                            </div>
                                            <ErrorMessage name="quantity" component="div" className="err q-err"/>
                                            <button type="submit" className='btn' onClick={()=>{
                                                setFieldValue('userid',userid)
                                                setFieldValue('productid',product.product_id)
                                            }}>Add to cart</button>
                                        </Form>
                                    )
                                }
                                
                            </Formik>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Men
