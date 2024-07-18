import React, { useState} from "react";
import Popover from '@material-ui/core/Popover';
import { DateRangePicker } from 'react-date-range';
import { TextField } from "@material-ui/core";
import { dateFormat } from "./Date";
import "react-datepicker/dist/react-datepicker.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRange = ({dateRange, setDateRange}) => {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? 'date-range-popover' : undefined;

    const [dateRangeString, setDateRangeString] = useState(`${dateRange[0].startDate} - ${dateRange[0].endDate}`);
    {console.log("dateRangeString: ", dateRangeString)}
    
    const handleDateChange = (ranges) => {
        setDateRange([ranges.selection]);
        const startDateString = ranges.selection.startDate.toLocaleDateString();
        const endDateString = ranges.selection.endDate.toLocaleDateString();
        const rangeString = `${startDateString} - ${endDateString}`;
        setDateRangeString(rangeString);
    };

    return(<div>
        <TextField id="outlined-basic"
            label="Project Duration" variant="standard"
            placeholder="Insert project duration"
            value={dateRangeString}
            onClick={handleClick}
            InputProps={{readOnly: true,}}
        />
        <Popover id={id} open={open} anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
            transformOrigin={{vertical: 'top',horizontal: 'center',}}
        >
            <DateRangePicker
                minDate={today}
                ranges={dateRange}
                onChange={handleDateChange}
            />
        </Popover>
    </div>)
}

export default DateRange;