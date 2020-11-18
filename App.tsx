import React, { Component } from 'react';
import { Router, AuthRouter } from './src/routes'
import firebase from 'firebase'
import { LoadAssets } from './src/Components';

const firebaseConfig = {
  apiKey: "AIzaSyAbjZ3J6HBB6UPW1013YwOU8wpsjONJ9wQ",
  authDomain: "blitzexpo-3d09d.firebaseapp.com",
  databaseURL: "https://blitzexpo-3d09d.firebaseio.com",
  projectId: "blitzexpo-3d09d",
  storageBucket: "blitzexpo-3d09d.appspot.com",
  messagingSenderId: "776100349571",
  appId: "1:776100349571:web:c0f748655fa7e91f79fdb6"
};

const fonts = {
  "Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

class App extends Component {

  state={
    loggedIn:null
  }

  componentDidMount() {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({
            loggedIn:true
          })
        } else {
          this.setState({
            loggedIn:false
          })
        }
    })
  }

  renderContent = () => {
    switch(this.state.loggedIn){
      case false:
        return <AuthRouter/>
      case true:
        return <Router/>
    }
  }

  render() {
    return (
      <LoadAssets {...{ fonts }}>
        {this.renderContent()}
      </LoadAssets>
    );
  }
}

export default App;
