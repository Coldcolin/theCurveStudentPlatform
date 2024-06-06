import { useEffect, useState } from 'react';
// import Image from "../../images/SOTW-SOTW.jpg"
import "./UserProfile.css";
import "../CheckIn/uploadimage.css"
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
// import { AuthContext } from "../../Contexts/AuthProvider";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { signOut } from "../../Contexts/IdReducer.js";
import Loading from '../../components/Loader/Loading.jsx';
import { BsCameraFill } from "react-icons/bs";


const UserProfile = () => {
  const profile = useSelector((state) => state.Id.Id);
  const [ratings, setRatings] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  console.log(profile.role);
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

  const getRatings =async()=>{
    try{
      const res = await axios.get(`https://sotw-app.onrender.com/rating/get/${profile.id}`)
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
        const res = await axios.get(`https://thecurvepuntualityapi.onrender.com/api/v1/studentAttendance/${profile.id}`, config);
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
  const [disableSaveBtn, setDisableSaveBtn] = useState(true)

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
    setProfileImage(URL.createObjectURL(e.target.files[0]))
    setDisableSaveBtn(false);
 }


 const saveChanges = (e)=>{
    e.preventDefault();
    const data = new FormData();
      data.append("image", profileImage);
      data.append("name", profileName);

 }
  



  return (
    <main className="user-main">
    <div className="text">User Profile</div>
      <div className="user-holder">
      <article className="user-info">
        <div className='user-info-div'>
          <div className='user_image_div'>
            <img className='user-image' src={profileImage} alt="" />
            <input 
              type='file' 
              id='image' 
              hidden
              onChange={ editImage }
             />
            <label className='user_camera' htmlFor='image'><BsCameraFill style={{width: '70%', height: '70%' }} /></label>
          </div>
          <div className="user-detail">
            <div className='user_name_div'>
              <p className="user-name">Name</p>
              <input 
                className='user_name_input' 
                type='text' 
                value={profileName}
                onChange={ EditName }
              />
            </div>
            <p className='user-talk'>{profile.email}</p>
            {/* <p className='user-talk'>Phone: {profile.phone}</p> */}
            <p className='user-talk'>Role: {profile.role}</p>
            <button 
              className='update_profile' 
              disabled={disableSaveBtn} 
              style={ disableSaveBtn ? { backgroundColor: "rgb(157, 157, 177)"} : { backgroundColor: "black" } }
              onClick={ saveChanges }
            >Save Changes</button>
          </div>
        </div>
      </article>
      {
        profile.role !== "student"? null:<article className='user-assessment'>
        <p>Your Assessment History</p>
        <table style={{width: "100%"}}>
          <tr className="user-table-head">
            <th>WK </th>
            <th>PTY</th>
            <th>ASS</th>
            <th>ATT</th>
            <th>CLASS A</th>
            <th>P D</th>
            <th>AV. TOTAL 100%</th>
          </tr>
          {
            ratings?.map((props)=>(
              <tr key={props._id}>
                <td>{props.week}</td>
                <td>{props.punctuality}</td>
                <td>{props.Assignments}</td>
                <td>{props.classParticipation}</td>
                <td>{props.classAssessment}</td>
                <td>{props.personalDefense}</td>
                <td>{props.total}</td>
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