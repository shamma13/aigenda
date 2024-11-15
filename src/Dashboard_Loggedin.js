import "./Dashboard_Loggedin.css";
import Mini_calendar from "./Mini_calendar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { IoFilter } from "react-icons/io5";
import Calendar from "./Calendar";
import CreateTask from "./Components/CreateTask/CreateTask";
import TodaysTasks from "./TodaysTasks";
import UpcomingTasks from "./UpcomingTasks";

function Dashboard_Loggedin() {
    const [selected, setSelected] = useState('week');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const [refreshTasks, setRefreshTasks] = useState(false);

    const openCreateTask = () => {
        console.log("Opening CreateTask");
        setIsCreateTaskOpen(true);  // Open CreateTask popup
    };
  
    const closeCreateTask = () => {
        console.log("Closing CreateTask");
        setIsCreateTaskOpen(false);
        setRefreshTasks((prev) => !prev);  // Toggle refreshTasks to trigger data reload
    };
      
    const handleButtonClick = (view) => {
        setSelected(view);
    };

    const navigate = (direction) => {
        if (selected === 'month-grid') {
            if (direction === 'forwards') {
                setSelectedDate(selectedDate.add(1, 'month'));
            } else if (direction === 'backwards') {
                setSelectedDate(selectedDate.subtract(1, 'month'));
            }
        } else {
            if (direction === 'forwards') {
                setSelectedDate(selectedDate.add(1, 'week'));
            } else if (direction === 'backwards') {
                setSelectedDate(selectedDate.subtract(1, 'week'));
            }
        }
    };

    const handleTodayClick = () => {
        if (!selectedDate.isSame(dayjs(), 'day')) {
            setSelectedDate(dayjs());
        }
    };

    return (
        <div className="dashboard_loggedin_main_container">
            <div className="dashboard_loggedin_second_container">
                <div className="sidebar">
                    <div className="task_container">
                        <div className="task_header">Today's Tasks</div>
                        <TodaysTasks refreshTasks={refreshTasks} />
                    </div>
                    <div className="task_container">
                        <div className="task_header">Upcoming</div>
                        <UpcomingTasks refreshTasks={refreshTasks} />
                    </div>
                    <div className="mini_calendar">
                        <Mini_calendar />
                    </div>
                </div>
                
                <div className="calendar_container">
                    <div className="calendar_header">
                        <div className="calendar_header_date">
                            <div className="date_arrows">
                                <FaArrowLeft className="date_arrow_btn" onClick={() => navigate('backwards')} />
                                <FaArrowRight className="date_arrow_btn" onClick={() => navigate('forwards')} />
                            </div>
                            <div className="current_date"> {selectedDate.format('MMMM D, YYYY')} </div>
                            <div className="today_btn" onClick={handleTodayClick}>
                                Today
                            </div>
                        </div>
                        <div className="weekly_monthly_buttons">
                            <button
                                className={`monthly_btn ${selected === 'month-grid' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('month-grid')}
                            >
                                Month
                            </button>
                            <button
                                className={`weekly_btn ${selected === 'week' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('week')}
                            >
                                Week
                            </button>
                        </div>
                    </div>
                    <div className="calendar_header_2">
                        <button className="filter_btn"> 
                            <IoFilter className="filter_icon"></IoFilter>
                            Filter
                        </button>
                        <div className="add_event_task_btns">
                            <button className="add_event_btn">Add Event</button>
                            <button className="add_tasks_btn" onClick={openCreateTask}>Add Task</button>
                        </div>
                    </div>

                    {!isCreateTaskOpen && (
                        <div className="calendar_component">
                            <Calendar
                                key={`${selected}-${selectedDate.format('YYYY-MM-DD')}`} 
                                view={selected} 
                                selectedDate={selectedDate}
                            />
                        </div>
                    )}

                    {isCreateTaskOpen && (
                        <div className="create_task_popup">
                            <CreateTask closePopup={closeCreateTask} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard_Loggedin;