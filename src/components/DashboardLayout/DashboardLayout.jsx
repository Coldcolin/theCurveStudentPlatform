import {NavLink, Outlet, useParams} from "react-router-dom";
import {AuthContext} from "../../Contexts/AuthProvider";
import {useContext} from 'react'
import "./DashboardLayout.css"
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import Side from "../Sidebar/Side";
import EditProfile from "../../pages/UserProfile/EditProfile";


const DashboardLayout = () => {
    const { showSide, toggleSide } = useContext(AuthContext)
  return (
    <div className="body">
        {
            editProfile  ?
        <div className="displayEditProfile">
        <EditProfile  />
        </div>
        :
        null
        }
        <div className="sidebar">
            <Sidebar/>
        </div>
        <div className="dashboard">
            <div className="navbar">
            <Navbar />
            {showSide ? <Side toggle={toggleSide}/>: null }
            </div>
            <div className="main-content">
            <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout

{/* <Routes>
            <Route path="/" element={<StudentOTW/>}/>
            <Route element={<TutorAuth />}>
                <Route path="assessment" element={<Assessment/>}/>
            </Route>
            <Route element={<RequireAuth />} >
                <Route path="voting" element={<Voting/>}/>
                <Route path="user" element={<UserProfile/>}/>
                <Route path="alumni" element={<Alumni/>}/>
                <Route path="detail/:id" element={<Detail/>}/>
            </Route>
            
            <Route path="users" element={<AllUsers/>}/>
            <Route path="students" element={<AllStudents/>}/>
            <Route path="tutors" element={<Tutors/>}/>
        </Routes> */}