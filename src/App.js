import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route , Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import CalendarView from './components/CalendarView';

function App() {
  return (
    <div className="App">
      <div><AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar></div>
      <div style={{margin: 5}}>
      <BrowserRouter>
            <Link style={{marginRight: 20}} to="/customers" >Customers</Link>
            <Link style={{marginRight: 20}} to="/trainings">Trainings</Link >
            <Link to="/calendar">Calendar</Link>
            <Switch> 
              <Route path="/customers" component={Customers} />
              <Route path ="/trainings" component={Trainings} />
              <Route path ="/calendar" component={CalendarView} />
            </Switch>
        </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
