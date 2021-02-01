import './App.css';

import NewsFeed from './components/User/Newsfeed/Newsfeed';
import Message from './components/User/Message/Message'
import Login from './container/Login'
import Register from './container/Register';
import Profile from './components/User/Profile'

import PrivateRoute from './container/PrivateRoute';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" Component={NewsFeed} />
          <PrivateRoute exact path="/message" Component={Message} />
          <PrivateRoute exact path="/profile" Component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
