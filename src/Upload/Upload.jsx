import {useEffect, useState} from 'react'
import './Upload.css'
import { IoCloudUploadOutline,IoImageSharp } from "react-icons/io5";
import {axiosInstancePunc} from "../api/axios.js";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { signOut } from "../Contexts/IdReducer.js";
import {useDispatch, useSelector} from "react-redux";
import { MdDateRange } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import Loading from '../components/Loader/Loading.jsx';

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.Id.Id);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imageDB, setImageDB] = useState("")
  const [avatar, setAvatar] = useState("");
  const [checkInState, setCheckInState] = useState(false);
  const [successfulCheckIn, setSuccessfulCheckIn] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"));

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // const HandleUploadImage = (e)=>{
  //   const file = e.target.files[0];
  //   const save = URL.createObjectURL(file);
  //   setAvatar(save);
  //   setImageDB(file);
  // }

  const HandleUploadImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
  
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);   // for previewing the image
    setImageDB(file);        // actual file for FormData
  };

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

  const HandleCheckIn =async()=>{
    try{
      let url;
      setCheckInState(true)
      const formData = new FormData();
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("image", imageDB);
      const config = {
        headers: {
          // "content-type": "multipart/formData",
          "Authorization": `Bearer ${token}`
        }
      }
      console.log('imageDB:', imageDB);
      console.log('Is file?', imageDB instanceof File);
      // console.log('FormData:', formData);

      // if(profile.stack === "Front End"){
      //   url = "https://the-curve-puntuality-api.vercel.app/api/v1/checkIn"
      // }else{
      //   url = "https://the-curve-puntuality-api.vercel.app/api/v1/checkIn"
      // }
      const response = await axiosInstancePunc.post(`/checkIn`,formData, config);
      console.log(response)

      Toast.fire({
        icon: 'success',
        title: 'Successfully Checked In'
      })
      setSuccessfulCheckIn(true)
      setCheckInState(false)
      navigate("/")

    }catch(error){
      setCheckInState(false)
      setSuccessfulCheckIn(false)
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
        const res = await axiosInstancePunc.get(`/studentAttendance/${profile.id}`, config);
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
  
  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    };

    fetchLocation();
    getPunctualityInfo()
  }, []);

  // useEffect(()=>{
  //   console.log("longitude:", longitude, "latitude", latitude)
  // }, [longitude, latitude])
  const attendance =
  [
    {
      checkinDate: "16th, october 2024",
      checkIntime: "14:00",
      punctualityCode: "early",
      word:"Early"
    },
    {
      checkinDate: "16th, october 2024",
      checkIntime: "14:00",
      punctualityCode: "early",
      word:"Early"
    },
    {
      checkinDate: "16th, october 2024",
      checkIntime: "14:00",
      punctualityCode: "late",
      word:"Late"
    },
    {
      checkinDate: "16th, october 2024",
      checkIntime: "14:00",
      punctualityCode: "late",
      word:"Late"
    },
    {
      checkinDate: "16th, october 2024",
      checkIntime: "14:00",
      punctualityCode: "absent",
      word:"Absent"
    }
  ]

  return (
    <div className='Uploadbody'>
      <div className="UploadHeader">
        <h3>Check In</h3>
      </div>
      <div className="HoldCheckIn-attendanceHistory">
        <div className="holdUploadBox">
          <div className="uploadBox">
            <div className="hold-upload-date">
            <MdDateRange size={21} />
            <h3 style={{fontSize:"16px", fontWeight:"100"}}>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            </div>
            <div className="main-upload">
              {
                avatar === "" ?
                <div className="main-upload-items">
                <div className="cloud">
                <BsCloudUpload size={55} color='#FF9101' className='iconcloud'/>
                <p>Supported media below JPG or PNG</p>
                </div>
                <div className="drag-browse">
                  <p>Drag or drop here <br/> Or</p>
                  <label htmlFor="browse" id='browse-label'>Browse Images</label>
                  <input type="file" id='browse' accept='image/*' hidden onChange={HandleUploadImage}/>
                </div>

              </div>
              :
                <div className="beforeCheckIn">
                  <div className="Hold-checkingIn-ImageContainer">
                    <div className="holdCheckInImage">
                    <img src={avatar} alt="avatar"/>
                    </div>
                  </div>
                <>
                {
                  successfulCheckIn ?
                  <button className="Check-in-button" style={{background:"green", gap:"10px" ,display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", color:"white"}}>Checked In <FaCheck size={20} color='White'/> </button>:
                  <>
                  { checkInState === false?<button className="Check-in-button" onClick={HandleCheckIn} disabled={avatar === ""? true: false}>Check In</button>: <button className="Check-in-button" disabled={true}>Checking In...</button>}
                  </>
                }
                </>
                
              </div>
              
              }
            </div>
          </div>
        </div>
        <div className="holdAttendanceHistory">
          <div className="attendance-history">
            <h3 style={{fontSize:"25px", fontWeight:"100"}}>
            Attendance History
            </h3>
            <div className="attendance-history-main">
              {
                details.map((e, i)=>(
                  <div key={i} className="punctuality-card">
                    <div className="punctuality-card-header">
                    <div className="hold-punctuality-card-date">
                      <MdDateRange size={21} />
                      <h3 style={{fontSize:"16px",color:"#34393C", fontWeight:"100"}}>
                      {e.date}
                      </h3>
                    </div>
                    <div 
          className="codePunctuality" 
          id={e.time < "09:45" ? "late" : "early"}
        >
          {e.time < "09:45" ? "Late" : "Early"}
        </div>
                    </div>
                    <div className="punctuality-card-body">
                      <p style={{color:"#34393C"}}>Check-in Time</p>
                      <h3 style={{color:"#34393C"}}>{e.time}</h3>
                    </div>
                  </div>
                ))
              }
              


              {/* { profile.role === "student"? <div className="uploadwrap">
            {
                loading ? <Loading/>:
                <div className="confirm">
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
                        ))
                        : <div>No Check-in Info</div>
                    }
                </div>
            </div>
            }
        </div>: null} */}

            </div>
          </div>
        </div>
      </div>
      {/* <div className='UploadHold'>
        <section className='UploadContainer'>
          <div className='UploadIcon'>
          {avatar === ""? <IoCloudUploadOutline className='Uploadic' />: <img src={avatar} alt="avatar"/>}
          {avatar === ""? <p>Upload Picture</p>: null}
          </div>
          <div className='UploadSection'>
            <div className="UploadHeadText">
              {avatar === ""?<p>Supported Media Below </p>: null}
            </div>
            <div className="UploadProperties">
              {avatar === ""?<div className='UploadImageContain'>
               <div className="UploadImagecontext">
               <IoImageSharp className='IconOne'/>
                <IoImageSharp className='IconTwo'/>
               </div>
                <div className='UploadTextImage'>
                  <p>JPG</p>
                  <p>PNG</p>
                </div>
              </div>: null}
            <div className='UploadBtn'>
            <label className="button" htmlFor="upload">Browse Image</label>
              <input type="file" id="upload" accept="image/*" onChange={HandleUploadImage} style={{display: "none"}}  />
              { checkInState === false?<button className="button" onClick={HandleCheckIn} disabled={avatar === ""? true: false}>Check In</button>: <button className="button" disabled={true}>Checking In...</button>}
            </div>
            </div>
          </div>
        </section>
      </div> */}
    </div>
  )
}

export default Upload