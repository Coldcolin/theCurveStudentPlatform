import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../api/axios"
// import {AuthContext} from '../../Contexts/AuthProvider';
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
const allStuds = "/users/allusers"

const Alumni = () => {
    // const {saveUser} = useContext(AuthContext);
    const Id = useSelector((e)=> e.Id.Id)
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  
  
  const [users, setUsers] = useState([])
  const getUsers =async()=>{
    try{
      setLoad(true)
      const res = await axios.get(allStuds)
      const user = res.data.data;
      const filteredUsers = await user.filter((e)=> e.role === "alumni");
      setUsers(filteredUsers)
      // console.log(users)
      setLoad(false)
    }catch(error){
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  const makeStudent =async(id)=>{
    try{
      const Toast = await Swal.fire({
        title: 'Make Student?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, continue'
      })
      
      if(Toast.isConfirmed){
        await axios.patch(`/users/student/${id}`)
        Swal.fire(
                'Done!',
                'Alumni is now a Student.',
                'success'
        )
        getUsers();
      }
      
    }catch(error){
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }
  useEffect(()=>{
    getUsers()
  }, [])

  return (
    <div className="all-body">
      <div className="all-head">
        {/* <div className="all-filter">All</div>
        <div className="all-search">Search</div> */}
      </div>
      <div className="all-user-info">
        {
          load? <div>
            <h2>Loading...</h2>
          </div>:
          <table className="assessment-table-holder">
          <thead>
          <tr className="assessment-table">
            <th className="assessment-table-title"></th>
            <th className="assessment-table-title">NAME</th>
            <th className="assessment-table-title">STACK</th>
            <th className="assessment-table-title">OVERALL SCORE</th>
            <th className="assessment-table-title">{" "}</th>
          </tr>
          </thead>
            <tbody>
              {/* <form> */}
            {users?.map((props)=>(
              <tr className="assessment-user-info" key={props?._id}>
                <td><Link to={`/detail/${props._id}`}><img src={props?.image} alt="imae" className="assessment-image"/></Link></td>
                <td><div onClick={()=> navigate(`/detail/${props._id}`)} className="assessment-item">{props?.name}</div></td>
                <td>{props?.stack}</td>
                <td>{(Math.round(((props?.overallRating /20) * 100)* 10))/10}%</td>
                
                {Id?.role === "admin" ? <td><button className="assessment-submit" onClick={()=> makeStudent(props._id)}>Make Student</button></td>: null}
              </tr>
            ))}
            </tbody>
        </table>
        }
      </div>
      </div>
  )
}

export default Alumni