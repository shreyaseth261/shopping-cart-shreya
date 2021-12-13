import React from 'react'
import {Field,Form,ErrorMessage,Formik} from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
const Signup = () => {
    const [success,setSuccess] = useState('')
    const [err,setErr] = useState('')
    const initialvalues={
        email:'',
        username:'',
        password:''
    }
    const validation=Yup.object({
        email:Yup.string().required("This field can't be empty.").trim().email("Please enter a valid email."),
        username:Yup.string().required("This field is required.").trim(),
        password:Yup.string().required("This field can't be empty.")
    })
    const onSubmit=(values,reset)=>{
        console.log(values);
        axios.post("http://localhost:3001/signup",{
            email:values.email,
            username:values.username,
            password:values.password
        }).then(res=>{
            if(!res.data.err)
            {
                console.log(res.data)
                setSuccess(res.data)
            }
            else{
                setErr(res.data.err)
            }

        })
        reset.resetForm();
        setSuccess('');
        setErr('')

    }
    return (
        <div>
            <h1 className="loginh">Sign Up</h1>
            <Formik initialValues={initialvalues} validationSchema={validation} onSubmit={onSubmit}>
                <Form className="form">
                    {
                        success!='' ? <p className='err success'>{success}</p>:<p className='err'>{err}</p>
                        
                    }
                    <Field type="text" name="username" className="field" placeholder="Name"/>
                    <ErrorMessage component="div" className="err" name="username"/>

                    <Field type="email" name="email" className="field" placeholder="Email"/>
                    <ErrorMessage component="div" className="err" name="email"/>

                    <Field type="password" name="password" className="field" placeholder="Password"/>
                    <ErrorMessage component="div" className="err" name="password"/>

                    <button type="submit" className="btn">Sign Up</button>

                    <p className="already">Already have an account?<Link to="/login" className="link"> Login</Link></p>
                </Form>
            </Formik>
        </div>
    )
}

export default Signup
