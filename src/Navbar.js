import { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import './Navbar.css';
import logo from './img/calendar.png';
import 'typeface-montserrat'; //run npm install typeface-montserrat to see the font!
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Navbar() {
    const [activeButton, setActiveButton] = useState(null);

    const handleClick = (buttonName) => {
        setActiveButton(buttonName); // Set the active button
    };

    return (
        <div>
            <div className="navbar">
                <div className="logo_title_container">
                    <img className="logo" src={logo} alt="Logo" />
                    <p className="navbar_title">AI-Genda</p>
                </div>
                <div className="navbar_btns"> 
                    
                    <Link to="/Dashboard">
                        <button 
                            className={`navbar_btn ${activeButton === 'calendar' ? 'active' : ''}`} 
                            onClick={() => handleClick('calendar')}>
                            Calendar
                        </button>
                    </Link>
                    <Link to="/TimeBlockingPage">
                        <button 
                            className={`navbar_btn ${activeButton === 'timeblocking' ? 'active' : ''}`} 
                            onClick={() => handleClick('timeblocking')}>
                            TimeBlock
                        </button>
                    </Link>
                    <Link to="/analytics">
                        <button 
                            className={`navbar_btn ${activeButton === 'analytics' ? 'active' : ''}`} 
                            onClick={() => handleClick('analytics')}>
                            Analytics
                        </button>
                    </Link>
                    <Link to="/settings">
                        <button 
                            className={`navbar_btn ${activeButton === 'settings' ? 'active' : ''}`} 
                            onClick={() => handleClick('settings')}>
                            Settings
                        </button>
                    </Link>

                </div>
                <div className="profile_container">
                    <div className="navbar_notifications">
                        <FaRegBell className="navbar_bell_icon" />
                        <div className="navbar_notifications_number">3</div>
                    </div>
                    <p className="navbar_username">Asmae Loulidi</p>
                    <div className="mini_profile_pic"></div>
                    <IoIosArrowDown className="navbar_down_arrow" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
