import React, {Component} from 'react';
import './index.css';
import {Route} from 'react-router-dom';
import * as firebase from 'firebase';
import {auth,authData} from './components/firebase'

// Views
import Activities from './views/activities';
import Nav from './components/nav';
import HandleRedirect from './views/handleRedirect';
import ActivityDetail from './views/activityDetail';
import Home from './views/home';
import Footer from './components/footer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  componentWillMount() {


    firebase.auth().onAuthStateChanged( (user) => {

      if(user) {

        // Set state to loggedIn
        this.setState({loggedIn: true})

        // Retrieve user access token from Firebase
        firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) =>{
          let value = snapshot.val()

          // Set accesstoken as an app state
          this.setState(value)
        })

      } else {
        // do nothing
      }
    })
  }

  componentDidMount() {
    console.log(authData);
  }

  render(){
    if(this.state.loggedIn) {
      return(

          <div className="App o-wrapper o-app">
            <Nav type="private"/>

            <div className='o-content'>

              <Route path="/handle_redirect" exact component={HandleRedirect}/>
              <Route path="/" exact component={Activities} />
              <Route path="/activities/page/:page" component={Activities}/>
              <Route path="/activities/:id" exact component={ActivityDetail}/>

            </div>
            <Footer/>
          </div>



      )
    } else {
      return(
        <div className="App o-wrapper o-app">
          <div></div>

          <div className='o-content'>
            <Route path="/" exact component={Home} />
            <Route path="/activities" exact component={Home}/>
            <Route path="/activities/:id" exact component={ActivityDetail}/>
            <Route path="/handle_redirect" exact component={HandleRedirect}/>
          </div>
        </div>
      )

    }

  }
}

export default App;
