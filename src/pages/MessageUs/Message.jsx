import React, { useRef, useState } from 'react'
import "./Message.css"
import emailjs from '@emailjs/browser';
const Message = () => {
  const formRef = useRef();
    const [done, setDone] = useState(false)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        setDone(true)
        emailjs.sendForm('service_ukpfz2d', 'template_hre6l8h', formRef.current, 'e_9mk8PU9uPmeE13U')
      .then((result) => {
          console.log(result.text);
          alert("mail sent successfully")
          setDone(false)
      }, (error) => {
          console.log(error.text);
          alert("something went wrong")
          setDone(false)
      });
    }
  return (
    <div className='message'>
        <main className='feedback'>
            <div className="holdfeedbackheader">
            <h2>Feedback</h2>
            <span className='display-mobile'>
                <h3>What would you like to know?</h3>
                <h6> please send it via the message box, we are excited to hear from you</h6>
            </span>
            <p>What would like us to know, please send it via the message box, we are excited to hear from you</p>
            </div>
            <form className="holdfeedbackform" ref={formRef} onSubmit={handleSubmit}>
                <input type="text" placeholder='example@gmail.com' name="user_email" required={true}/>
                <textarea placeholder='Message' name="message" required={true}></textarea>
               <div className="holdfeedbackbutton">
               <button type="submit" disabled={done}>Send</button>
               </div>
            </form>
        </main>
    </div>
  )
}

export default Message