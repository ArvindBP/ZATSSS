import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import './login.css';
import MediaQuery from 'react-responsive';
import sapient from './logo1.png';
import './login.css';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
export default class Login extends React.Component{
	render(){
		return (
		<fragment>
		<header className="App-header centered">
          <img src={sapient} className="App-logo" alt="logo" />
          <MediaQuery query="(min-device-width: 1224px)">
          <h1 className="App-title">Welcome to ZATSSS</h1>
          </MediaQuery>
          <MediaQuery query="(max-device-width: 1224px)">
      <h1 className="App-title">Welcome to ZATSSS</h1>
    </MediaQuery>
        </header>
		<div className="loginfields centered" >
			<TextField
          		id="with-placeholder"
          		label="Username"
          		placeholder="Username"
          		margin="normal"
        	/>
        	<br />
        	<TextField
          		id="password-input"
          		label="Password"
          		type="password"
          		autoComplete="current-password"
          		margin="normal"
        	/>
        	<br />
        	<Button variant="raised" color="primary" component={Link} to="/Router" >
            Login
          </Button>
        </div>
        </fragment>
		);
	}
}