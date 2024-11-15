import './Homepage.css';
import React from 'react';
import blueCircle from '../Images/blueCircle.png';
import logo from '../Images/logo.png';
import Link from "@mui/material/Link";

function Homepage() {

    return(

        <div>
            <div className='logoNameBox'>
                <img src={logo} alt='logo'></img>
                <p>AI-Genda</p>
            </div>

            <div className='textBox'>
                <div className='heading'>
                    <p>Revolutionizing Task and Academic Management</p>
                </div>
                <div className='regularText'>
                    <p>Take control of your schedule with intelligent AI-driven solutions for every task.</p>
                </div>
                <Link href="/SignUp">
                    <button className='blueButton'>Sign Up</button>
                </Link>
            </div>

            <div className='whiteButtonsBox'>
                <Link href="/SignIn">
                    <button>Login</button>
                </Link>
                <Link href="/SignUp">
                    <button>Sign Up</button>
                </Link>
            </div>

            <div className='blueCircleBox'>
                <img src={blueCircle} alt="blue circle"></img>
            </div>
            
        </div>
    )

}

export default Homepage;


