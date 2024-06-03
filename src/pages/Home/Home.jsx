import React, { useEffect, useState, useMemo } from 'react';
import "./Home.css";
import {FaGraduationCap} from "react-icons/fa";
import {FaChalkboardTeacher} from "react-icons/fa"
import {HiOutlineUserGroup} from "react-icons/hi"
import {FaUserGraduate} from "react-icons/fa"
import giffy from "../../images/loader.gif";
import {NavLink} from "react-router-dom";
import Loader from "./Loader.jsx"
import axios from "../../api/axios";
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

    const getRes = async()=>{
      try{
        setLoadingRes(true)
        const rest = await axios.get(SOTWBE_URL);
        const res = await axios.get(SOTWFE_URL)
        const resp = await axios.get(SOTWPD_URL)

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
        const allBest = await axios.get(ALLSOTWBE_URL);
        const allFest = await axios.get(ALLSOTWFE_URL);
        const allPest = await axios.get(ALLSOTWPD_URL);

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
    
    const resAll = await axios.get(ALL_USERS);

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
      <main className="sotw-container">
      <h2 className="h2">Students of the Month</h2>
        <section className="sotw-top">
          <div className="image-holder">
              {
                loadingRes === true ? <div className="sotw-sotw-be"><Loader/></div> : someError && (loadingRes === false) ? <div className="sotw-sotw-be"><p>No Student yet</p></div>: loadingRes === false? <div className="sotw-sotw-be">
                <img className="sotw-image" src={SOTWFE?.image} alt="img"/>
                <div className= "sotw-image-info">
                <p className="sotw-image-info-h3">{SOTWFE?.name}</p>
                <p className="sotw-image-info-p">Frontend Developer</p>
                </div>
              </div>: null
              }
          
              {
                loadingRes === true ? <div className="sotw-sotw-fe"><Loader/></div>: someError && (loadingRes === false) ? <div className="sotw-sotw-fe"><p>No Student yet</p></div> :loadingRes === false? <div className="sotw-sotw-fe">
                <img className="sotw-image" src={SOTWBE?.image} alt="img"/>
                <div className= "sotw-image-info">
                <p className="sotw-image-info-h3">{SOTWBE?.name}</p>
                <p className="sotw-image-info-p">Backend Developer</p>
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
                  <div className="sotw-circle-2"><FaGraduationCap/></div>
                  <div className="sotw-info">
                    <div>{memoizedVal.length}</div>
                    <span>Students</span>
                  </div>
                </div>}
              </NavLink>
              <NavLink to="tutors" className="sotw-navs">
                {loading ? <div className="sotw-boxes"><img src={giffy} alt="giffy"/></div>:<div className="sotw-boxes">
                  <div className="sotw-circle-3"><FaChalkboardTeacher/></div>
                  <div className="sotw-info">
                    <div>{allTutor.length}</div>
                    <span>Staff</span>
                  </div>
                </div>}
              </NavLink>
              <NavLink to="alumni" className="sotw-navs">
                {loading ? <div className="sotw-boxes"><img src={giffy} alt="giffy"/></div>:<div className="sotw-boxes">
                  <div className="sotw-circle-1"><FaUserGraduate/></div>
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
                hist === 1? allSOTWFE?.map((props)=>(
                  <tr key={props?._id}>
                    <td>{props?.week}</td>
                    <td>{props?.student?.name}</td>
                    <td className={colorCode(props?.student?.overallRating)}>{(Math.round(((props?.student?.overallRating /20) * 100)* 10))/10}%</td>
                    <td className={colorCode(props?.student?.weeklyRating)}>{(Math.round(((props?.student?.weeklyRating /20) * 100)* 10))/10}%</td>
                  </tr>
                )): hist === 2? allSOTWBE?.map((props)=>(
                  <tr key={props?._id}>
                    <td>{props?.week}</td>
                    <td>{props?.student?.name}</td>
                    <td className={colorCode(props?.student?.overallRating)}>{(Math.round(((props?.student?.overallRating /20) * 100)* 10))/10}%</td>
                    <td className={colorCode(props?.student?.weeklyRating)}>{(Math.round(((props?.student?.weeklyRating /20) * 100)* 10))/10}%</td>
                  </tr>
                )): hist === 3? allSOTWPD?.map((props)=>(
                  <tr key={props?._id}>
                    <td>{props?.week}</td>
                    <td>{props?.student?.name}</td>
                    <td className={colorCode(props?.student?.overallRating)}>{(Math.round(((props?.student?.overallRating /20) * 100)* 10))/10}%</td>
                    <td className={colorCode(props?.student?.weeklyRating)}>{(Math.round(((props?.student?.weeklyRating /20) * 100)* 10))/10}%</td>
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
  )
}

export default Home