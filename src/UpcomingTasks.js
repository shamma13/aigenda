import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpcomingTasks({ refreshTasks }) {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const fetchUpcomingTasks = async () => {
        try {
            const response = await axios.get('/tasks/get');
            const events = response.data;
            console.log(events);

            const currentDate = new Date();
            const oneMonthLater = new Date();
            oneMonthLater.setMonth(currentDate.getMonth() + 1);

            const upcomingTasks = events.filter((event) => {
                const eventStart = new Date(event.start);
                return eventStart >= currentDate && eventStart <= oneMonthLater;
            });

            setEvents(upcomingTasks);
        } catch (error) {
            setError('Error fetching upcoming tasks');
        }
    };

    useEffect(() => {
        fetchUpcomingTasks();
    }, [refreshTasks]);  // Re-fetch tasks when refreshTasks changes

    return (
        <div>
            {error && <p>{error}</p>}
            <ul>
                {events.map((event, index) => (
                    <li key={index}>{event.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default UpcomingTasks;
