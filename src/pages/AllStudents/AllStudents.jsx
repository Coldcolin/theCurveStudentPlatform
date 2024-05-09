import { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../api/axios"
// import {AuthContext} from '../../Contexts/AuthProvider';
import { useQuery, gql } from '@apollo/client';
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
import "../AllUsers/AllUsers.css"
import "../Assessment/Assessment.css"
import Loading from '../../components/Loader/Loading';


const GET_USERS = gql`
  query getClients {
    users {
      id
      name
      role
      overallRating
      stack
      image
    }
  }
`;

const AllStudents = () => {
  // const {saveUser} = useContext(AuthContext);
  const Id = useSelector((e)=> e.Id.Id);
  const { loading, error, data } = useQuery(GET_USERS);


  const navigate = useNavigate();
  const [load, setLoad] = useState(false)
  
  
  const [user, setUser] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [backUpStudents, setBackUpStudents] = useState([]);
  const [frontStudents, setFrontStudents] = useState([]);
  const [backStudents, setBackStudents] = useState([]);
  const [productStudents, setProductStudents] = useState([]);
  const [stack, setStack] = useState(1)

  const getUsers =async()=>{
    try{
      setLoad(true)
      // const res = await axios.get(allStuds)
      const user = await data?.users;
      const filteredUsers = await user.filter((e)=> e.role === "student");
      const Front = await filteredUsers.filter((e)=> e.stack === "Front End");
      const Back = await filteredUsers.filter((e)=> e.stack === "Back End");
      const Product = await filteredUsers.filter((e)=> e.stack === "Product Design");
      
      const filteredFront = Front.sort((a, b)=> b.overallRating - a.overallRating);
      const filteredBack = Back.sort((a, b)=> b.overallRating - a.overallRating);
      const filteredProduct = Product.sort((a, b)=> b.overallRating - a.overallRating);
      const sortedUsers = filteredUsers.sort((a, b)=> b.overallRating - a.overallRating)
      // setUsers(filteredUsers)
      
      // const back = filteredUsers.filter(i => i.stack === "Back End");
      // const front = filteredUsers.filter(i => i.stack === "Front End");
      // console.log(backEnd)
      setAllStudents(sortedUsers)
      setBackUpStudents(sortedUsers)
      setFrontStudents(filteredFront)
      setBackStudents(filteredBack)
      setProductStudents(filteredProduct)
      // console.log(allStudents)
      setLoad(false);
      
    }catch(error){
      if (error.response) {
        console.log(error);
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
  const deleteUser =async(id)=>{
    try{
      const Toast = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      
      if(Toast.isConfirmed){
        await axios.delete(`/users/remove/${id}`)
        Swal.fire(
                'Deleted!',
                'Student has been removed.',
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

  const makeAlumni =async(id)=>{
    try{
      const Toast = await Swal.fire({
        title: 'Make Alumni?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, continue'
      })
      
      if(Toast.isConfirmed){
        await axios.patch(`/users/alumni/${id}`)
        Swal.fire(
                'Done!',
                'Student is now an Alumni.',
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

  // const studentSearch=()=>{
  //   const searchedArray = allStudents.filter((i)=> {
  //     const name = i.name.toLowerCase()
  //     const value = user.toLowerCase()
  //     return name.includes(value)
  //   } )
  //   setAllStudents(searchedArray)
  // }
  // useEffect(()=>{
  //   studentSearch()
  // },[user])
 
  useEffect(()=>{
    getUsers()
  }, [data])
  // console.log(data?.users)

  const colorCode = (value) => {
    if (value <= 10) {
      return 'low';
    } else if (value <= 14) {
      return 'medium';
    } else if (value <= 17){
      return 'good';
    } else {
      return "high"
    }
  };
  
  return (
    <div className="all-body">
      <div className="all-head">
      {loading? <div><h1>Loading Students...</h1></div>:<div className="all-head-holder">
      {/* <input placeholder="Search Students" type="search" className="searchInput" value={user} onChange={(e)=> setUser(e.target.value)}/> <button  className="searchButton" onClick={()=> setAllStudents(backUpStudents)}>Reset</button> */}
              <div className='Stack-buttons-holder'>
                <div className='Stack-buttons'>
                  <div className={stack === 1?'front-button active': 'front-button'} onClick={()=> setStack(1)}>Frontend</div>
                  <div className={stack === 2?'back-button active': 'back-button'} onClick={()=> setStack(2)}>Backend</div>
                  <div className={stack === 3?'product-button active': 'product-button'} onClick={()=> setStack(3)}>Product</div>
                </div>
              </div>
      </div>
      }
            
      </div>
      <div className="all-user-info">
        {
          loading? <div>
            <Loading/>
          </div>:
          <table className="assessment-table-holder">
          
          <thead>
          <tr className="assessment-table">
            <th className="assessment-table-title"></th>
            <th className="assessment-table-title">NAME</th>
            <th className="assessment-table-title">STACK</th>
            <th className="assessment-table-title">OVERALL SCORE</th>
          </tr>
          </thead>
            <tbody>
              {
                stack === 1 ? frontStudents?.map((student)=>(
              <tr className="assessment-user-info" key={student?.id}>
                <td><Link to={`/detail/${student.id}`}><img src={student?.image} alt="imae" className="assessment-image"/></Link></td>
                <td><div onClick={()=> navigate(`/detail/${student.id}`)} className="assessment-item">{student?.name}</div></td>
                <td>{student?.stack}</td>
                {student.overallRating? <td className={colorCode(student?.overallRating)}>{(Math.round(((student?.overallRating /20) * 100)* 10))/10}%</td> : <td>0%</td>}
                {Id?.role === "admin"? <td><button className="all-delete" onClick={()=> deleteUser(student.id)}>Delete</button></td>: null}
                {(Id?.role === "tutor" || Id?.role === "admin")? <td><button className="all-submit" onClick={()=> makeAlumni(student.id)}>Make Alumni</button></td>: null}
              </tr>
            )): stack === 2? backStudents?.map((student)=>(
              <tr className="assessment-user-info" key={student?.id}>
                <td><Link to={`/detail/${student.id}`}><img src={student?.image} alt="imae" className="assessment-image"/></Link></td>
                <td><div onClick={()=> navigate(`/detail/${student.id}`)} className="assessment-item">{student?.name}</div></td>
                <td>{student?.stack}</td>
                {student?.overallRating? <td className={colorCode(student?.overallRating)}>{(Math.round(((student?.overallRating /20) * 100)* 10))/10}%</td> : <td>0%</td>}
                {Id?.role === "admin"? <td><button className="all-delete" onClick={()=> deleteUser(student.id)}>Delete</button></td>: null}
                {(Id?.role === "tutor" || Id?.role === "admin")? <td><button className="all-submit" onClick={()=> makeAlumni(student.id)}>Make Alumni</button></td>: null}
              </tr>
            )): stack === 3? productStudents?.map((student)=>(
              <tr className="assessment-user-info" key={student?.id}>
                <td><Link to={`/detail/${student.id}`}><img src={student?.image} alt="imae" className="assessment-image"/></Link></td>
                <td><div onClick={()=> navigate(`/detail/${student.id}`)} className="assessment-item">{student?.name}</div></td>
                <td>{student?.stack}</td>
                {student.overallRating? <td className={colorCode(student?.overallRating)}>{(Math.round(((student?.overallRating /20) * 100)* 10))/10}%</td> : <td>0%</td>}
                {Id?.role === "admin"? <td><button className="all-delete" onClick={()=> deleteUser(student.id)}>Delete</button></td>: null}
                {(Id?.role === "tutor" || Id?.role === "admin")? <td><button className="all-submit" onClick={()=> makeAlumni(student.id)}>Make Alumni</button></td>: null}
              </tr>
            )): null
            }
            </tbody>
            
        </table>
        }
      </div>
      </div>
  )
}

export default AllStudents