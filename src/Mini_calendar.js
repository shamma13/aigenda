import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7D72FF', 
        },
    },
});

function Mini_calendar() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ width: '100%' }}>
                    <DateCalendar
                        value={dayjs()}
                        readOnly
                        sx={{
                            width: '100%',
                        }}
                    />
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default Mini_calendar;
