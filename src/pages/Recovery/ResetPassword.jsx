import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import "./Forgot.css"
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
    const schemaModel = yup.object().shape({
        token: yup.string().required("Please pass your token"),
        password: yup.string().required("Please pass your token"),
        confirmPassword: yup.string().required("Please re-type your password").oneOf([yup.ref("password")], "Passwords does not match")
      });
      const {register, reset, handleSubmit, formState: {errors}} = useForm({ resolver: yupResolver( schemaModel)});
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
    
      const resetPassword = handleSubmit( async (data) =>{
        setLoading(true)
        try{
          const {token, password}= data;
          const res = await axios.patch(`/users/reset/${id}`, {token: token, password: password});
          
          Toast.fire({
            icon: 'success',
            title: res?.message
          })
          reset();
          setLoading(false)
          navigate("/login")
        }catch(error){
          setLoading(false)
          Toast.fire({
            icon:'error',
            title: "reset Failed"
          })
          if(error.response){
            Toast.fire({
              icon:'error',
              title: "reset Failed"
            })
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request){
            console.log(error.request);
          }else {
            console.log("Error", error.message)
          }
        }
      })
  return (
    <div className='Container'>
      <div className='formContainer'>
        <h2 className='Title'>Reset Password</h2>
        {/* <p>Enter your email address to reset your password.</p> */}
        <form onSubmit={resetPassword}>
          {/* <input className='input' type="email" placeholder="Email" /> */}
          <input className='input' type="text" placeholder="token" {...register("token")}/>
          <label style={{color: "red", fontSize: "11px"}}>{errors.token && <p>Please enter your token.</p>}</label>
          <input className='input' type="password" placeholder="new password" {...register("password")}/>
          <label style={{color: "red", fontSize: "11px"}}>{errors.password && <p>Please enter your password.</p>}</label>
          <input className='input' type="password" placeholder="confirm password" {...register("confirmPassword")}/>
          <label style={{color: "red", fontSize: "11px"}}>{errors.confirmPassword && <p>Passwords does not match.</p>}</label>
          <button className='Reset-signup-button' type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword