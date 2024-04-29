import React, {useContext} from 'react';
import "./Side.css"
import image from "../../images/avatar.jpg"
import {useNavigate, NavLink } from "react-router-dom"
import logo from "../../images/Transparent_curve.png"
import { TbLayoutDashboard } from "react-icons/tb";
import { FiUser } from "react-icons/fi"
import {MdOutlineAssessment} from "react-icons/md"
import {MdOutlineLogout} from "react-icons/md";
import {useSelector, useDispatch} from "react-redux";
import { signOut } from "../../Contexts/IdReducer";
import Swal from 'sweetalert2';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineSchedule } from "react-icons/ai";
import {FiLogIn} from "react-icons/fi"
import { AuthContext } from '../../Contexts/AuthProvider';

const Side = ({toggle}) => {
    const dispatch = useDispatch();
    const {saveUser, logOutFunc} = useContext(AuthContext);
  const navigate = useNavigate();
  const profile = useSelector((state) => state.Id.Id);
  const [user, setUser] = React.useState(JSON.parse((localStorage.getItem("SOTWUser"))))

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  return (
    <div className="main-sidebar1" onClick={toggle}>
      <div className="top1">
        <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "space-around"}}>
        <AiOutlineClose/>
        <img src={logo} alt="logo" className="logo1" />
        </div>
       
      </div>
      <div className="navs1">
        <NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="/"><TbLayoutDashboard/> <span>Dashboard</span></NavLink>
        <NavLink className={({ isActive }) => (isActive ? "nav-active1" : "navigation1")}to="user"> <FiUser/> <span>User Profile</span></NavLink>
        <NavLink className={({ isActive }) => (isActive ? "nav-active1" : "navigation1")}to="/upload"> <AiOutlineSchedule /> <span>Check-in</span></NavLink>
        {profile.role === "tutor"?<NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="assessment"><MdOutlineAssessment/> <span>Student Assessment</span></NavLink>: null}
        {/* <NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="voting" ><MdOutlineHowToVote/> <span>Vote</span></NavLink> */}
      </div>
      {
        profile.id !== "" ? <div className="Log-out1" onClick={() => {
                dispatch(signOut());
                Toast.fire({
                    icon: 'success',
                    title: 'Logged out successfully'
                })
                navigate("/login")
							}}
      ><MdOutlineLogout/> Logout</div>: <div className="Log-out1" style={{color: "black"}} onClick={() =>{navigate("/login")}}
      ><FiLogIn color="black"/> Login</div>
      }
    </div>
  )
}

export default Side