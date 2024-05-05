import {useEffect, useState} from 'react'
import './Upload.css'
import { IoCloudUploadOutline,IoImageSharp } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


const Upload = () => {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [imageDB, setImageDB] = useState("")
  const [avatar, setAvatar] = useState("");
  const [checkInState, setCheckInState] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"))

  const HandleUploadImage = (e)=>{
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setAvatar(save);
    setImageDB(file);
  }

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
      setCheckInState(true)
      // const formData = new FormData();
      // formData.append("latitude", latitude);
      // formData.append("longitude", longitude);
      // formData.append("image", imageDB);
      // const config = {
      //   headers: {
      //     "content-type": "multipart/formData",
      //     "Authorization": `Bearer ${token}`
      //   }
      // }
      // await axios.post(`https://thecurvepuntualityapi.onrender.com/api/v1/checkIn`,formData, config);

      // Toast.fire({
      //   icon: 'success',
      //   title: 'Successfully Checked In'
      // })
      // setCheckInState(false)
      // navigate("/")
      setTimeout(()=>{
        Toast.fire({
        icon: 'success',
        title: 'Successfully Checked In'
      })
      setCheckInState(false)
      navigate("/")
      }, 3000)

    }catch(error){
      setCheckInState(false)
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
  }, []);

  useEffect(()=>{
    console.log("longitude:", longitude, "latitude", latitude)
  }, [longitude, latitude])

  return (
    <div className='Uploadbody'>
      <div className="UploadHeader">
        <h3>Upload Image</h3>
      </div>
      <div className='UploadHold'>
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
      </div>
    </div>
  )
}

export default Upload