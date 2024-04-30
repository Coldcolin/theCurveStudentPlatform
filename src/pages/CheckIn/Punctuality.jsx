import { useNavigate, useParams } from 'react-router-dom';
import './uploadimage.css'
import { MdOutlineHowToVote } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from 'react';

const Punctuality = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("token"))


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

    const getPunctualityInfo= async ()=>{
        try{
            const config = {
                headers: {
                "content-type": "multipart/formData",
                "Authorization": `Bearer ${token}`
                }
            }
            const res = await axios.get(`https://thecurvepuntualityapi.onrender.com/api/v1/studentAttendance/${id}`, config);
            console.log(res)
        }catch(error){
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
    

    // const HandleCheckIn =async()=>{
    //     try{
    //     setCheckInState(true)
    //     const formData = new FormData();
    //     formData.append("latitude", latitude);
    //     formData.append("longitude", longitude);
    //     formData.append("image", imageDB);
    //     const config = {
    //         headers: {
    //         "content-type": "multipart/formData",
    //         "Authorization": `Bearer ${token}`
    //         }
    //     }
    //     await axios.post(`https://thecurvepuntualityapi.onrender.com/api/v1/checkIn`,formData, config);

    //     Toast.fire({
    //         icon: 'success',
    //         title: 'Successfully Signed up'
    //     })
    //     navigate("/")
    //     }catch(error){
    //     if(error.response){
    //         Toast.fire({
    //         icon:'error',
    //         title: error.response.data.message
    //         })
            
    //     } else if (error.request){
    //         console.log(error.request);
    //     }else {
    //         console.log("Error", error.message)
    //     }
    // }
// }
    useEffect(()=>{
        getPunctualityInfo();
    }, [])


    return(
        <div className="uploadwrap">
            <div className="confirm">
                <div className="punctual">
                    <h3>Confirm Punctuality</h3>
                </div>
                <div className="confirmdetails">
                    <div className="detailHold">
                        <div className="pic">
                            <div className="actualImg">
                                <img src="https://media.istockphoto.com/id/1289220781/photo/portrait-of-happy-smiling-woman-at-desk.webp?b=1&s=170667a&w=0&k=20&c=62bR74AXyFUmE9AKfp-9S4rc07lx7xsEFhJ78LroDgw=" alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            <h4>Collin Decore {id}</h4>
                            <p>Monday</p>
                            <p>Server Time in : <span>9:50 pm</span></p>
                            <p>Recomended Rating : <span>100%</span></p>
                        </aside>
                    </div>
                    <div className="detailHold">
                        <div className="pic">
                            <div className="actualImg">
                                <img src="https://media.istockphoto.com/id/1289220781/photo/portrait-of-happy-smiling-woman-at-desk.webp?b=1&s=170667a&w=0&k=20&c=62bR74AXyFUmE9AKfp-9S4rc07lx7xsEFhJ78LroDgw=" alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            <h4>Collin Decore</h4>
                            <p>Monday</p>
                            <p>Server Time in : <span>9:50 pm</span></p>
                            <p>Recomended Rating : <span>100%</span></p>
                        </aside>
                    </div>
                    <div className="detailHold">
                        <div className="pic">
                            <div className="actualImg">
                                <img src="https://media.istockphoto.com/id/1289220781/photo/portrait-of-happy-smiling-woman-at-desk.webp?b=1&s=170667a&w=0&k=20&c=62bR74AXyFUmE9AKfp-9S4rc07lx7xsEFhJ78LroDgw=" alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            <h4>Collin Decore</h4>
                            <p>Monday</p>
                            <p>Server Time in : <span>9:50 pm</span></p>
                            <p>Recomended Rating : <span>100%</span></p>
                        </aside>
                    </div>
                </div>
                <div className="average">
                     <h4>Average Punctuality Score : 100%</h4>
                     <button> <MdOutlineHowToVote /> Acknowledge</button>
                </div>
            </div>
        </div>
    )
}

export default Punctuality