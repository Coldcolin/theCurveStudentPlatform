import { useContext} from 'react';
import "./Navbar.css";
// import prof from "../../images/images 3.jpg";
import { AiOutlineMenu } from 'react-icons/ai';
// import { FiShoppingCart } from 'react-icons/fi';
// import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
// import { MdKeyboardArrowDown } from 'react-icons/md';
import {AuthContext} from "../../Contexts/AuthProvider"
import {useSelector, useDispatch} from "react-redux";
import image from "../../images/avatar.jpg"



const Navbar = () => {
  const {toggleSide} = useContext(AuthContext);
  const profile = useSelector((state) => state.Id.Id);


  return (
    <div className="main">
          <div className="menu" onClick={toggleSide}><AiOutlineMenu/></div>
          <div
            onClick={() => {""}}
            className="profile"
          >
            <div className="image">
            {
              profile ? (<div className="nav-user-info">
              {profile.image === ""? (<img className="profile-image" src={image} alt="img" />):(<img className="profile-image" src={profile.image} alt="img" />)}
              <div className="who">
                {/* <p>{profile.name}</p> */}
                {/* <span>{profile.stack}</span> */}
              </div>
            </div>): (<div className="user-info">
              <img className="profile-image" src={image} alt="img" />
              
            </div> )
        }
            </div>
          </div>
    </div>
  );
};

export default Navbar;
