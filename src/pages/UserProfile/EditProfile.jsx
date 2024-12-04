import React, { useContext, useState } from 'react'
import "./EditProfile.css"
import { BsCamera } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { AuthContext } from '../../Contexts/AuthProvider';
import { FaRegCircleCheck } from "react-icons/fa6";

const EditProfile = ({editnow}) => {
  const profile = useSelector((state) => state.Id.Id);
  const {setEditProfile} = useContext(AuthContext)
  const [saved, setSaved] = useState(false)

  const confirmSave =()=>{
    setSaved(true)
    setTimeout(() => {
      setEditProfile(false)
    }, 2000);
  }


  // const Info={
  //   name:"Decorce Colin",
  //   email: "decorcecolin@gmail.com",
  //   phoneNumber: 90789978908,
  //   stack:"Front-end"
  // }
  return (
    <div className='EditProfile'>
      {
        saved ?
        <div className="confirmedModal">
        <FaRegCircleCheck color='#1EBF74' size={140}/>
        <p>Your profile has been updated</p>
      </div>
      :
       <div className="editProfileModal">
        <div className="inner-edit-container">
          <div className="headerEdit">
            <h3>Update Profile</h3>
          </div>
        <div className="holdEditImage">
          <div className="editImageHolder">
            <img src={profile.image} alt="profile" />
          </div>
          <div className="cameradiv">
            <div className="camera" >
              <BsCamera size={27} color='white'/>
            </div>
          </div>
        </div>
        <form action="" className="EditDetails">
        <div className="holdEditInputs">
          <div className="holdnameandemail">
            <input type="text" placeholder={profile.name} className='Input1' /><input type="email" className='Input2'  placeholder={profile.email} />
          </div>
          <div className="holdnumberandstack">
            <input type="" placeholder={profile.phone}  className='Input1' /><input type="text"  className='Input1' placeholder={profile.stack} />
          </div>
        </div>
          <div className="submitButtons">
            <button className='transparent' onClick={editnow}>Cancel</button><button onClick={confirmSave}>Save Changes</button>
          </div>
        </form>
        </div>
      </div> 
      }
      
      
    </div>
  )
}

export default EditProfile