import React, { useState } from 'react'
import {Field,Form,ErrorMessage,Formik} from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router'
const Login = () => {
    const navigate = useNavigate();
    const [err,setErr] = useState('')
    const initialvalues={
        email:'',
        password:''
    }

    const validation=Yup.object({
        email:Yup.string().required("This field is required.").email("This Email is not valid.").trim(),
        password:Yup.string().required("This field is required.").trim()

    })
    const onSubmit=async (values,reset)=>{
        console.log(values);
       await axios.post("http://localhost:3001/login",{
            email:values.email,
            password:values.password
        },{withCredentials:true}).then(res=>{
           if(!res.data.err && !res.data.admin){
                navigate("/")
           }
           else if(res.data.admin){
               navigate("/admin")
           }
           else{
               setErr(res.data.err)
               console.log(res.data.err)
           }
        })
        
        reset.resetForm();
    }

    return (
        <div className="login">
            <main className="main">
                <h1 className="loginh">Login</h1>
                <Formik initialValues={initialvalues} validationSchema={validation} onSubmit={onSubmit}>
                    <Form className="form">
                    {
                        err!="" && <p className='err'>{err}</p>
                    }
                        <Field type="email" className="field" name="email" placeholder="Email"/>
                        <ErrorMessage name="email" component="div" className="err"/>
                        
                        <Field type="password" className="field" name="password" placeholder="Password"/>
                        <ErrorMessage name="password" component="div" className="err"/>

                        <button type="submit" className="btn">Login</button>
                        <p className="already">Don't have an account?<Link to="/signup" className="link"> Sign Up</Link></p>
                    </Form>
                </Formik>
            </main>
        </div>
    )
}

export default Login
