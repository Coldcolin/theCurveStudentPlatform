import { useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import "./Forgot.css"
import axiosInstance from '../../api/axios';
const FORGOT_URL = "/users/forgot"

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const schemaModel = yup.object().shape({
        email: yup.string().email().required("Please input your email"),
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
    
      const sendMail = handleSubmit( async (data) =>{
        setLoading(true)
        try{
          const {email}= data;
          await axiosInstance.post(FORGOT_URL, {email: email});
          
          Toast.fire({
            icon: 'success',
            title: 'Check your Mail for Instructions'
          })
          reset();
          setLoading(false)
        }catch(error){
          setLoading(false)
          Toast.fire({
            icon:'error',
            title: "Message sending Failed"
          })
          if(error.response){
            Toast.fire({
              icon:'error',
              title: "Message sending Failed"
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
        <h2 className='Title'>Forgot Password</h2>
        <p>Enter your email address to get info on how to reset your password.</p>
        <form onSubmit={sendMail}>
          <input className='input' type="email" placeholder="Email" {...register("email")}/>
          <label style={{color: "red", fontSize: "11px"}}>{errors.email && <p>Please enter your mail.</p>}</label>
          <button className='Reset-signup-button' type="submit">{loading === false?"Get Mail":"Sending Mail..."}</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword