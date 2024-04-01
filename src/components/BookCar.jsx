import { useEffect, useState } from "react";
import CarAudi from "../images/cars-big/audia1.jpg";
import CarGolf from "../images/cars-big/golf6.jpg";
import CarToyota from "../images/cars-big/toyotacamry.jpg";
import CarBmw from "../images/cars-big/bmw320.jpg";
import CarMercedes from "../images/cars-big/benz.jpg";
import CarPassat from "../images/cars-big/passatcc.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
function BookCar() {
  // booking car
  
  const [modal, setModal] = useState(false); //  class - active-modal
  const [carType, setCarType] = useState("");
  
  const [carImg, setCarImg] = useState("");
  // modal infos
  
  const [recordId, setRecordId] = useState(null);
  const nav = useNavigate();
  const [book, setbook] = useState({
        carType:'',
        pickupL:'',
        pickupD:'',
        dropOffL:'',
        dropOffD:''
    });
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
 
  

 
  // open modal when all inputs are fulfilled
  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      book.pickupL === "" ||
      book.dropOffL === "" ||
      book.pickupD === "" ||
      book.dropOffL === "" ||
      book.carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
    
    axios.post(`https://restapi-ewbo.onrender.com/booking`, book).then((res)=>{
      window.alert(`New Booking Id Generated Successfully!`);
      var newrecid= res.data.createdbook._id;
      setRecordId(newrecid);
      nav('/');
  }).catch((error)=>{})

  };
  
  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);
 
  // confirm modal booking
  const confirmBooking = (e) => {
    e.preventDefault();
    if(!customer.first_name.trim()){
      document.getElementById('fnerr').innerHTML = "First Name field cannot be empty";
            return false;
    }
    else{
      document.getElementById('fnerr').innerHTML = "";

    }
    if(!customer.first_name.match("[a-zA-Z]{3,15}")){
      document.getElementById('fnerr').innerHTML = "First Name must contain only character min-3 and max-15";
      return false;
  }
  else{
    document.getElementById('fnerr').innerHTML = "";

  }
    if(!customer.last_name.trim()){
      document.getElementById('lnerr').innerHTML = "Last Name field cannot be empty";
            return false;
    }
    else{
      document.getElementById('lnerr').innerHTML = "";
    }
    if(!customer.last_name.match("[a-zA-Z]{3,15}")){
      document.getElementById('lnerr').innerHTML = "Last Name must contain only character min-3 and max-15";
      return false;
  }
  else{
    document.getElementById('lnerr').innerHTML="";
  }
    if(!customer.phone_number.trim()){
      document.getElementById('pnerr').innerHTML = "Phone Number field cannot be empty";
            return false;
    }
    else{
      document.getElementById('pnerr').innerHTML = "";
    }
    if(!customer.age.trim()){
      document.getElementById('aerr').innerHTML = "Age field cannot be empty";
            return false;
    }
    else{
      document.getElementById('aerr').innerHTML = "";
    }
    if(!customer.age.match>=18&&customer.age.match>60){
      document.getElementById('aerr').innerHTML = "Age must be between 18 and 60 years";
            return false;
    }
    if(!customer.booking.trim()){
      document.getElementById('berr').innerHTML = "Booking Id field cannot be empty";
            return false;
    }
    else{
      document.getElementById('berr').innerHTML = "";
    }
    if(!customer.email.trim()){
      document.getElementById('mailerr').innerHTML = "Email field cannot be empty";
            return false;
    }
    else{
      document.getElementById('mailerr').innerHTML = "";
    }
    if(!customer.address.trim()){
      document.getElementById('saerr').innerHTML = "Street Address field cannot be empty";
            return false;
    }
    else{
      document.getElementById('saerr').innerHTML = "";
    }
    if(!customer.city.trim()){
      document.getElementById('cerr').innerHTML = "City field cannot be empty";
            return false;
    }
    else{
      document.getElementById('cerr').innerHTML = "";
    }
    if(!customer.zipcode.trim()){
      document.getElementById('zerr').innerHTML = "Zipcode field cannot be empty";
            return false;
    }
    else{
      document.getElementById('zerr').innerHTML = "";
    }
    setModal(!modal);
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "flex";
    axios.post(`https://restapi-ewbo.onrender.com/customer`, customer).then(()=>{
      window.alert(`Customer Information Added Successfully!`)
    }).catch((err)=>{    })
  };
 
  
  const inputChangeHandler=(event)=>{
    const{type, name, value} = event.target;
    setbook({...book,[name]:value});
}
const handleCar = (e) => {
  setCarType(e.target.value);
  setCarImg(e.target.value);
};
const custipchangehandler=(e)=>{
  const{type, name, value} = e.target;
    setCustomer({...customer,[name]:value});
}
  // based on value name show car img
  let imgUrl;
  switch (carImg) {
    case "Audi A1 S-Line":
      imgUrl = CarAudi;
      break;
    case "VW Golf 6":
      imgUrl = CarGolf;
      break;
    case "Toyota Camry":
      imgUrl = CarToyota;
      break;
    case "BMW 320 ModernLine":
      imgUrl = CarBmw;
      break;
    case "Mercedes-Benz GLK":
      imgUrl = CarMercedes;
      break;
    case "VW Passat CC":
      imgUrl = CarPassat;
      break;
    default:
      imgUrl = "";
  }
 
  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };
 
  return (
    <>
      <section id="booking-section" className="book-section">
        {/* overlay */}
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>
 
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>
 
              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>
 
              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>
 
              <form className="box-form">
                <div className="box-form__car-type">
                  <label htmlFor="carType">
                    <i className="fa-solid fa-car"></i> &nbsp; Select Your Car
                    Type <b>*</b>
                  </label>
                  <select name='carType' id='carType' value={book.carType} onChange={(e)=>{inputChangeHandler(e);handleCar(e)}}>
                    <option>Select your car type</option>
                    <option value="Audi A1 S-Line">Audi A1 S-Line</option>
                    <option value="VW Golf 6">VW Golf 6</option>
                    <option value="Toyota Camry">Toyota Camry</option>
                    <option value="BMW 320 ModernLine">
                      BMW 320 ModernLine
                    </option>
                    <option value="Mercedes-Benz GLK">Mercedes-Benz GLK</option>
                    <option value="VW Passat CC">VW Passat CC</option>
                  </select>
                </div>
 
                <div className="box-form__car-type">
                  <label htmlFor="pickupL">
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <select name='pickupL' id='pickupL' value={book.pickupL} onChange={(e)=>inputChangeHandler(e)}>
                  <option value=''>Select pickup location</option>
                    <option value='Delhi'>Delhi</option>
                    <option value='Kolkata'>Kolkata</option>
                    <option value='Bengaluru'>Bengaluru</option>
                    <option value='Mumbai'>Mumbai</option>
                    <option value='Goa'>Goa</option>
                  </select>
                </div>
 
                <div className="box-form__car-type">
                  <label htmlFor="dropOffL">
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off{" "}
                    <b>*</b>
                  </label>
                  <select name='dropOffL' id='dropOffL' value={book.dropOffL} onChange={(e)=>inputChangeHandler(e)}>
                    <option value=''>Select drop off location</option>
                    <option value='Delhi'>Delhi</option>
                    <option value='Kolkata'>Kolkata</option>
                    <option value='Bengaluru'>Bengaluru</option>
                    <option value='Mumbai'>Mumbai</option>
                    <option value='Goa'>Goa</option>
                  </select>
                </div>
 
                <div className="box-form__car-time">
                  <label htmlFor="pickupD">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up <b>*</b>
                  </label>
                  <input
                  name='pickupD'
                    id="pickupD"
                    value={book.pickupD}
                    onChange={(e)=>inputChangeHandler(e)}
                    type="date"
                  ></input>
                </div>
 
                <div className="box-form__car-time">
                  <label htmlFor="dropOffD">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-off <b>*</b>
                  </label>
                  <input
                    name="dropOffD"
                    id="dropOffD"
                    value={book.dropOffD}
                    onChange={(e)=>inputChangeHandler(e)}
                    type="date"
                  ></input>
                </div>
 
                <button onClick={openModal} type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
 
      {/* modal ------------------------------------ */}
 
      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>
        {/* message */}
        <div className="booking-modal__message">
          <h4>
            <i className="fa-solid fa-circle-info"></i> Upon completing this
            reservation enquiry, you will receive:
          </h4>
          <p>
            Your rental voucher to produce on arrival at the rental desk and a
            toll-free customer support number.
          </p>
        </div>
        {/* car info */}
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    {book.pickupD} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>
 
            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>
                    {book.dropOffD} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>
 
            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>{book.pickupL}</p>
                </div>
              </span>
            </div>
 
            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>{book.dropOffL}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>
              <span>Car -</span> {book.carType}
            </h5>
            {imgUrl && <img src={imgUrl} alt="car_img" />}
          </div><br/><br/>
          <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Booking Id</h6>
                  <p>{recordId}</p>
                </div>
              </span>
            </div>
        </div>
        {/* personal info */}
        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label htmlFor="first_name">
                  First Name <b>*</b>
                </label>
                <input
                name='first_name'
                id='first_name'
                  value={customer.first_name}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="text"
                  placeholder="Enter your first name"
                ></input>
                <p id="fnerr"></p>
              </span>
 
              <span>
                <label htmlFor="last_name">
                  Last Name <b>*</b>
                </label>
                <input
                name='last_name'
                id='last_name'
                  value={customer.last_name}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="text"
                  placeholder="Enter your last name"
                ></input>
                <p id="lnerr"></p>
              </span>
 
              <span>
                <label htmlFor="phone_number">
                  Phone Number <b>*</b>
                </label>
                <input
                name='phone_number'
                id='phone_number'
                  value={customer.phone_number}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="tel"
                  placeholder="Enter your phone number"
                ></input>
                <p id="pnerr"></p>
              </span>
 
              <span>
                <label htmlFor="age">
                  Age <b>*</b>
                </label>
                <input
                name='age'
                id='age'
                  value={customer.age}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="number"
                  placeholder="18"
                ></input>
                <p id="aerr"></p>
              </span>
            </div>
 
            <div className="info-form__1col">
              <span>
                <label htmlFor="booking">
                  Booking Id <b>*</b>
                </label>
                <input
                name='booking'
                id='booking'
                  value={customer.booking}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="email"
                  placeholder="Enter your booking id"
                ></input>
                <p id="berr"></p>
              </span>
            </div>
            <div className="info-form__1col">
              <span>
                <label htmlFor="email">
                  Email <b>*</b>
                </label>
                <input
                name='email'
                id='email'
                  value={customer.email}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="email"
                  placeholder="Enter your email address"
                ></input>
                <p id="mailerr"></p>
              </span>
 
              <span>
                <label htmlFor="address">
                  Address <b>*</b>
                </label>
                <input
                name='address'
                id='address'
                  value={customer.address}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="text"
                  placeholder="Enter your street address"
                ></input>
                <p id="saerr"></p>
              </span>
            </div>
 
            <div className="info-form__2col">
              <span>
                <label htmlFor="city">
                  City <b>*</b>
                </label>
                <input
                name='city'
                id='city'
                  value={customer.city}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="text"
                  placeholder="Enter your city"
                ></input>
                <p id="cerr"></p>
              </span>
 
              <span>
                <label htmlFor="zipcode">
                  Zip Code <b>*</b>
                </label>
                <input
                name='zipcode'
                id='zipcode'
                  value={customer.zipcode}
                  onChange={(e)=>{custipchangehandler(e)}}
                  type="text"
                  placeholder="Enter your zip code"
                ></input>
                <p id="zerr"></p>
              </span>
            </div>
 
            <span className="info-form__checkbox">
              <input type="checkbox"></input>
              <p>Please send me latest news and updates</p>
            </span>
 
            <div className="reserve-button">
              <button onClick={(e)=>confirmBooking(e)}>Reserve Now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default BookCar;
 