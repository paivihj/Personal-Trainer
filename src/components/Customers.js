import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import Tooltip from '@material-ui/core/Tooltip';

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCustomers();
    }, [])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if (window.confirm("Are you sure you want to delete the customer?")){
        fetch(params.value[0].href, {
            method: 'DELETE'
        })
        .then(_ => getCustomers())
        .then(_ => handleOpen())
        .catch(err => console.error(err))}
    };

    const addCustomer = (newCust) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newCust)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    };

    const editCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        }).then(response => getCustomers())
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        .catch(err => console.error(err))
    }

    const columns = [
        {headerName: 'Name', valueGetter: combineNames, sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '', 
            field: 'links',
            width: 90,
            cellRendererFramework: params => 
                <AddTraining addTraining={addTraining} params={params}/>
        },
        {
            headerName: '',
            field: 'links',
            width: 90,
            cellRendererFramework: params => 
                <EditCustomer editCustomer={editCustomer} params={params}/>
        },
        {
         headerName: '',
         field: 'links',
         width: 90,
         cellRendererFramework: params => 
            <Tooltip title="Delete Customer" placement="top-end">
                <IconButton color="secondary" onClick={() => deleteCustomer(params)}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
        }
    ]

    function combineNames(params) {
        return params.data.lastname + " " + params.data.firstname;
    }

    return (
        <div>
        <div><AddCustomer addCustomer={addCustomer}/></div>
        <div className='ag-theme-material' 
                style={{ height: 750, width: '80%', margin:'auto'}}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={columns}
                    pagination="true"
                    paginationPageSize="12"
                />
        </div>
        <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={3000}
                message="Customer deleted succesfully"
        />
        </div>
    );
}

export default Customers;