import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HeroPages from '../components/HeroPages';

const CustomerEdit = () => {
    const {_id} = useParams();
    const nav = useNavigate();
    const [customer, setCustomer] = useState({
        booking:'',
        first_name:'',
        last_name:'',
        phone_number:'',
        age:'',
        email:'',
        address:'',
        city:'',
        zipcode:''
    });
    const inputChangeHandler=(event)=>{
            const{type, name, value} = event.target;
            setCustomer({...customer,[name]:value});
    }
    useEffect(()=>{
        console.log(_id);
        axios.get(`https://restapi-ewbo.onrender.com/customer/${_id}`).then((res)=>{
            console.log(res.data.data);
            setCustomer(res.data.data)
        }).catch((error)=>{
            console.log(error.message)
        });
    },[])
    const editcust =(event)=>{ 
        event.preventDefault();
        console.log(customer);
        axios.put(`https://restapi-ewbo.onrender.com/customer/${_id}`, customer).then(()=>{
            window.alert('Customer Record Updated Successfully!');
            nav('/customer');
        }).catch((error)=>{

        })
    }
    return (
        <section className="about-page">
      <HeroPages name="Edit Customer information" />
      <div className="container">
        <div className="about-main"><div className='flexd'>
            <div className='row'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    <form onSubmit={(e)=>editcust(e)} >
                        <div className='info-form__1col'><label htmlFor='booking'>Enter Booking Id:</label><input type='text' name='booking' id='booking' value={customer.booking} onChange={(e)=>inputChangeHandler(e)} readOnly/></div><br/>
                        <div className='info-form__1col'><label htmlFor='first_name'>Enter First Name:</label><input type='text' name='first_name' id='first_name' value={customer.first_name} onChange={(e)=>inputChangeHandler(e)} /></div><br/>
                        <div className='info-form__1col'><label htmlFor='last_name'>Enter Last Name:</label><input type='text' name='last_name' id='last_name' value={customer.last_name} onChange={(e)=>inputChangeHandler(e)} /></div><br/>
                        <div className='info-form__1col'><label htmlFor='phone_number'>Enter Phone Number:</label><input type='text' name='phone_number' id='phone_number' value={customer.phone_number} onChange={(e)=>inputChangeHandler(e)} /></div><br/>
                        <div className='info-form__1col'><label htmlFor='age'>Enter Age:</label><input type='number' name='age' id='age' value={customer.age} onChange={(e)=>inputChangeHandler(e)} /></div><br/>
                        <div className='info-form__1col'><label htmlFor='email'>Enter Email:</label><input type='text' name='email' id='email' value={customer.email} onChange={(e)=>inputChangeHandler(e)} /></div><br/>
                        <div className='info-form__1col'><label htmlFor='address'>Enter Street Address:</label><input type='text' name='address' id='address' value={customer.address} onChange={(e)=>inputChangeHandler(e)} /></div><br/>
                        <div className='info-form__1col'><label htmlFor='city'>Enter City:</label><input type='text' name='city' id='city' value={customer.city} onChange={(e)=>inputChangeHandler(e)} /></div><br/>
                        <div className='info-form__1col'><label htmlFor='zipcode'>Enter Zip Code:</label><input type='number' name='zipcode' id='zipcode' value={customer.zipcode} onChange={(e)=>inputChangeHandler(e)} /></div><br/><br/>
                        <button type='submit' className='btn btn-outline-warning'>Submit</button>
                    </form>
                    </div>
                <div className='col-sm-3'></div>
                
            </div>
            </div>
            </div></div>
            </section>
    )
}

export default CustomerEdit
