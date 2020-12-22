import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarView() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
        
        setEvents(trainings.map((training, index) => ({
            id: index,
            start: moment(training.date)._d,
            end: moment(training.date).add(training.duration, 'minutes')._d,
            title: training.activity + "/" + training.customer.lastname
        }))
    )}, [trainings.length]);

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