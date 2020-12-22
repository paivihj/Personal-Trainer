import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';

function Trainings() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTrainings();
    }, [])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }

    const deleteTraining = (params) => {
        if (window.confirm("Are you sure you want to delete the training?")){
        fetch(`https://customerrest.herokuapp.com/api/trainings/${params.value}`, {
            method: 'DELETE'
        })
        .then(_ => getTrainings())
        .then(_ => handleOpen())
        .catch(err => console.error(err))}
    }

    const columns = [
        {headerName: 'Date', valueGetter:editDate, sortable: true, filter: true},
        {headerName: 'Time', valueGetter:getTime, sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'duration', sortable:true, filter: true},
        {headerName: 'Customer', valueGetter:getCustomer, sortable: true, filter: true},
        {
         headerName: '',
         field: 'id',
         width: 90,
         cellRendererFramework: params => 
            <Tooltip title="Delete Training" placement="top-end">
                <IconButton color="secondary" onClick={() => deleteTraining(params)}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
        }
    ]

    function editDate(params) {
        return moment(params.data.date).format('L');
    }

    function getTime(params) {
        return moment(params.data.date).format('LT');
    }

    function getCustomer(params) {
        return params.data.customer.lastname + " " + params.data.customer.firstname;
    }

    return (
        <div>
        <div className='ag-theme-material' 
                style={{ height: 750, width: '80%', margin:'auto'}}>
                <AgGridReact 
                    rowData={trainings}
                    columnDefs={columns}
                    pagination="true"
                    paginationPageSize="12"
                />
        </div>
        <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                message="Training deleted succesfully"
        />
        </div>
    );
}

export default Trainings;