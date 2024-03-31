import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { useNavigate } from "react-router-dom";

function Contact() {
  const nav= useNavigate();
  const handleSubmit= (event)=>{
    event.preventDefault();
    
    nav('/')
  }

  return (
    <>
      <section className="contact-page">
        <HeroPages name="Contact" />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Need additional information?</h2>
              <p>
                A multifaceted professional skilled in multiple fields of
                research, development as well as a learning specialist. Over 15
                years of experience.
              </p>
              <a href="/">
                <i className="fa-solid fa-phone"></i>&nbsp; (123) 456-7869
              </a>
              <a href="/">
                <i className="fa-solid fa-envelope"></i>&nbsp;
                carrental@xyz.com
              </a>
              <a href="/">
                <i className="fa-solid fa-location-dot"></i>&nbsp; Bengaluru,
                Karnatka
              </a>
            </div>
            <div className="contact-div__form">
              <form onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="name">
                  Full Name <b>*</b>
                </label>
                <input name='name' id='name' type="text" placeholder='E.g: "Joe Shmoe"' required></input>

                <label htmlFor="email">
                  Email <b>*</b>
                </label>
                <input name='email' id='email' type="email" placeholder="youremail@example.com" required></input>

                <label htmlFor="grievance">
                  Tell us about it <b>*</b>
                </label>
                <textarea name='grievance' id='grievance' placeholder="Write Here.." required></textarea>

                <button type="submit">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Send
                  Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Contact;
