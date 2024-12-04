import React, { useEffect, useState, useMemo } from 'react';
import "./Home.css";
import {FaUserGraduate} from "react-icons/fa";
import {FaChalkboardTeacher} from "react-icons/fa"
import {HiOutlineUserGroup} from "react-icons/hi"
import { GiGraduateCap } from "react-icons/gi";
import giffy from "../../images/loader.gif";
import {NavLink} from "react-router-dom";
import Loader from "./Loader.jsx"
import axiosInstance from "../../api/axios";
import {useSelector, useDispatch} from "react-redux";


const SOTWFE_URL = "/SOW/student"
const ALLSOTWFE_URL = "/SOW/all"
const SOTWBE_URL = "/BSOW/student"
const SOTWPD_URL = "/PSOW/student"
const ALLSOTWBE_URL = "/BSOW/all"
const ALLSOTWPD_URL = "/PSOW/all"
const ALL_USERS = "/users/allusers"


const Home = () => {
    const [SOTWFE, setSOTWFE] = useState([]);
    const [allSOTWFE, setAllSOTWFE] = useState([]);
    const [SOTWBE, setSOTWBE] = useState([]);
    const [SOTWPD, setSOTWPD] = useState([]);
    const [allSOTWBE, setAllSOTWBE] = useState([]);
    const [allSOTWPD, setAllSOTWPD] = useState([]);
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingBF, setLoadingBF] = useState(false)
    const [loadingRes, setLoadingRes] = useState(false)
    const [someError, setSomeError] = useState(false)
    const [hist, setHist] = useState(1)
    const profile = useSelector((state) => state.Id.Id);
    const [currentWeek, setCurrentWeek] = useState(0);

    const [isOnline, setIsOnline] = useState(navigator.onLine);


    useEffect(() => {
      // Define event handlers
      const updateOnlineStatus = () => {
        setIsOnline(navigator.onLine);
      };
  
      // Add event listeners
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
  
      // Cleanup event listeners on unmount
      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
      };
    }, []);


    const getRes = async()=>{
      try{
        setLoadingRes(true)
        const rest = await axiosInstance.get(SOTWBE_URL);
        const res = await axiosInstance.get(SOTWFE_URL)
        const resp = await axiosInstance.get(SOTWPD_URL)

        setSOTWBE(rest.data.data.student);
        setSOTWFE(res.data.data.student);
        setSOTWPD(resp.data.data.student);
        setLoadingRes(false)
      }catch(error){
        setSomeError(true)
        setLoadingRes(false)
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
          console.log(someError, loadingRes)
      }
    }

    const getBF = async()=>{
      try{
        setLoadingBF(true)
        const allBest = await axiosInstance.get(ALLSOTWBE_URL);
        const allFest = await axiosInstance.get(ALLSOTWFE_URL);
        const allPest = await axiosInstance.get(ALLSOTWPD_URL);

        const weeks = allFest.data.data.map(item => item.week);
        const highestWeek = weeks.length > 0 ? Math.max(...weeks) : -1;
        setCurrentWeek(highestWeek + 1);
        // console.log(highestWeek)
        setAllSOTWFE(allFest.data.data);
        setAllSOTWBE(allBest.data.data);
        setAllSOTWPD(allPest.data.data);
        setLoadingBF(false)

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
          setSomeError(true)
      }
    }

