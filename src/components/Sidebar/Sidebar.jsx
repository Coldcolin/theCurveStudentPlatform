import "./Sidebar.css"
import {useNavigate, NavLink} from "react-router-dom"
import logo from "../../images/Transparent_curve.png"
import { TbLayoutDashboard } from "react-icons/tb";
import { FiUser } from "react-icons/fi"
import {MdOutlineAssessment} from "react-icons/md"
import {FiLogIn} from "react-icons/fi"
import {MdOutlineLogout} from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import {useSelector, useDispatch} from "react-redux";
import { signOut } from "../../Contexts/IdReducer";
import Swal from 'sweetalert2';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaTasks } from "react-icons/fa";



const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.Id.Id);

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
    <div className="main-sidebar">
      <div className="top">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="navs">
        <NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="/"><TbLayoutDashboard/> <span>Dashboard</span></NavLink>
        <NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="user"> <FiUser/> <span>User Profile</span></NavLink>
        <NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="/upload"> <AiOutlineSchedule /> <span>Check-in</span></NavLink>
        <NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to={`/assessment-submition/${profile.id}`}> <FaTasks /> <span>Assignment Submission</span></NavLink>
        <NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="/message-us"> <IoMdHelpCircleOutline /> <span>Message Us</span></NavLink>
        {profile.role === "tutor"?<NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="assessment"><MdOutlineAssessment/> <span>Student Assessment</span></NavLink>: null}
        {profile.role === "admin"?<NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="assessment"><MdOutlineAssessment/> <span>Student Assessment</span></NavLink>: null}
        {/* {profile.role === "admin" || profile.role === "tutor"?<NavLink className={({ isActive }) => (isActive ? "nav-active" : "navigation")}to="/assessment-submition-tutorView"><MdOutlineAssessment/> <span>Approve student Assessment</span></NavLink>: null} */}
        {
        profile.id !== "" ? <div className="Log-out" onClick={() => {
                dispatch(signOut());
                Toast.fire({
                    icon: 'success',
                    title: 'Logged out successfully'
                })
                navigate("/login")
							}}
      ><MdOutlineLogout/> Logout</div>: <div className="Log-out" style={{color: "black"}} onClick={() =>{navigate("/login")}}
      ><FiLogIn color="black"/> Login</div>
      }
      </div>
      
    </div>
  )
}

export default Sidebar