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
  //const [dateTime, setDateTime] = React.useState('');
  const [training, setTraining] = React.useState({ 
      date: '2020-12-18', 
      time: '18:00',
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
      console.log(training.date + 'T' + training.time + ':00.000+0000');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setNewTraining({date: training.date + 'T' + training.time + ':00.000+0000', 
                    duration:training.duration, 
                    activity: training.activity, customer: props.params.value[0].href});
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