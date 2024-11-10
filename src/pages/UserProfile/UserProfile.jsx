import { useEffect, useState } from 'react';
// import Image from "../../images/SOTW-SOTW.jpg"
import "./UserProfile.css";
import "../CheckIn/uploadimage.css"
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
// import { AuthContext } from "../../Contexts/AuthProvider";
import axiosInstance from "axios";
import { useNavigate } from 'react-router-dom';
import { addId, signOut, updateId } from "../../Contexts/IdReducer.js";
import Loading from '../../components/Loader/Loading.jsx';
import { BsCameraFill, BsGraphDownArrow } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdGrade, MdOutlineArticle } from 'react-icons/md';


const UserProfile = () => {
  const profile = useSelector((state) => state.Id.Id);
  const [ratings, setRatings] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  // console.log(profile.role);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    showConfirmButton: false,
    didOpen: (toast) =>{
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
console.log(profile)
  const getRatings =async()=>{
    try{
      const res = await axiosInstance.get(`https://sotw-app.onrender.com/rating/get/${profile.id}`)
      const rating = res.data.data;
      setRatings(rating);
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

  const getPunctualityInfo= async ()=>{
    try{
        setLoading(true);
        // console.log(profile._id)
        const config = {
            headers: {
            "content-type": "multipart/formData",
            "Authorization": `Bearer ${token}`
            }
        }
        const res = await axiosInstance.get(`https://thecurvepuntualityapi.onrender.com/api/v1/studentAttendance/${profile.id}`, config);
        setDetails(res.data.data);
        setLoading(false);
    }catch(error){
        setLoading(false);
        if(error.response.status === 501){
            dispatch(signOut());
            navigate("/login")
          }
        if(error.response){
            Toast.fire({
            icon:'error',
            title: error.response.data.message
            })
            
        } else if (error.request){
            console.log(error.request);
        }else {
            console.log("Error", error.message)
        }
    }
}
  useEffect(()=>{
    if(profile.role === "student"){
      getRatings();
      getPunctualityInfo();
    }
  }, [])


  const [profileName, setProfileName] = useState(profile.name)
  const [profileImage, setProfileImage] = useState(profile.image)
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [imageDB, setImageDB] = useState("")

  const EditName = (e)=>{
    const newValue = e.target.value;
    setProfileName(newValue);
    if( newValue === ''){
      setDisableSaveBtn(true);
    }else{
      setDisableSaveBtn(false);
    }
  }

  const editImage = (e)=>{
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setImageDB(e.target.files[0]);
    setDisableSaveBtn(false);
 }



 const saveChanges = async ()=>{
  try{
    setDisableSaveBtn(true)
    const config = {
      headers: {
        "content-type": "multipart/formData"
      }
    }
      const data = new FormData();
      data.append("image", imageDB);
      data.append("name", profileName);

      setLoading(true);
        // console.log(profile._id)
        const res = await axiosInstance.patch(`https://sotw-app.onrender.com/users/update/${profile.id}`, data, config)
        setCheckEdit(!checkEdit)
      setLoading(false);
      setCheckEdit(!checkEdit);
      dispatch(updateId({name: res.data.data.name, image: res.data.data.image}))
      Toast.fire({
        icon:'success',
        title: "Update Successful"
        })
      navigate("/user")

      // setProfileImage(res?.data?.image);
      // setProfileName(res?.data?.name);
      setDisableSaveBtn(false)
      setCheckEdit(false)
  }catch(error){
    setLoading(false);
        if(error.response){
            Toast.fire({
            icon:'error',
            title: error.response
            })
            
        } else if (error.request){
            console.log(error.request);
        }else {
            console.log("Error", error.message)
        }
  }
 }


  const cancelChanges = ()=>{
    setProfileName(profile.name)
    setProfileImage(profile.image)
    setDisableSaveBtn(true)
  }
  


  return (
    <main className="user-main">
    <div className="text">Profile</div>
      <div className="user-holder">
      <article className='user-profile-holder'>
    <div className="profileCard">
      <div className="hold-profile-details">
        <div className="pic-and-pen">
          <div className="profile-image-holder">
          <img className='user-image' src={profileImage} alt="profile image" />
          </div>
        </div>
        <div className="name-and-number">
          <h2>{profileName}</h2>
          {/* <p>{profile.email}</p> */}
          <p>Mobile number: +2346056667564</p>
        </div>
        <div className="role-and-stack">
          <>
            {
              profile.role !== "student" ? null : <div className="trainee">{profile.role}</div>
            }
          </>
          <div className="trainee">{profile.stack}</div>
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
      // <div className="viewAttendanceAndAddGrade">
      //   <button className='attend'>View Attendance</button>
      //   <button className='grade'>Add grade</button>
      // </div>
      <div className="GradeShow">
        <div className="gradeshow-card">
          <div className="gradeShowCardIcon">
            <BsGraphDownArrow color='#00893D' size={50}/>
          </div>
          <div className="gradeCardDeets">
            <h2 style={{color:"#00893D", fontSize:"36px"}}>10</h2>
            <p style={{color:"#8B8B8B", fontSize:"12px"}}>Overall Average</p>
          </div>
        </div>
        <div className="gradeshow-card">
          <div className="gradeShowCardIcon">
            <MdOutlineArticle color='#FB8500' size={50}/>
          </div>
          <div className="gradeCardDeets">
            <h2 style={{color:"#FB8500", fontSize:"36px"}}>52</h2>
            <p style={{color:"#8B8B8B", fontSize:"12px"}}>Current Grade</p>
          </div>
        </div>
        <div className="gradeshow-card">
          <div className="gradeShowCardIcon">
            <MdGrade color='#AF52DE' size={50}/>
          </div>
          <div className="gradeCardDeets">
            <h2 style={{color:"#AF52DE", fontSize:"36px"}}>6th</h2>
            <p style={{color:"#8B8B8B", fontSize:"12px"}}>Rating</p>
          </div>
        </div>
        
      </div>

    }
    </>
      </article>
      {
        profile.role !== "student"? null:
        <article className='user-assessment'>
        <div className="hold-grade-header">
        <h2> Grading History</h2>

        <div className="holdFilter">
          <span>Filter </span>
          <FiFilter/>
        </div>
        </div>
        <table style={{width: "100%"}}>
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
          {
            ratings?.map((rating)=>(
              <tr key={rating._id}>
                <td style={{textAlign:"left"}}>{rating.week}</td>
                <td style={{textAlign:"left"}}>{rating.punctuality}</td>
                <td style={{textAlign:"left"}}>{rating.Assignments}</td>
                <td style={{textAlign:"left"}}>{rating.classParticipation}</td>
                <td style={{textAlign:"left"}}>{rating.classAssessment}</td>
                <td style={{textAlign:"left"}}>{rating.personalDefense}</td>
                <td style={{textAlign:"left"}}>{rating.total}</td>
                <td style={{textAlign:"left"}}><BsThreeDotsVertical cursor="pointer"/></td>
            </tr>
            ))
          }
        </table>
      </article>
      }
      </div>
      {
        profile.role !== "student"? null:<div style={{marginTop: "30px", padding:"20px"}}>
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
      </div>
      }
      { profile.role === "student"? <div className="uploadwrap">
            {
                loading ? <Loading/>:<div className="confirm">
                <div className="punctual">
                    <h3>Confirm Check-in</h3>
                    <button className="assessment-submit" style={{margin: 20, paddingBlock: 5}} onClick={()=> navigate(-1)}>Back</button>
                </div>
                <div className="confirmdetails">
                    {
                        details?.length !== 0 ? details.map((e)=>(
                            <div key={e._id} className="detailHold">
                        <div className="pic">
                            <div className="actualImg">
                                <img src={e.image.url} alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            <p>{e.date}</p>
                            <p>Check-in Time : <span>{e.time}</span></p>
                        </aside>
                    </div>
                        )): <div>No Check-in Info</div>
                    }
                </div>
            </div>
            }
        </div>: null}
    </main>
  )
}

export default UserProfile