const getUsers =async()=>{
    try{
      setLoading(true)
    
    const resAll = await axiosInstance.get(ALL_USERS);

    setAllUsers(resAll.data.data);
    
    setLoading(false)
    
}catch(error){
  setLoading(false)
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
        setSomeError(true)
    }
    }

    const getStats = ()=>{
      return allUsers.filter((i)=> i.role === "student");
    }
    const getTutor = ()=>{
      return allUsers.filter((i)=> i.role === "tutor" || i.role === "admin");
    }
    const getAlumni = ()=>{
      return allUsers.filter((i)=> i.role === "alumni");
    }
    
    const memoizedVal = useMemo(() => getStats(), [allUsers]);
    const allAlumni = useMemo(() => getAlumni(), [allUsers]);
    const allTutor = useMemo(() => getTutor(), [allUsers]);

    useEffect(()=>{
    getUsers();
    getRes();
    getBF();

    }, [])

    const colorCode = (value) => {
      if (value <= 10) {
        return 'low';
      } else if (value <= 14) {
        return 'medium';
      } else if (value <= 17){
        return 'good';
      } else {
        return "high"
      }
    };
  
    
  return (
    <div className="sotw-main">
    <div className="hold-main-container">
    <div className="hold-welcome">
    <h2 style={{color:"#023047"}}>Hi {profile.name}</h2>
    <p style={{color:"#023047"}}>Its week {currentWeek} at The Curve Africa {isOnline ? 'You are online 🎉' : 'You are offline 😔'}</p>
    <hr/>
    </div>
    <main className="sotw-container">
    <h2 className="h2">Students of the Week</h2>
      <section className="sotw-top">
        <div className="image-holder">
            {
              loadingRes === true ? <div className="sotw-sotw-be"><Loader/></div> : someError && (loadingRes === false) ? <div className="sotw-sotw-be"><p>No Student yet</p></div>: loadingRes === false? <div className="sotw-sotw-be">
              <img className="sotw-image" src={SOTWFE?.image} alt="img"/>
              <div className= "sotw-image-info">
              <p className="sotw-image-info-h3">{SOTWFE?.name}</p>
              <p className="sotw-image-info-p">Frontend Trainee</p>
              </div>
            </div>: null
            }
        
            {
              loadingRes === true ? <div className="sotw-sotw-fe"><Loader/></div>: someError && (loadingRes === false) ? <div className="sotw-sotw-fe"><p>No Student yet</p></div> :loadingRes === false? <div className="sotw-sotw-fe">
              <img className="sotw-image" src={SOTWBE?.image} alt="img"/>
              <div className= "sotw-image-info">
              <p className="sotw-image-info-h3">{SOTWBE?.name}</p>
              <p className="sotw-image-info-p">Backend Trainee</p>
              </div>
            </div>: null
            }
            
            {
              loadingRes === true ? <div className="sotw-sotw-pd"><Loader/></div>: someError && (loadingRes === false) ? <div className="sotw-sotw-pd"><p>No Student yet</p></div> :loadingRes === false? <div className="sotw-sotw-pd">
              <img className="sotw-image" src={SOTWPD?.image} alt="img"/>
              <div className= "sotw-image-info">
              <p className="sotw-image-info-h3">{SOTWPD?.name}</p>
              <p className="sotw-image-info-p">Product Designer</p>
              </div>
            </div>: null
            }
            <div className='history-buttons-holder'>
              <p>History</p>
              <div className='history-buttons'>
                <div className={hist === 1?'front-button active': 'front-button'} onClick={()=> setHist(1)}>Frontend</div>
                <div className={hist === 2?'back-button active': 'back-button'} onClick={()=> setHist(2)}>Backend</div>
                <div className={hist === 3?'product-button active': 'product-button'} onClick={()=> setHist(3)}>Product</div>
              </div>
            </div>
            </div>
            <div className="tabs-holder">
              <NavLink to="students" className="sotw-navs">
              {loading ? <div className="sotw-boxes"><img src={giffy} alt="giffy"/></div>:<div className="sotw-boxes">
                <div className="sotw-circle-2"><GiGraduateCap color='#FF9101' size={60}/></div>
                <div className="sotw-info">
                  <div>{memoizedVal.length}</div>
                  <span>Students</span>
                </div>
              </div>}
            </NavLink>
            <NavLink to="tutors" className="sotw-navs">

              {loading ? <div className="sotw-boxes"><img src={giffy} alt="giffy"/></div>:<div className="sotw-boxes">
                <div className="sotw-circle-3"><FaChalkboardTeacher color='#219EBC' size={60}/></div>
                <div className="sotw-info">
                  <div>{allTutor.length}</div>
                  <span>Staff</span>
                </div>
              </div>}
            </NavLink>
            <NavLink to="alumni" className="sotw-navs">
              {loading ? <div className="sotw-boxes"><img src={giffy} alt="giffy"/></div>:<div className="sotw-boxes">
                <div className="sotw-circle-1"><FaUserGraduate color='#179446' size={52}/></div>
                <div className="sotw-info">
                  <div>{allAlumni.length}</div>
                  <span>Alumni</span>
                </div>
              </div>}
            </NavLink>
            </div>
      </section>
      <section className="sotw-middle">
        <div className="image-holders">
        <div className="sotw-history">
          <table className="sotw-table">
            <thead className="sotw-thead">
            <tr>
              <th>WEEK</th>
              <th>NAME</th>
              <th>AVERAGE RATING</th>
              <th>CURRENT RATING</th>
            </tr>
            </thead>
            <tbody>
            {
              hist === 1? allSOTWFE?.map((stud)=>(
                <tr key={stud?._id}>
                  <td>{stud?.week}</td>
                  <td>{stud?.student?.name}</td>
                  <td className={colorCode(stud?.student?.overallRating)}>{(Math.round(((stud?.student?.overallRating /20) * 100)* 10))/10}%</td>
                  <td className={colorCode(stud?.student?.weeklyRating)}>{(Math.round(((stud?.student?.weeklyRating /20) * 100)* 10))/10}%</td>
                </tr>
              )): hist === 2? allSOTWBE?.map((stud)=>(
                <tr key={stud?._id}>
                  <td>{stud?.week}</td>
                  <td>{stud?.student?.name}</td>
                  <td className={colorCode(stud?.student?.overallRating)}>{(Math.round(((stud?.student?.overallRating /20) * 100)* 10))/10}%</td>
                  <td className={colorCode(stud?.student?.weeklyRating)}>{(Math.round(((stud?.student?.weeklyRating /20) * 100)* 10))/10}%</td>
                </tr>
              )): hist === 3? allSOTWPD?.map((stud)=>(
                <tr key={stud?._id}>
                  <td>{stud?.week}</td>
                  <td>{stud?.student?.name}</td>
                  <td className={colorCode(stud?.student?.overallRating)}>{(Math.round(((stud?.student?.overallRating /20) * 100)* 10))/10}%</td>
                  <td className={colorCode(stud?.student?.weeklyRating)}>{(Math.round(((stud?.student?.weeklyRating /20) * 100)* 10))/10}%</td>
                </tr>
              )): null
            }
            </tbody>
          </table>
        </div>
        </div>
      </section>
      
    </main>
    </div>
  </div>
  )
}

export default Home