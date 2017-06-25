import React, { Component } from 'react';

let authUrl = 'https://strava-auth.herokuapp.com';

if(process.env.NODE_ENV === 'development'){
  authUrl = 'http://localhost:3000';
} else {
  authUrl = 'https://strava-auth.herokuapp.com';
}
class Login extends Component {
  render() {

    return(
      <a href={authUrl}>
        <img src="/img/btn_strava_connectwith_orange.svg"/>
      </a>
    )
  }
}

export default Login;
