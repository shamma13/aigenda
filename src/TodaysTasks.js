import React, { Component } from 'react';
import axios from 'axios';

class TodaysTasks extends Component {
  state = {
    events: [],
    error: null,
  };

  componentDidMount() {
    this.fetchTodaysTasks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refreshTasks !== this.props.refreshTasks) {
      this.fetchTodaysTasks();
    }
  }

  // Fetch today's tasks from the backend
  fetchTodaysTasks = async () => {
    try {
      const response = await axios.get('/tasks/get');
      const events = response.data;

      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      // Filter tasks that occur today
      const todaysTasks = events.filter((event) => {
        const eventStart = new Date(event.start);
        return eventStart >= startOfDay && eventStart <= endOfDay;
      });

      this.setState({ events: todaysTasks });
    } catch (error) {
      this.setState({ error: "Error fetching today's tasks" });
    }
  };

  render() {
    const { events, error } = this.state;

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
}

export default TodaysTasks;
