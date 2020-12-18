import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route , Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Customers from './components/Customers';
import Trainings from './components/Trainings';

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
      <BrowserRouter>
            <Link to="/customers" >Customers</Link>
            <Link to="/trainings">Trainings</Link >
            <Switch> 
              <Route path="/customers" component={Customers} />
              <Route path ="/trainings" component={Trainings} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
