import { useState } from 'react';
import "./Registration.css"
import image from "../../images/Transparent_curve.png"
import avatars from "../../images/for_upload.png"
import sideImage from "../../images/young-woman-with-afro-haircut-wearing-pink-sweater-holding-textbooks 1.png"
import {axiosInstanceSign} from "../../api/axios.js"
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { LiaEyeSolid } from "react-icons/lia";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineCameraAlt } from "react-icons/md";

const REGISTER_URL = "/users/create"

const Registration = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(false)
  const [imageDB, setImageDB] = useState("")
  const [avatar, setAvatar] = useState(avatars);
  const [loading, setLoading] = useState(false);

  const schemaModel = yup.object().shape({
    name: yup.string().required("Please add your name"),
    stack: yup.string().required("Please add your stack"),
    role: yup.string().required("Please add your role"),
    hub: yup.string().required("Please add your hub"),
    cohort: yup.number().required("Please add your cohort"),
    email: yup.string().email().required("Please input your email"),
    phone: yup.string().required("Please input your phone number"),
    password: yup.string().required("Please input your password"),

  });

  const {register, reset, handleSubmit, formState: {errors}} = useForm({ resolver: yupResolver( schemaModel)});

  const File = (e)=>{
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

  const signUp = handleSubmit( async (data) =>{
    try{
      setLoading(true)
      if(!imageDB){
        Toast.fire({
          icon: 'error',
          title: 'Please Add Image'
        })
      }
      const {email, password, stack, name, role, cohort, phone, hub}= data;
      const firstName = name.split(' ')[0];
      localStorage.setItem('firstName', firstName);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("stack", stack);
      formData.append("role", role);
      formData.append("cohort", cohort);
      formData.append("image", imageDB);
      formData.append("hub", hub);
      const config = {
        headers: {
          "content-type": "multipart/formData",
        }
      }
      await axiosInstanceSign.post(REGISTER_URL,formData, config);
      reset();
      Toast.fire({
        icon: 'success',
        title: 'Successfully Signed up'
      })

      navigate("/success")
      setLoading(false)
    }catch(error){
      setLoading(false)
      if(error.response){
        Toast.fire({
          icon:'error',
          title: error.response.data
        })
        // console.log(error.response.status);
        // console.log(error.response.headers);
        // console.log(error.response);
      } else if (error.request){
        console.log(error.request);
      }else {
        console.log("Error", error.message)
      }
    }
  })


  return (
    <div className="reg-main">
      <div className="reg-left">
      <div className="reg-left-image">
          <img src={sideImage} alt="" className='reg-left-image-img'/>
          <img src={image} alt="img" className="reg-right-logo"/>
        </div>
      </div>
      <div className="reg-right">
        <div className="reg-right-form-holder">
        <form className="reg-right-form" type="multipart/form-data" onSubmit={signUp}>
          <div className="reg-avatar-div">
            <img src={avatar} alt="avatar" className="reg-right-avatar" />
            <label className="reg-upload-button" htmlFor="upload"><MdOutlineCameraAlt /></label>
            <input id="upload" type="file" accept="image/*" style={{display: "none"}} onChange={File}/>
          </div>
          <input className="reg-input" placeholder="First Name and Last Name" {...register("name")}/>
          <label style={{color: "red", fontSize: "11px"}}>{errors.name && <p>Please enter the Name.</p>}</label>
          <input className="reg-input" placeholder="Phone Number" {...register("phone")}/>
          <label style={{color: "red", fontSize: "11px"}}>{errors.phone && <p>Please enter the phone number.</p>}</label>
          <input className="reg-input" value={"6"} placeholder="cohort" {...register("cohort")} />
          <label style={{color: "red", fontSize: "11px"}}>{errors.cohort && <p>Please enter the Cohort.</p>}</label>
          <input className="reg-input" placeholder="email" {...register("email")}/>
          <label style={{color: "red", fontSize: "11px"}}>{errors.email && <p>Please enter the email.</p>}</label>
          {/* <input className="reg-input" placeholder="Stack/Role" {...register("stack")}/> */}
          <select className="reg-input" {...register("stack")}>
              <option>-- Select Stack --</option>
              <option>Front End</option>
              <option>Back End</option>
              <option>Product Design</option>
            </select>
            <label style={{color: "red", fontSize: "11px"}}>{errors.stack && <p>Please enter the Stack.</p>}</label>
            <select className="reg-input" {...register("hub")}>
              <option>-- Select Hub --</option>
              <option>Coconut</option>
              <option>Festac</option>
            </select>
            <label style={{color: "red", fontSize: "11px"}}>{errors.hub && <p>Please enter the Hub.</p>}</label>
          <select className="reg-input" {...register("role")}>
              <option>-- Select Role --</option>
              <option>student</option>
              {/* <option>admin</option> */}
              {/* <option>tutor</option> */}
            </select>
          <label style={{color: "red", fontSize: "11px"}}>{errors.stack && <p>Please enter the Role.</p>}</label>

          <div className='login-password-holder'>
          <input className="login-password-input" placeholder="Password" type={view ? "text":"password"} {...register("password")} />
          <div onClick={()=> setView(!view)} className='viewIcon'>{view ? <FaRegEyeSlash />:<LiaEyeSolid />}</div>
          <label style={{color: "red", fontSize: "11px"}}>{errors.password  && <p>Please enter the Password.</p>}</label>
          </div>
          
          <button className={(imageDB && (loading === false)) === true? "reg-signup-button":"reg-signup-button-disabled"} type="submit" disabled={ (imageDB && (loading === false)) === true? false: true}>{(imageDB && (loading === false)) === true? "Sign Up": loading === true? "Signing up...": "Sign up"}</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Registration