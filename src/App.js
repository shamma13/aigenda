import './App.css';
import Footer from './Components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInSide from "./Components/SigninPage/SignInSide";
import SignUpSide from "./Components/SignupPage/SignUpSide";
import FAQPage from './Components/FAQPage/FAQPage';
import Settings from "./Components/SettingsPage/Settings";
import Homepage from './Components/Homepage/Homepage';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home, Task } from '@mui/icons-material';
import CreateTask from './Components/CreateTask/CreateTask';
import Dashboard from './Dashboard_Loggedin';
import TimeBlockingPage from './Components/TimeBlocking/TimeBlocking';
import Navbar from './Navbar'; // Import the Navbar component
import EditTimeBlock from './Components/EditTimeBlock/EditTimeBlock';

// import UnsavedChangesPopup from './Components/UnsavedChangesPopup';
// import DeleteTaskPopup from './Components/DeleteTaskPopup';

const theme = createTheme();

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function App() {
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        const currentPath = window.location.pathname;

        // Hide the navbar for the homepage and '/' path
        if (currentPath === '/' || currentPath === '/homepage' || currentPath === '/SignIn' || currentPath === '/SignUp') {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
    }, []); // Run only on initial load

    return (
        <ThemeProvider theme={theme}>
            <Router>
                {/* Conditionally render Navbar based on the state */}
                {showNavbar && <Navbar />}

                <Routes>
                    <Route path="/" exact element={<Homepage />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route exact path="/signup" element={<SignUpSide />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/signin" element={<SignInSide />} />
                    <Route path="/faqpage" element={<FAQPage />} />
                    <Route path='/Dashboard' element={<Dashboard />} />
                    <Route path='/taskCreator' element={<CreateTask />} />
                    <Route path='/timeBlockCreator' element={<TimeBlockingPage />} />
                    <Route path='/timeBlockEditor' element={<EditTimeBlock />} />

                    {/* <Route path='/unsavedchanges' element={<UnsavedChangesPopup/>}/>
                    <Route path='/deletetask' element = {<DeleteTaskPopup />} /> */}
                    <Route path='/TimeBlockingPage' element={<TimeBlockingPage />} />
                </Routes>

                {/* <Footer /> */}
            </Router>
        </ThemeProvider>
    );
}

export default App;
