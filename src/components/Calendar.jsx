import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

const customTheme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#ff4081",
          "&:hover": {
            backgroundColor: "#ffe0e6",
          },
          "&.Mui-selected": {
            backgroundColor: "#ff4081",
            color: "#fff",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff0f5",
        },
      },
    },
  },
});

const Calendar = () => {
  
    const [selectedDate, setSelectedDate] = useState(null);
    
      return (
        <ThemeProvider theme={customTheme}>
          <div className="mt-20 flex flex-col items-center gap-5">
      <h2 className="text-rose-600 text-xl font-bold pl-3">
      Let's Keep Track of Your Cycle Together! 🌸
      </h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => (
            <TextField className="focus:outline-none focus:ring-2 focus:ring-rose-400" //not working blue outline looks bad TODO for anukiran
              {...params}
              sx={{
                width: "300px",
                "& .MuiInputBase-root": {
                  height: "56px",
                  fontSize: "1.2rem",
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    </div>
        </ThemeProvider>
      );
};

export default Calendar
