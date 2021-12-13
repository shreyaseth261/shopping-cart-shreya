import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {useState,useEffect} from 'react'
import Restock from './Restock'
import Edit from './Edit'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router'

const Admin = () => {
    const history = useNavigate()
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

    const [restock,setRestock] =useState(false)
    const [edit,setEdit] = useState(false)
    const initialvalues={
        item:'',
        price:'',
        quantity:'',
        img:'',
        category:''
    }

    const validation=Yup.object({
        item:Yup.string().required("Required").trim(),
        price:Yup.number().required("Required"),
        quantity:Yup.number().required("Required"),
        category:Yup.string().required("Required").trim()
    })

    const onSubmit=async(values,reset)=>{
        console.log(values);
        if(values.img!=''){
            const data=new FormData()
            data.append("img",values.img,values.img.name)
            await axios.post("http://localhost:3001/img",data,{
                headers:{"Content-Type": "multipart/form-data"}
            }).then(res=>{
                if(!res.data.err){
                    axios.post("http://localhost:3001/product",{
                        price:values.price,
                        quantity:values.quantity,
                        item:values.item,
                        category:values.category,
                        img:res.data.file
                    }).then(res=>{
                        console.log(res.data)
                    })
                }
                else{
                    console.log(res.data)
                }
            })
        }

        reset.resetForm()
    }
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
            <div className="mainadminform">
                <h1 className="loginh">Add Product</h1>
                <Formik initialValues={initialvalues} validationSchema={validation} onSubmit={onSubmit}>
                   { 
                    (props)=>(
                                <Form className='form adminform'>
                                <Field type="text" name="item" className="field" placeholder="Product Name"/>
                                <ErrorMessage name="item" className="err" component="div"/>

                                <Field type="number" name="price" className="field" placeholder="Product Price"/>
                                <ErrorMessage name="price" className="err" component="div"/>

                                <Field type="number" name="quantity" className="field" placeholder="Product Quantity"/>
                                <ErrorMessage name="quantity" className="err" component="div"/>

                                <Field as="select" name="category" className="field" placeholder="Product Category">
                                    <option value="">Select a Category</option>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                </Field>
                                <ErrorMessage name="category" className="err" component="div"/>
                                <p className="img">Add Product Image</p>
                                <input type="file" name="img" onChange={(e)=>{
                                    if(e.target.files[0]){
                                        props.setFieldValue("img",e.target.files[0])
                                    }
                                }}/>
                                <button type="submit" className='btn'>Add Product</button>
                                </Form>
                            )
                    
                    }
                </Formik>
            </div>
            {restock==false?<button type="button" className='btn admin-btn' onClick={
                ()=>{setRestock(true)}
            }>+ Restock Item</button>:<button type="button" className='btn admin-btn' onClick={
                ()=>{setRestock(false)}
            }>- Restock Item</button>}
            {
                restock==true ? <Restock/> :''
            }
            <br />
           {edit==false ? <button type="button" className='btn admin-btn' onClick={()=>{
                setEdit(true)
            }}>+ Edit Item</button>:<button type="button" className='btn admin-btn' onClick={()=>{
                setEdit(false)
            }}>- Edit Item</button>}
            {edit==true?<Edit/>:''}
        </div>
    )
}

export default Admin
