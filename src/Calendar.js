import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  createViewWeek,
  createViewMonthGrid
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import '@schedule-x/theme-default/dist/index.css';
import axios from 'axios';

function Calendar({ view, selectedDate }) {


  function handleEventUpdate(event) {
    const { id, start, end, title } = event;
    try {
      const response = axios.post('http://localhost:5000/update-tasks',
        { id, start, end, title },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const eventsService = createEventsServicePlugin();
  const calendarControls = createCalendarControlsPlugin();
  const dragAndDrop = createDragAndDropPlugin();

  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: [],
    plugins: [eventsService, calendarControls, dragAndDrop],
    callbacks: {
      onEventUpdate: handleEventUpdate
    },
    calendars: {
      courses: {
        colorName: 'courses',
        lightColors: {
          main: '#3498db', // Course-specific color
          container: '#d4e9f7',
          onContainer: '#063970',
        },
      },
      aiEvents : {
        colorName: 'aiEvents',
        lightColors: {
          main: '#16a085', // ai-specific color
          container: '#b2d8d2',
          onContainer: '#0d4036',
      },
    },
  }
  });


  const eventExists = (event) => {
    const existingEvents = eventsService.getAll();
    return existingEvents.some(existingEvent =>
      existingEvent.start === event.start &&
      existingEvent.end === event.end &&
      existingEvent.title === event.title
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsResponse, classesResponse, aiEventsResponse] = await Promise.all([
          axios.get('http://localhost:5000/tasks/get'),
          axios.get('http://localhost:5000/courses/get'),
          axios.get('http://localhost:5000/aievents')
        ]);

        const events = eventsResponse.data;
        const recurrentEvents = classesResponse.data;
        const aiEvents = aiEventsResponse.data;

        // Add fetched events if they don't already exist
        events.forEach(event => {
          if (!eventExists(event)) {
            eventsService.add({
              ...event,
              id: event.id || uuidv4(),
              // calendarId: 'tasks'
            });
          }
        });

        recurrentEvents.forEach(event => {
          if (!eventExists(event)) {
            eventsService.add({
              ...event,
              id: event.id || uuidv4(),
              calendarId: 'courses' // Assign color group for courses
            });
          }
        });

        aiEvents.forEach(event => {
          if (!eventExists(event)) {
            eventsService.add({
              ...event,
              id: event.id || uuidv4(),
              calendarId: 'aiEvents' // Assign color group for courses
            });
          }
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    calendarControls.setView(view);
    calendarControls.setDate(selectedDate.format('YYYY-MM-DD'));
    calendarControls.setDayBoundaries({
      start: "07:00",
      end: "23:59"
    })
  }, [view, calendarControls, selectedDate]);

  return (
    <div>
      <style>
        {`
          .sx__calendar-header {
            display: none !important; 
          }

          .sx__calendar {
            border: none !important; 
            box-shadow: none !important; 
          }

          .sx__week-grid__date--is-today .sx__week-grid__date-number {
            background-color: #7D72FF !important; 
            color: white; 
        }
            
            .sx__week-grid__date--is-today .sx__week-grid__day-name{
            color: #7D72FF;
          }
            
            .sx__time-grid-event:hover{
            cursor: pointer;
            opacity: 0.8;
            }
            
          ${view === 'month-grid' ? `
          .sx__calendar {
            height: 70vh;
          }

         .sx__month-grid-day__header-date.sx__is-today {
            background-color: #7D72FF !important; 
            color: white; 
        }
        ` : ''}
      
        `}
      </style>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default Calendar;