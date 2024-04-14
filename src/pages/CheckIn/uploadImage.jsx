import './uploadimage.css'
import { MdOutlineHowToVote } from "react-icons/md";

const Punctuality = () => {
    return(
        <div className="uploadwrap">
            <div className="confirm">
                <div className="punctual">
                    <h3>Confirm Punctuality</h3>
                </div>
                <div className="confirmdetails">
                    <div className="detailHold">
                        <div className="pic">
                            <div className="actualImg">
                                <img src="https://media.istockphoto.com/id/1289220781/photo/portrait-of-happy-smiling-woman-at-desk.webp?b=1&s=170667a&w=0&k=20&c=62bR74AXyFUmE9AKfp-9S4rc07lx7xsEFhJ78LroDgw=" alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            <h4>Collin Decore</h4>
                            <p>Monday</p>
                            <p>Server Time in : <span>9:50 pm</span></p>
                            <p>Recomended Rating : <span>100%</span></p>
                        </aside>
                    </div>
                    <div className="detailHold">
                        <div className="pic">
                            <div className="actualImg">
                                <img src="https://media.istockphoto.com/id/1289220781/photo/portrait-of-happy-smiling-woman-at-desk.webp?b=1&s=170667a&w=0&k=20&c=62bR74AXyFUmE9AKfp-9S4rc07lx7xsEFhJ78LroDgw=" alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            <h4>Collin Decore</h4>
                            <p>Monday</p>
                            <p>Server Time in : <span>9:50 pm</span></p>
                            <p>Recomended Rating : <span>100%</span></p>
                        </aside>
                    </div>
                    <div className="detailHold">
                        <div className="pic">
                            <div className="actualImg">
                                <img src="https://media.istockphoto.com/id/1289220781/photo/portrait-of-happy-smiling-woman-at-desk.webp?b=1&s=170667a&w=0&k=20&c=62bR74AXyFUmE9AKfp-9S4rc07lx7xsEFhJ78LroDgw=" alt="" />
                            </div>
                        </div>
                        <aside className='actualrating'>
                            <h4>Collin Decore</h4>
                            <p>Monday</p>
                            <p>Server Time in : <span>9:50 pm</span></p>
                            <p>Recomended Rating : <span>100%</span></p>
                        </aside>
                    </div>
                </div>
                <div className="average">
                     <h4>Average Punctuality Score : 100%</h4>
                     <button> <MdOutlineHowToVote /> Acknowledge</button>
                </div>
            </div>
        </div>
    )
}

export default Punctuality