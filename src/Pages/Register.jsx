import React, { useState } from 'react'
import HeroPages from '../components/HeroPages'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const nav = useNavigate();
    const [user, setUser]=useState({
        email:'',
        password:''
    })
    const inputChangeHandler=(event)=>{
        const{type, name, value} = event.target;
        setUser({...user,[name]:value});
}
    const handleSubmit= (event)=>{
        event.preventDefault();
        if (!user.email.trim()) {
            document.getElementById('mailerr').innerHTML ="Email is required";
            return false;
          }
          else{
            document.getElementById('mailerr').innerHTML = "";
          }
          if (!user.email.match("[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}")){
            document.getElementById('mailerr').innerHTML ="Email invalid";
            return false;
          }
          else{
            document.getElementById('mailerr').innerHTML = "";
          }
          if(!user.password.trim()){
            document.getElementById('perr').innerHTML="Password is mandatory";
            return false;
        }
        else{
          document.getElementById('perr').innerHTML = "";
        }
        axios.post(`https://restapi-ewbo.onrender.com/user`, user).then(()=>{
            window.alert('Registration Successful!');
            nav('/');
        }).catch((error)=>{

        })
    }

    return (
        <section className="about-page">
      <HeroPages name="Register" />
      <div className="container">
        <div className="about-main">
        <div className='row'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='info-form__2col'><label htmlFor='email'>Enter Your Email Id:</label><input type='text' name="email" id='email' placeholder='abc@def.com' value={user.email} onChange={(e)=>inputChangeHandler(e)}/></div>

                <p id="mailerr"></p>
                <div className='info-form__2col'><label htmlFor='password'>Enter Password:</label><input type='password' name="password" id='password' placeholder='********' value={user.password} onChange={(e)=>inputChangeHandler(e)}/></div>
                
                <p id='perr'></p>
                <button type='submit' className='navbar__buttons__register'>Submit</button>
            </form></div>
            <div className='col-sm-3'></div>
            </div>
        </div>
        </div>
        </section>
    )
}

export default Register
