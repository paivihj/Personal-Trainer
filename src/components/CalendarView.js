import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarView(props) {

    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        props.trainings.map((training) => 
        setEvents(...events, {
            start: training.date.toDate(),
            end: training.date.add(1, training.duration).toDate,
            title: training.acticity + "/" + training.customer.lastname
        })
    )});

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: 750}}
            />
        </div>
    );
}

export default CalendarView;