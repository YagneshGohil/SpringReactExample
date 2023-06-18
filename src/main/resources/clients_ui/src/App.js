import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientList from './ClientList';
import ClientEdit from "./ClientEdit";
import NewMan from './NewMan';
import NewMan2 from './NewMan2';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/clients' exact={true} component={ClientList}/>
            <Route path='/clients/:id' component={ClientEdit}/>
            <Route path='/newman' component={NewMan}/>
            <Route path='/newman2' component={NewMan2}/>
          </Switch>
        </Router>
    )
  }
}

export default App;