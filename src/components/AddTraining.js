import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({ 
      date: '', 
      time: '',
      duration: '', 
      activity: '', 
    });
  const [newTraining, setNewTraining] = React.useState({
      date: '',
      duration: '',
      activity: '',
      customer: '',
    });

  const handleClickOpen = () => {
    console.log(props.params.value[0].href);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    var year = parseInt(training.date.substring(0,4));
    var month = parseInt(training.date.substring(5,7));
    var day = parseInt(training.date.substring(8,10));
    var hour = parseInt(training.time.substring(0,2));
    var minute = parseInt(training.time.substring(3,5));
    var date = new Date(year, month, day, hour, minute);
    setNewTraining({date: date.toISOString(), 
                    activity: training.activity, 
                    duration:training.duration,
                    customer: props.params.value[0].href});
    props.addTraining(newTraining);
    handleClose();
  };

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  };

    return (
        <div>
            <Tooltip title="Add Training to Customer" placement="top-end">
            <IconButton style={{ marginBottom: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
                < AddIcon />
            </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Date (in form 2021-01-15)"
                        name="date"
                        value={training.date}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Time (in form 17:00)"
                        name="time"
                        value={training.time}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration (in minutes)"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={training.activity}
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

export default AddTraining;