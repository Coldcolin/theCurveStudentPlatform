import React, { useEffect, useState, useContext } from 'react';
import "./UserProfile.css";
import {useParams, useNavigate} from "react-router-dom"
import axiosInstance from "axios";
import {AuthContext} from '../../Contexts/AuthProvider';
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
import { LuPencil } from 'react-icons/lu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';

const Detail = () => {
  const {saveUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState();
    const [ratings, setRatings] = useState();
    const profile = useSelector((state) => state.Id.Id);
    const [deleting, setDeleting] = useState()

    const getUser =async()=>{
        try{
          const res = await axiosInstance.get(`https://sotw-app.onrender.com/users/oneUser/${id}`)
          setUser(res.data.data);
          // console.log(res.data.data)
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

      const getRatings =async()=>{
        try{
          const res = await axiosInstance.get(`https://sotw-app.onrender.com/rating/get/${id}`)
          const rating = res.data.data;
          const sortedRatings = rating.sort((a, b)=> a.week - b.week)
          setRatings(sortedRatings);
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

      const onDelete = (week)=>{
        setDeleting(week)
      }

      const deleteRating=async( week)=>{
        try{
          let studentId = user._id;
          // console.log(user._id, week)
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
            await axiosInstance.delete(`https://sotw-app.onrender.com/rating/delete/${studentId}/${week}`)
            Swal.fire(
                    'Deleted!',
                    'Rating has been removed.',
                    'success'
            )
            getUser();
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
        finally{
          setDeleting(false);
        }
      }

      useEffect(()=>{
        getUser()
      },[])
      useEffect(()=>{
        getRatings()
      },[user])

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
    <main className="user-main">
    <div className="text">Profile</div>
    {/* <button className="assessment-submit" style={{margin: 20, paddingBlock: 5}} onClick={()=> navigate(-1)}>Back</button> */}
      <div className="user-holder">
      {
        user? <article className='user-profile-holder'>
    <div className="profileCard">
      <div className="hold-profile-details">
        <div className="pic-and-pen">
          <div className="profile-image-holder">
          <img className='user-image' src={user.image} alt="profile image" />
          </div>
        </div>
        <div className="name-and-number">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Mobile number: +2346056667564</p>
        </div>
        <div className="role-and-stack">
          <>
            {
              user.role !== "student" ? null : <div className="trainee">{user.role}</div>
            }
          </>
          <div className="trainee">{user.stack}</div>
        </div>
      </div>
    <div className="pencil">
      <div className="hold-pencil">
      <LuPencil />
      </div>
    </div>
    </div>
    <>
    {
      profile.role !== "student" ? null :
      <div className="viewAttendanceAndAddGrade">
        <button className='attend'>View Attendance</button>
        <button className='grade'>Add grade</button>
      </div>
      

    }
    </>
      </article>: null
      }
      
      {
        user && user?.stack === "Tutor"? null: ratings? <article className='user-assessment'>
        <div className="hold-grade-header">
        <h2> Grading History</h2>

        <div className="holdFilter">
          <span>Filter </span>
          <FiFilter/>
        </div>
        </div>
        <table style={{width: "100%"}}>
          <thead>
          <tr className="user-table-head">
          <th>Week </th>
            <th>PUNCTUALITY</th>
            <th>ASSIGNMENT</th>
            <th>ATTENDANCE</th>
            <th>CLASS ASS</th>
            <th>PERSONAL DEFENSE</th>
            <th>TOTAL</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            ratings?.map((score)=>(
              <tr key={score._id}>
            <td>{score.week}</td>
            <td className={colorCode(score.punctuality)}>{score.punctuality}</td>
            <td className={colorCode(score.Assignments)}>{score.Assignments}</td>
            <td className={colorCode(score.classParticipation)}>{score.classParticipation}</td>
            <td className={colorCode(score.classAssessment)}>{score.classAssessment}</td>
            <td className={colorCode(score.personalDefense)}>{score.personalDefense}</td>
            <td className={colorCode(score?.total)}>{(Math.round(((score?.total /20) * 100)* 10))/10}%</td>
            <td style={{textAlign:"left"}}><BsThreeDotsVertical cursor="pointer"/></td>

            {(profile?.role === "tutor" || profile?.role === "admin")? <td><button className="assessment-submit" onClick={()=> {deleteRating(score.week), onDelete(score.week)}}>{score.week === deleting ? <p style={{color: "white", background: "none"}}>deleting...</p> : <p style={{color: "white", background: "none"}}>Delete</p>}</button></td>: null}
          </tr>
            ))
          }
          </tbody>
        </table>
      </article>: null
      }
      
      </div>
     {
      (user?.role === "student") || (user?.role === "alumni")?  <div style={{marginTop: "30px", padding:"20px"}}>
      <h4>KEY</h4>
        <p>
        <span style={{fontWeight: "bold"}}>WK:</span> Week,{" "} 
        <span style={{fontWeight: "bold"}}>PTY:</span> Punctuality,{" "}
        <span style={{fontWeight: "bold"}}>ASS:</span> Assignments,{" "}
        <span style={{fontWeight: "bold"}}>ATT:</span> ATTENDANCE,{" "}
        <span style={{fontWeight: "bold"}}>CLASS A:</span> Class Assessment,{" "}
        <span style={{fontWeight: "bold"}}>P D:</span> Personal Defense,{" "}
        <span style={{fontWeight: "bold"}}>AV. TOTAL:</span> Average Total
        </p>
      </div>: null
    }
    </main>
  )
}

export default Detail