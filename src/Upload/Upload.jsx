import React,{useState} from 'react'
import './Upload.css'
import { IoCloudUploadOutline,IoImageSharp } from "react-icons/io5";


const Upload = () => {


  const [SelectedImage, setSelectedImage] = useState(null)


  const HandleFileChange = (e)=>{
    setSelectedImage(e.target.files[0])
  }

const HandleUploadImage = ()=>{

}







  return (
    <div className='Uploadbody'>
      <div className="UploadHeader">
        <h3>Upload Image</h3>
      </div>
      <div className='UploadHold'>
        <section className='UploadContainer'>
          <div className='UploadIcon'>
          <IoCloudUploadOutline className='Uploadic' />
          <p>Upload Picture</p>
          </div>
          <div className='UploadSection'>
            <div className="UploadHeadText">
              <p>Supported Media Below </p>
            </div>
            <div className="UploadProperties">
              <div className='UploadImageContain'>
               <div className="UploadImagecontext">
               <IoImageSharp className='IconOne'/>
                <IoImageSharp className='IconTwo'/>
               </div>
                <div className='UploadTextImage'>
                  <p>JPG</p>
                  <p>PNG</p>
                </div>
              </div>
            <div className='UploadBtn'>
              <button onClick={HandleUploadImage}>Browse Images</button>
            </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Upload