import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeroPages from '../components/HeroPages';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Customer = () => {
    const [customer, setCustomer] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 8;
  const nav = useNavigate()
  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const fetchData = (pageNumber) => {
    axios.get(`https://restapi-ewbo.onrender.com/customer?page=${pageNumber}`).then((res) => {
            console.log(res.data.data);
            setCustomer(res.data.data);
        }).catch((err) => {
            console.log(err)
        })
  };

  const deleteRec = (_id) => {
    if (window.confirm(`Are you sure to delete Customer Information with Id:${_id}`)) {
      axios.delete(`https://restapi-ewbo.onrender.com/customer/${_id}`).then((res)=>{
        window.alert('Customer Information deleted successfully!')
        nav("/")
        fetchData();
        window.location.reload();
      }).catch((error)=>{
        console.error(error);
      })
    }
  };
    return (
        <section className="about-page">
      <HeroPages name="Customers" />
      <div className="container">
        <div className="about-main">
        <div className="book_table">
            <table className='bookings'>
              
              <thead className='thead'>
                <tr>
                  <th> </th>
                  <th>Customer Id</th>
                  {sessionStorage.user==='admin@abc.com' && <th>Booking Id</th>}
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Address</th>
                  {sessionStorage.user==='admin@abc.com' && <th>Actions</th>
                  }                
                </tr>
              </thead>
              
              <tbody>
                {customer.length > 0 &&
                  customer.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage).map((val, index) => (
                    <tr key={index}>
                      <td>#</td>
                      <td>{val._id}</td>
                      {sessionStorage.user==='admin@abc.com' && <td>{val.booking}</td>}
                      <td>{val.first_name} {val.last_name}</td>
                      <td>{val.phone_number}</td>
                      <td>{val.age}</td>
                      <td>{val.email}</td>
                      <td>{val.address}, {val.city}-{val.zipcode}</td>
                      {sessionStorage.user==='admin@abc.com' && <td>
                        <Link to={`/editcust/${val._id}`}>
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
  pageCount={Math.ceil(customer.length / itemsPerPage)}
  onPageChange={({ selected }) => setPageNumber(selected)}
  containerClassName={'pagination'}
  pageLinkClassName={'page-link'}
  activeClassName={'active'}
  className='paginate'
/>
        </div>
        </div>
        </section>
    )
}

export default Customer
