import { useNavigate, useParams } from 'react-router-dom';
import './uploadimage.css'
import { MdOutlineHowToVote } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';

const Punctuality = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [details, setDetails] = useState(null)
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
            setDetails(res.data)
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
    

    const acknowledge =async()=>{
        try{
        
        const formData = new FormData();
        
        const config = {
            headers: {
            "authorization": `Bearer ${token}`
            }
        }
        await axios.delete(`https://thecurvepuntualityapi.onrender.com/api/v1/deleteCheckInfullWeek/${id}`,formData, config);

        Toast.fire({
            icon: 'success',
            title: 'Successfully acknowledged'
        })
        navigate(-1)
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
    useEffect(()=>{
        getPunctualityInfo();
    }, [])


    return(
        <div className="uploadwrap">
            <div className="confirm">
                <div className="punctual">
                    <h3>Confirm Punctuality</h3>
                    <button className="assessment-submit" style={{margin: 20, paddingBlock: 5}} onClick={()=> navigate(-1)}>Back</button>
                </div>
                <div className="confirmdetails">
                    {
                        details !== null? details.data.map((e)=>(
                            <div key={e._id} className="detailHold">
                        <div className="pic">
                            <div className="actualImg">
                                <img src={e.image.url} alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            {/* <h4>Collin Decore {id}</h4> */}
                            <p>{e.date}</p>
                            <p>Server Time in : <span>{e.time}</span></p>
                            <p>Recommended Rating : <span>{e.punctualityScore}</span></p>
                        </aside>
                    </div>
                        )): <div>No Punctuality Info</div>
                    }
                </div>
                <div className="average">
                     {details && <h4>Average Punctuality Score : {details.averagePunctualityScore}</h4>}
                     <button onClick={acknowledge}> <MdOutlineHowToVote /> Acknowledge</button>
                </div>
            </div>
        </div>
    )
}

export default Punctuality