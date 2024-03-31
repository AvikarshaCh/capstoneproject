import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HeroPages from '../components/HeroPages';

const AddBook = () => {
    const {_id} = useParams();
    const nav = useNavigate();
    const [book, setBook] = useState({
        carType:'',
        pickupL:'',
        pickupD:'',
        dropOffL:'',
        dropOffD:''
    });
    const inputChangeHandler=(event)=>{
            const{type, name, value} = event.target;
            setBook({...book,[name]:value});
    }
    useEffect(()=>{
        console.log(_id);
        axios.get(`https://restapi-ewbo.onrender.com/booking/${_id}`).then((res)=>{
            console.log(res.data.data);
            setBook(res.data.data)
        }).catch((error)=>{});
    },[])
    const editbook =(event)=>{ 
        event.preventDefault();
        console.log(book);
        axios.put(`https://restapi-ewbo.onrender.com/booking/${_id}`, book).then(()=>{
            window.alert('Booking Record Updated Successfully!');
            nav('/book');
        }).catch((error)=>{

        })
    }
    return (
        <div>
            <section className="about-page">
      <HeroPages name="Edit Booking" />
      <div className="container">
        <div className="about-main"><div className='flexd'>
            <h2>Edit Booking: </h2>
            <div className='row'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    <form onSubmit={(e)=>editbook(e)} 
                    >
                        <div className='carTypediv'><label htmlFor='carType'>Car Type</label><input type='text' name='carType' className='form-control' id='carType' value={book.carType} onChange={(e)=>inputChangeHandler(e)} /></div><br />
                        <div className='carTypediv'><label htmlFor='pickupL'>Pickup Location</label><input type='text' id='pickupL' name='pickupL' className='form-control' value={book.pickupL} onChange={(e)=>inputChangeHandler(e)} /></div><br />
                        <div className='carTypediv'><label htmlFor='pickupD'>Pickup Date</label><input type='date' id='pickupD' name='pickupD' className='form-control' value={book.pickupD} onChange={(e)=>inputChangeHandler(e)} /></div><br />
                        <div className='carTypediv'><label htmlFor='dropOffL'>Dropoff Location</label><input type='text' name='dropOffL' id='dropOffL' className='form-control' value={book.dropOffL} onChange={(e)=>inputChangeHandler(e)} /></div><br />
                        <div className='carTypediv'><label htmlFor='dropOffD'>Dropoff Date</label><input type='date' name='dropOffD' id='dropOddD' className='form-control' value={book.dropOffD} onChange={(e)=>inputChangeHandler(e)} /></div><br />
                        <button type='submit' className='btn btn-outline-warning'>Submit</button>
                
                
                </form></div>
                <div className='col-sm-3'></div>
                
            </div>
            </div>
            </div></div>
            </section>
        </div>
    )
}

export default AddBook
