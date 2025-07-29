import { useEffect, useState } from 'react'
import "./Assessment.css";
import axiosInstance from "../../api/axios"
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Loading from '../../components/Loader/Loading';
import {changeAsses} from "../../Contexts/IdReducer.js"
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch } from 'react-icons/io';
import { TbSlash } from 'react-icons/tb';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const GET_USERS = gql`
  query getClients {
    users {
      id
      name
      role
      stack
      image
      weeklyRating
    }
  }
`;

const ALLSOTWPD_URL = "/PSOW/all"

const Assessment = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const navigate = useNavigate()
  const stack = useSelector((e)=> e.Id.assessState);
  const who = useSelector((e)=> e.Id.Id.role);
  const dispatch = useDispatch()
  // const [punctuality, setPunctuality] = useState(0);
  // const [Assignments, setAssignments] = useState(0);
  // const [personalDefense, setPersonalDefense] = useState(0);
  // const [classParticipation, setClassParticipation] = useState(0);
  // const [classAssessment, setClassAssessment] = useState(0);
  const [week, setWeek] = useState(0);
  // const [show, setShow] = useState(false);
  // const [loadings, setLoading] = useState(false);
  // const [backUpfrontEnd, setBackUpFrontEnd] = useState([]);
  // const [backUpbackEnd, setBackUpBackEnd] = useState([]);
  const [frontEnd, setFrontEnd] = useState([]);
  const [backEnd, setBackEnd] = useState([]);
  const [productD, setProductD] = useState([]);
  // const [front, setFront] = useState("")
  // const [back, setBack] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  // const [stack, setStack] = useState(1)
  const [currentWeek, setCurrentWeek] = useState(0)

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const [gradeInputs, setGradeInputs] = useState({
    punctuality: 0,
    attendance: 0,
    Assignments: 0,
    classAssessments: 0,
    personalDefence: 0
  });

  console.log("this is selectedStudent",selectedStudent)

  // Add this new handler
  const handleGradeClick = (student) => {
    setSelectedStudent(student);
    setIsGradingOpen(true);
  };

  const handleGradeSubmit = async () => {
    try {
      
      await addAssessment(selectedStudent.id, selectedStudent.name);
      setIsGradingOpen(false);
      setSelectedStudent(null);
      setGradeInputs({
        punctuality: 0,
        attendance: 0,
        Assignments: 0,
        classAssessments: 0,
        personalDefence: 0
      });
    } catch (error) {
      console.error(error);
    }
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

 
  const addAssessment = async (id, name) =>{

    const {
      punctuality,
      attendance,
      Assignments,
      classAssessments,
      personalDefence
    } = gradeInputs
    
    try{
      const Toaster = await Swal.fire({
        title: 'Add Assessment?',
        text: `${JSON.stringify({Assignments: Assignments , personalDefense: personalDefence , classParticipation: attendance , punctuality: punctuality , classAssessment: classAssessments})} for week: ${currentWeek} for ${name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFB703',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
      })
      if(Toaster.isConfirmed){
        await axiosInstance.post(`/rating/add/${id}`,{Assignments: Assignments, personalDefense: personalDefence, classParticipation: attendance, punctuality: punctuality, classAssessment: classAssessments, week:currentWeek});
          Toast.fire({
          icon: 'success',
          title: 'Assessment Added'
        })
      }
      
    }catch(error){
      if(error.response){
        Toast.fire({
          icon:'error',
          title: error.response.data.message
        })
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request){
        console.log(error.request);
      }else {
        console.log("Error", error.message)
      }
    }
    finally{
      setSubmitLoading(false);
    }
  }

  const addSOTWFE = async ()=>{
    try{
      if(week !== 0){
        const Toaster = await Swal.fire({
          title: 'Please Confirm',
          text: `Choose Front End SOTW for week: ${week}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFB703',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        })
        if(Toaster.isConfirmed){
          await axiosInstance.post(`/algo/sotwfront/`,{week: week});
          Toast.fire({
            icon: 'success',
            title: 'Student Added'
          })
        }
      }else{
        Toast.fire({
          icon: 'error',
          title: 'Add week'
        })
      }
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
    }

  }
  const addSOTWBE = async ()=>{
    try{
     if(week !== 0){
      const Toaster = await Swal.fire({
        title: 'Please Confirm',
        text: `Choose Back End SOTW for week: ${week}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFB703',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      })
      if(Toaster.isConfirmed){
        await axiosInstance.post(`/algo/sotwback/`,{week: week});
        Toast.fire({
          icon: 'success',
          title: 'Student Added'
        })
      }
     }else{
      Toast.fire({
        icon: 'error',
        title: 'Add week'
      })
     }
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
    }

  }

  const addSOTWPD = async ()=>{
    try{
     if(week !== 0){
      const Toaster = await Swal.fire({
        title: 'Please Confirm',
        text: `Choose Product Design SOTW for week: ${week}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFB703',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      })
      if(Toaster.isConfirmed){
        await axiosInstance.post(`/algo/sotwproduct/`,{week: week});
        Toast.fire({
          icon: 'success',
          title: 'Student Added'
        })
      }
     }else{
      Toast.fire({
        icon: 'error',
        title: 'Add week'
      })
     }
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
    }

  }

  const getUsers =async()=>{
    try{
      const user = await data?.users;
      const filteredUsers = user.filter((e)=> e.role === "student");
      // console.log(user)
      const back = filteredUsers.filter(i => i.stack === "Back End");
      const front = filteredUsers.filter(i => i.stack === "Front End");
      const product = filteredUsers.filter(i => i.stack === "Product Design");

      const allFest = await axiosInstance.get(ALLSOTWPD_URL);

      const weeks = allFest.data.data.map(item => item.week);
      const highestWeek = weeks.length > 0 ? Math.max(...weeks) : 0;
      setCurrentWeek(highestWeek + 1)

      setFrontEnd(front);
      setBackEnd(back);
      setProductD(product)
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
      console.log(error);
    }
  }

  useEffect(()=>{
    getUsers();
  }, [data])
  useEffect(()=>{
    // console.log(who)
    if(who === "student" || who === "alumni"){
      navigate("/")
    }
  }, [])

  const handleViewAssessment = (studentId) => {
  navigate(`/assessment-submition-tutorView/${studentId}`);
};

  return (
    <div className="assessment-content">
      <h1 className='assessment-heading'>Student assessment </h1>
        <div className='assessment-container'>
          
        {loading? <div><h1>Loading Students Info...</h1></div>:
    <div className='Stack-buttons-holder'>
                <div className='Stack-buttons'>
                  <div className={stack === 1?'front-button active': 'front-button'} onClick={()=> dispatch(changeAsses(1))}>Frontend</div>
                  <div className={stack === 2?'back-button active': 'back-button'} onClick={()=> dispatch(changeAsses(2))}>Backend</div>
                  <div className={stack === 3?'product-button active': 'product-button'} onClick={()=> dispatch(changeAsses(3))}>Product</div>
                </div>


                <div className="searchHolder">
                <div className="holdSearchIcon">
                <IoIosSearch size={20} />
                </div>
                <input className='SearchInput' type="text" placeholder='Search' onChange={(e)=> console.log("search")} />
                <div className="holdSortIcon">
                <TbSlash />
                </div>
              </div>
              </div>
    }
      <div className="assessment-top">
      </div>
      <div className="a-table">
      {/* <form > */}
      <table className="assessment-table-holder">
          <thead>
          <tr className="assessment-table">
            <th className="assessment-table-title">IMAGE</th>
            <th className="assessment-table-title">FULL NAME (F/L)</th>
            <th className="assessment-table-title"> WEEK</th>
            <th className="assessment-table-title"> AV %</th>
            <th className="assessment-table-title">View Assessments</th>
          </tr>
          </thead>
            {
              loading? <div><Loading/></div>:<tbody>
            {
              stack === 1? frontEnd.map((student)=>(
              <tr className="assessment-user-info" key={student.id}>
                <td><Link to={`/detail/${student.id}`}><img src={student.image} alt="imae" className="assessment-image"/></Link></td>
                <td><Link to={`/punctuality/${student.id}`}><div className="assessment-item">{student.name}</div></Link></td>
                <td 
      style={{display: "flex", justifyContent: "center", gap:10, cursor: 'pointer'}} 
      onClick={() => handleGradeClick(student)}
    >
      <p>{currentWeek}</p> 
      <span style={{fontSize: 18, color: "green"}}><IoMdCheckmarkCircleOutline /></span>
    </td>
                <td><p>{student.weeklyRating}</p></td>
                <td>
                   <button
                    className="view-assessment-btn"
                    onClick={() => handleViewAssessment(student?.id)}
                  >
                   View Assessments
                  </button>
                </td>
              </tr>
            )): stack === 2? backEnd.map((student)=>(
              <tr className="assessment-user-info" key={student?.id}>
                <td><Link to={`/detail/${student?.id}`}><img src={student?.image} alt="imae" className="assessment-image"/></Link></td>
                <td><Link to={`/punctuality/${student.id}`}><div className="assessment-item">{student.name}</div></Link></td>
                {/* <td><input type="number" className="assessment-input" placeholder="punctuality" defaultValue={punctuality} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setPunctuality("20");
                } else {
                  setPunctuality(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="assignment" defaultValue={Assignments} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setAssignments("20");
                } else {
                  setAssignments(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="Class Assessment"  defaultValue={classAssessment} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setClassAssessment("20");
                } else {
                  setClassAssessment(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="Attendance"  defaultValue={classParticipation} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setClassParticipation("20");
                } else {
                  setClassParticipation(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="Personal Defense"  defaultValue={personalDefense} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setPersonalDefense("20");
                } else {
                  setPersonalDefense(value);
                }}} min="0" max="20"/></td> */}
                {/* <td><input type="number" className="assessment-input" placeholder="week" defaultValue={week} onChange={e => setWeek(e.target.value)}/></td> */}
                <td 
      style={{display: "flex", justifyContent: "center", gap:10, cursor: 'pointer'}} 
      onClick={() => handleGradeClick(student)}
    >
      <p>{currentWeek}</p> 
      <span style={{fontSize: 18, color: "green"}}><IoMdCheckmarkCircleOutline /></span>
    </td>
                <td><p>{student.weeklyRating}</p></td>
                <td>
                   <button
                    className="view-assessment-btn"
                    onClick={() => handleViewAssessment(student?.id)}
                  >
                   View Assessments
                  </button>
                </td>
                {/* <td><button  className="assessment-submit" type="submit" onClick={()=> {addAssessment(student.id, student.name), submit(student.id)}}>{ student.id === submitLoading ? <p>initializing...</p> : <p>Submit</p>}</button></td> */}
              </tr>
            )): stack === 3? productD.map((student)=>(
              <tr className="assessment-user-info" key={student.id}>
                <td><Link to={`/detail/${student.id}`}><img src={student.image} alt="imae" className="assessment-image"/></Link></td>
                <td><Link to={`/punctuality/${student.id}`}><div className="assessment-item">{student.name}</div></Link></td>
                {/* <td><input type="number" className="assessment-input" placeholder="punctuality" defaultValue={punctuality} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setPunctuality("20");
                } else {
                  setPunctuality(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="assignment" defaultValue={Assignments} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setAssignments("20");
                } else {
                  setAssignments(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="Class Assessment"  defaultValue={classAssessment} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setClassAssessment("20");
                } else {
                  setClassAssessment(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="Attendance"  defaultValue={classParticipation} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setClassParticipation("20");
                } else {
                  setClassParticipation(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="Personal Defense"  defaultValue={personalDefense} onChange={(e) => {
                const value = e.target.value;
                if (parseInt(value, 10) > 20) {
                  setPersonalDefense("20");
                } else {
                  setPersonalDefense(value);
                }}} min="0" max="20"/></td>
                <td><input type="number" className="assessment-input" placeholder="week" defaultValue={week} onChange={e => setWeek(e.target.value)}/></td> */}
                <td 
      style={{display: "flex", justifyContent: "center", gap:10, cursor: 'pointer'}} 
      onClick={() => handleGradeClick(student)}
    >
      <p>{currentWeek}</p> 
      <span style={{fontSize: 18, color: "green"}}><IoMdCheckmarkCircleOutline /></span>
    </td>
                <td><p>{student.weeklyRating}</p></td>
                <td>
                   <button
                    className="view-assessment-btn"
                    onClick={() => handleViewAssessment(student?.id)}
                  >
                   View Assessments
                  </button>
                </td>
                {/* <td><button className="assessment-submit" type="submit" onClick={()=> {addAssessment(student.id, student.name), submit(student.id)}}>{ student.id === submitLoading ? <p>initializing...</p> : <p>Submit</p>}</button></td> */}
              </tr>
            )): null
            }
            </tbody>
            }
        </table>      
        </div>
        <div>
        {
          stack === 1? <div style={{marginTop: 20, marginBottom: 20, paddingLeft: 20}}>
            
            <button className="assessment-submit SOTWBE" type="submit" onClick={()=> addSOTWFE()}>Choose SOTW FE</button>
              <input className="assessment-input" placeholder="week" onChange={e => setWeek(e.target.value)}/>
            </div>: stack === 2? <div style={{marginTop: 20, marginBottom: 20, paddingLeft: 20}}>
            <button className="assessment-submit SOTWFE" type="submit" onClick={()=> addSOTWBE()}>Choose SOTW BE</button>
            <input className="assessment-input" placeholder="week" onChange={e => setWeek(e.target.value)}/>
        </div> : <div style={{marginTop: 20, marginBottom: 20, paddingLeft: 20}}>
            <button className="assessment-submit SOTWFE" type="submit" onClick={()=> addSOTWPD()}>Choose SOTW PD</button>
            <input className="assessment-input" placeholder="week" onChange={e => setWeek(e.target.value)}/>
        </div>
        }
        
        </div>

        </div>

        {isGradingOpen && (
        <div className="grading-popup-overlay">
          <div className="grading-popup">
            <h2>Weekly grading for {selectedStudent?.name} week: {currentWeek}</h2>
            <div className="grading-inputs">
            {Object.entries(gradeInputs).map(([key, value]) => (
              <div key={key} className="input-group">
                <input
                  type="number"
                  defaultValue={value}
                  onChange={(e) => setGradeInputs(prev => ({
                    ...prev,
                    [key]: Math.min(20, Number(e.target.value))
                  }))}
                  min="0"
                  max="20"
                />
                <span className='input-span'>{key.charAt(0).toUpperCase() + key.slice(1)}</span>

                {/* Show "View Assessment" only for the 'assessment' input */}
                {/* {key === "Assignments" && (
                  <button
                    className="view-assessment-btn"
                    onClick={() => handleViewAssessment(selectedStudent?.id)}
                  >
                    View Assessment
                  </button>
                )} */}
              </div>
            ))}

            </div>
            <div className="grading-actions">
              <button onClick={() => setIsGradingOpen(false)}>Cancel</button>
              <button onClick={handleGradeSubmit}>Save Grade</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Assessment