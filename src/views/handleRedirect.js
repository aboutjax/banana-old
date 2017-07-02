import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {setCookie} from '../components/cookieHelper'
import * as firebase from 'firebase';

let userAccessToken;
let firebaseToken;

let setTokenFromUrl = () => {
  const search = window.location.search.substring(1)
  const query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

  userAccessToken = query.access_token
  firebaseToken = query.firebase_token

  console.log(query);
  setCookie('access_token', userAccessToken, 7)
}

let signInWithFirebase = (token) => {
  firebase.auth().signInWithCustomToken(token).catch(function(error){
    // Handle error
    console.log(error.code);
    console.log(error.message);
  })
}


class HandleRedirect extends Component {

  componentWillMount(){

    // get token from url
    setTokenFromUrl();
    signInWithFirebase(firebaseToken);

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user.uid);
        firebase.database().ref('users/' + user.uid).set({
          accessToken: userAccessToken
        })
        window.location.reload()
      } else {
        // No user is signed in.
        console.log(user);
      }
    });

  }

  render(){
    return(
      <Redirect to="/" />
    )
  }
}

export default HandleRedirect;
