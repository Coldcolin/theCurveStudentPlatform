import React from 'react'
import "./Message.css"

const Message = () => {
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
            <form className="holdfeedbackform">
                <input type="text" placeholder='example@gmail.com'/>
                <textarea placeholder='Message'></textarea>
               <div className="holdfeedbackbutton">
               <button>Send</button>
               </div>
            </form>
        </main>
    </div>
  )
}

export default Message