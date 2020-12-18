import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

function EditCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [cust, setCust] = React.useState({ 
        firstname: '', 
        lastname: '', 
        streetaddress: '', 
        postcode: '', 
        city:'', 
        email: '',
        phone:''
    });

  const handleClickOpen = () => {
    setCust({
        firstname: props.params.data.firstname,
        lastname: props.params.data.lastname,
        streetaddress: props.params.data.streetaddress,
        postcode: props.params.data.postcode,
        city: props.params.data.city,
        email: props.params.data.email,
        phone: props.params.data.phone
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.editCustomer(props.params.value[0].href, cust)
    handleClose();
  };

  const inputChanged = (event) => {
    setCust({...cust, [event.target.name]: event.target.value});
  };

    return (
        <div>
            <Tooltip title="Edit Customer" placement="top-end">
            <IconButton color="default" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Firstname"
                        name="firstname"
                        value={cust.firstname}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Lastname"
                        name="lastname"
                        value={cust.lastname}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Street Address"
                        name="streetaddress"
                        value={cust.streetaddress}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        name="postcode"
                        value={cust.postcode}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        name="city"
                        value={cust.city}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="E-mail"
                        name="email"
                        value={cust.email}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Phone Number"
                        name="phone"
                        value={cust.phone}
                        onChange={inputChanged}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomer;