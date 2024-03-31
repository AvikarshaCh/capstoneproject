import React from 'react';
import HeroPages from '../components/HeroPages';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [user, setUser] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 4;
  const nav = useNavigate()
  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const fetchData = (pageNumber) => {
    axios.get(`https://restapi-ewbo.onrender.com/user?page=${pageNumber}`).then((res) => {
            console.log(res.data.data);
            setUser(res.data.data);
        }).catch((err) => {
            console.log(err)
        })
  };
  const deleteRec = (_id) => {
    if (window.confirm(`Are you sure to delete booking with Id:${_id}`)) {
      axios.delete(`https://restapi-ewbo.onrender.com/user/${_id}`).then((res)=>{
        window.alert('BUser Record deleted successfully!')
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
      <HeroPages name="User Data" />
      <div className="container">
        <div className="about-main">
        <div className="book_table">
            <table className='bookings'>
              
              <thead className='thead'>
                <tr>
                  <th> </th>
                  <th>User Id</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              
              <tbody>
                {user.length > 0 &&
                  user.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage).map((val, index) => (
                    <tr key={index}>
                      <td>#</td>
                      <td>{val._id}</td>
                      <td>{val.email}</td>
                      <td>{val.password}</td>
                      <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteRec(val._id)}
                        >
                          Delete
                        </button>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
  previousLabel={'Previous'}
  nextLabel={'Next'}
  pageCount={Math.ceil(user.length / itemsPerPage)}
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

export default Users
