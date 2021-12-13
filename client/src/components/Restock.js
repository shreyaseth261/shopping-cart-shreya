import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
const Restock = () => {
    const initialvalues={
        productid:'',
        quantity:''
    }
    const validation=Yup.object({
        productid:Yup.number().required("Required"),
        quantity:Yup.number().required("Required")
    })

    const onSubmit=async (values,reset)=>{
        console.log(values)
        await axios.post("http://localhost:3001/restock",{
            productid:values.productid,
            stock:values.quantity
        }).then(res=>{
            console.log(res.data)
        })
        reset.resetForm();
    }
    return (
        <div>
             <div className="mainadminform">
                <h1 className="loginh">Restock Product</h1>
                <Formik initialValues={initialvalues} validationSchema={validation} onSubmit={onSubmit}>
                    <Form className='form adminform'>
                        <Field type="number" name="productid" className="field" placeholder="Product ID"/>
                        <ErrorMessage name="productid" className="err" component="div"/>

                        <Field type="number" name="quantity" className="field" placeholder="Product Quantity"/>
                        <ErrorMessage name="quantity" className="err" component="div"/>
                        <button type="submit" className='btn'>Restock</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Restock
