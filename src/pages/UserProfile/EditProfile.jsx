import React, { useContext } from 'react'
import "./EditProfile.css"
import { BsCamera } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { AuthContext } from '../../Contexts/AuthProvider';

const EditProfile = ({toggle}) => {
  const profile = useSelector((state) => state.Id.Id);
  const {setEditProfile} = useContext(AuthContext)



  const Info={
    name:"Decorce Colin",
    email: "decorcecolin@gmail.com",
    phoneNumber: 90789978908,
    stack:"Front-end"
  }
  return (
    <div className='EditProfile'>
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
            <input type="text" placeholder={profile.name} className='Input1' /><input type="email" className='Input2'  placeholder={Info.email} />
          </div>
          <div className="holdnumberandstack">
            <input type="" placeholder={Info.phoneNumber}  className='Input1' /><input type="text"  className='Input1' placeholder={profile.stack} />
          </div>
        </div>
          <div className="submitButtons">
            <button className='transparent' onClick={toggle}>Cancel</button><button>Save Changes</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile