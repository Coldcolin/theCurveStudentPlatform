import React, { useContext, useState } from 'react'
import "./EditProfile.css"
import { BsCamera } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { AuthContext } from '../../Contexts/AuthProvider';
import { FaRegCircleCheck } from "react-icons/fa6";
import axiosInstance from '../../api/axios';

const EditProfile = ({editnow}) => {
  const profile = useSelector((state) => state.Id.Id);
  const {setEditProfile} = useContext(AuthContext)
  const [saved, setSaved] = useState(false)
  const [imageDB, setImageDB] = useState(profile.image)
  const [profileData, setProfileData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    stack: profile.stack,
    image: profile.image
  });
  const confirmSave =()=>{
    setSaved(true)
    setTimeout(() => {
      setEditProfile(false)
    }, 2000);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageDB(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = event.target.result;
        setProfileData({ ...profileData, image });
      };
      reader.readAsDataURL(file);
    }
  };

  // const [disableSaveBtn, setDisableSaveBtn] = useState(true);

  const [loading, setLoading] = useState(false);

  

  const saveChanges = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      
      const data = new FormData();
      data.append("image", imageDB);
      // Only send the image, not the name
      if (profileData.name) {
        data.append("name", profile.name); // Keep the original name
      }

      setLoading(true);
      
      const res = await axiosInstance.patch(`/users/update/${profile.id}`, data, config);
      
      // Update Redux state with only the new image, keep existing name
      dispatch(updateId({ 
        ...profile, // Keep all existing profile data
        image: res.data.data.image // Only update the image
      }));
      
      // Show success message
      confirmSave()
      
      
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Failed to update profile image'
      });
    } finally {
      setLoading(false);
    }
  };

 const editProfile=(e)=>{
  e.preventDefault();
  // console.log("clicked")
  saveChanges();
    editnow()

}


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
            <img src={profileData.image} alt="profile" />
            <input type="file" id="image" onChange={handleImageChange} style={{display: "none"}} />
          </div>
          <label htmlFor="image" className="cameradiv">
            <div className="camera" >
              <BsCamera size={27} color='white'/>
            </div>
          </label>
        </div>
        <form onSubmit={editProfile} className="EditDetails">
        <div className="holdEditInputs">
          <div className="holdnameandemail">
            <input type="text" placeholder={profileData.name} className='Input1' /><input type="email" className='Input2'  placeholder={profileData.email} />
          </div>
          <div className="holdnumberandstack">
            <input type="" placeholder={profileData.phone}  className='Input1' /><input type="text"  className='Input1' placeholder={profileData.stack} />
          </div>
        </div>
          <div className="submitButtons">
            <button disabled={loading} className='transparent' onClick={editnow}>Cancel</button><button disabled={loading} type="submit">{loading ? "Saving..." : "Save Changes"}</button>
          </div>
        </form>
        </div>
      </div> 
      }
      
      
    </div>
  )
}

export default EditProfile