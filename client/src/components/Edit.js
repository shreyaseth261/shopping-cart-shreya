import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
const Edit = () => {
    const initialvalues={
        productid:'',
        item:'',
        price:''
    }
    const validation=Yup.object({
        productid:Yup.number().required("Required"),
        item:Yup.string().required("Required"),
        price:Yup.number().required("Required")
    })

    const onSubmit=async(values,reset)=>{
        console.log(values);
        await axios.post("http://localhost:3001/edit",{
            productid:values.productid,
            name:values.item,
            price:values.price
        }).then(res=>{
            console.log(res.data)
        })
        reset.resetForm();
    }
    return (
        <div>
             <div className="mainadminform">
                <h1 className="loginh">Edit Product</h1>
                <Formik initialValues={initialvalues} validationSchema={validation} onSubmit={onSubmit}>
                    <Form className='form adminform'>
                        <Field type="number" name="productid" className="field" placeholder="Product ID"/>
                        <ErrorMessage name="productid" className="err" component="div"/>

                        <Field type="text" name="item" className="field" placeholder="Product Name"/>
                        <ErrorMessage name="item" className="err" component="div"/>

                        <Field type="number" name="price" className="field" placeholder="Product Price"/>
                        <ErrorMessage name="price" className="err" component="div"/>
                        <button type="submit" className='btn'>Restock</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Edit
