import  { useState, useEffect } from 'react';
import './Upload.css';
import { IoCloudUploadOutline, IoImageSharp } from 'react-icons/io5';
import axios from 'axios';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (selectedImage) {
      getLocation();
    }
  }, [selectedImage]);

  const ImageUrl = 'https://thecurvepuntualityapi.onrender.com/api/v1/checkIn';
  const token = localStorage.getItem('token');

  const handleUploadImage = () => {
    document.getElementById('fileInput').click();
  };

  const uploadImage = async (formData) => {
    try {
      const response = await axios.post(ImageUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setUploadImageUrl(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedImage(file);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    uploadImage(formData);
  };



  return (
    <div className="Uploadbody">
      <div className="UploadHeader">
        <h3>Upload Image</h3>
      </div>
      <div className="UploadHold">
        <section className="UploadContainer">
          <div className="UploadIcon" onClick={handleUploadImage}>
            {uploadImageUrl ? (
              <img src={uploadImageUrl} alt="Uploaded" className="UploadedImg" />
            ) : (
              <IoCloudUploadOutline className="Uploadic" />
            )}
          </div>
          <div className="UploadSection">
            <div className="UploadHeadText">
              <p>Supported Media Below </p>
            </div>
            <div className="UploadProperties">
              <div className="UploadImageContain">
                <div className="UploadImagecontext">
                  <IoImageSharp className="IconOne" />
                  <IoImageSharp className="IconTwo" />
                </div>
                <div className="UploadTextImage">
                  <p>JPG</p>
                  <p>PNG</p>
                </div>
              </div>
              <div className="UploadBtn">
                <button onClick={handleUploadImage}>Browse Images</button>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="LocationInfo">
        {latitude && longitude && (
          <p>
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
