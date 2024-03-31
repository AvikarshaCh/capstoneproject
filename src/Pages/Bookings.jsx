import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeroPages from '../components/HeroPages';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Bookings = () => {
  const [book, setBook] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 6;
  const nav = useNavigate()
  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const fetchData = (pageNumber) => {
    axios.get(`https://restapi-ewbo.onrender.com/booking?page=${pageNumber}`).then((res) => {
            console.log(res.data.data);
            setBook(res.data.data);
        }).catch((err) => {
            console.log(err)
        })
  };

  const deleteRec = (_id) => {
    if (window.confirm(`Are you sure to delete booking with Id:${_id}`)) {
      axios.delete(`https://restapi-ewbo.onrender.com/booking/${_id}`).then((res)=>{
        window.alert('Booking deleted successfully!')
        nav("/")
        fetchData();
      }).catch((error)=>{
        console.error(error);
      })
    }
  };

  return (
    <section className="about-page">
      <HeroPages name="Bookings Module" />
      <div className="container">
        <div className="about-main">
          <div className="book-main__text">
            <h3>Booking Data</h3>
          </div>
          <div className="book_table">
            <table className='bookings'>
              
              <thead className='thead'>
                <tr>
                  <th> </th>
                  <th>Booking Id</th>
                  <th>Car Type</th>
                  <th> </th>
                  <th>Pickup</th>
                  <th>Drop-Off</th>
                  <th> </th>
                  {sessionStorage.user==='admin@abc.com' && <th>Actions</th>
                  }
                </tr>
                <tr>
                  <th> </th>
                  <th> </th>
                  <th> </th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th> </th>
                </tr>
              </thead>
              
              <tbody>
                {book.length > 0 &&
                  book.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage).map((val, index) => (
                    <tr key={index}>
                      <td>#</td>
                      <td>{val._id}</td>
                      <td>{val.carType}</td>
                      <td>{val.pickupL}</td>
                      <td>{val.pickupD}</td>
                      <td>{val.dropOffL}</td>
                      <td>{val.dropOffD}</td>
                      {sessionStorage.user==='admin@abc.com' && <td>
                        <Link to={`/editbook/${val._id}`}>
                          <button type="button" className="btn btn-warning">
                            Edit
                          </button>
                        </Link>
                        &nbsp;|&nbsp;
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteRec(val._id)}
                        >
                          Delete
                        </button>
                        &nbsp;|&nbsp;
                      </td>}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
  previousLabel={'Previous'}
  nextLabel={'Next'}
  pageCount={Math.ceil(book.length / itemsPerPage)}
  onPageChange={({ selected }) => setPageNumber(selected)}
  containerClassName={'pagination'}
  pageLinkClassName={'page-link'}
  activeClassName={'active'}
  className='paginate'
/>
        </div>
      </div>
    </section>
    
  );
};

export default Bookings;