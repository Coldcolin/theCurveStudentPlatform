import { useNavigate, useParams } from 'react-router-dom';
import './uploadimage.css'
import { MdOutlineHowToVote } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import Loading from '../../components/Loader/Loading';
import { useDispatch } from 'react-redux';
import { signOut } from "../../Contexts/IdReducer.js";

const Punctuality = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [details, setDetails] = useState([])
    const token = JSON.parse(localStorage.getItem("token"))
    const [loading, setLoading] = useState(false)
    const [averagePunctualityScore, setAveragePunctualityScore] = useState(null)
    const [ImageModal, setImageModal] = useState(null)


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
            setLoading(true)
            const config = {
                headers: {
                "content-type": "multipart/formData",
                "Authorization": `Bearer ${token}`
                }
            }
            const res = await axios.get(`https://thecurvepuntualityapi.onrender.com/api/v1/studentAttendance/${id}`, config);
            setDetails(res.data.data);
            setAveragePunctualityScore(res.data.averagePunctualityScore)
            setLoading(false);
        }catch(error){
            setLoading(false);
            if(error.response.status === 501){
                dispatch(signOut());
                navigate("/login")
              }
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
            const config = {
                headers: {
                "authorization": `Bearer ${token}`
                }
            }

            const Toaster = await Swal.fire({
                title: 'Acknowledge and Delete info?',
                text: `This cannot be revoked`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FFB703',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              })
              if(Toaster.isConfirmed){
                await axios.delete(`https://thecurvepuntualityapi.onrender.com/api/v1/deleteCheckInfullWeek/${id}`,{}, config);
                  
                Toast.fire({
                    icon: 'success',
                    title: 'Successfully acknowledged'
                })
                navigate(-1)
              }
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
            {
                loading ? <Loading/>:<div className="confirm">
                <div className="punctual">
                    <h3>Confirm Punctuality</h3>
                    <button className="assessment-submit" style={{margin: 20, paddingBlock: 5}} onClick={()=> navigate(-1)}>Back</button>
                </div>
                <div className="confirmdetails">
                    {
                        details?.length !== 0 ? details.map((e)=>(
                            <div key={e._id} className="detailHold">
                        <div className="pic" onClick={()=> setImageModal(e.image.url)}>
                            <div className="actualImg">
                                <img src={e.image.url} alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            
                            <p>{e.date}</p>
                            <p>Server Time in : <span>{e.time}</span></p>
                            <p>Recommended Rating : <span>{e.punctualityScore}</span></p>
                        </aside>
                    </div>
                        )): <div>No Punctuality Info</div>
                    }
                </div>
                <div className="average">
                     {details && <h4>Average Punctuality Score : {averagePunctualityScore}</h4>}
                     <button onClick={acknowledge}> <MdOutlineHowToVote /> Acknowledge</button>
                </div>
            </div>
            }
             {ImageModal && (
        <div className="modal-backdrop">
            <div className="modal-content">
                <span className="modal-close" onClick={() => setImageModal(null)}>&times;</span>
                <img src={ImageModal} alt="Modal" />
            </div>
        </div>
    )}
        </div>
    )
}

export default Punctuality