import React, { Component } from 'react';
import {Provider} from 'react-redux';
import theme from "./utils/theme";
import firebase from './firebase'
import store  from './store'
// import Navbar from "./components/Layout/Navbar";
// import Footer from "./components/Layout/Footer";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route} from 'react-router-dom';
import './custom.css';
//Import pages
import RegisterBI from './components/businessideas/registerbusinessidea/RegisterBI';
import HomePage from './components/anonymoususers/homepage/HomePage';
import Authentication from './components/authentication/Authentication';
import Login from './components/authentication/login/Login';
import SignUp from './components/authentication/register/SignUp';
import AdminDashboard from './components/admin/AdminDashboard.js';
import Contact from './components/contact/Contact';
import Container  from './components/contact/Container';
import DisplayBIS from "./components/businessideas/displaybusinessideas/DisplayBIS";
import BIDetail from './components/Layout/BIDetail';
import BIDetailSkeleton from "./components/skeleton/BIDetailSkeleton";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
// import Notification from './components/notification/Notification';
// import Notifications from './notifications.js'

// import * as serviceWorker from './serviceWorker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      isUserAllow: Notification.permission,
      pushServerSubscriptionId: '',
      isPushNotificationSupport: ''

    }
  }



  // onClickAskUserPermission = () => {
  //   setLoading(true);
  //   setError(false);
  //   serviceWorker.askUserPermission().then((consent) => {
  //     setSuserConsent(consent);
  //     if (consent !== 'granted') {
  //       setError({
  //         name: 'Consent denied',
  //         message: 'You denied the consent to receive notifications',
  //         code: 0
  //       });
  //     }
  //     setLoading(false);
  //   });
  // };


  componentDidMount() {
    
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
    
        const registration = navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then(registration => {
            
            //Confirm user permission for notification
            window.Notification.requestPermission()
              .then(permission => {
  
                
                firebase.messaging().getToken().then(
                  token => {
                    
                  })
    
    
                if (permission === 'granted') {
                  //If notification is allowed
                  
                  navigator.serviceWorker.ready.then(p => {
    
                    p.pushManager.getSubscription().then(subscription => {
  
                      
                      if (subscription === null) {

                        //If there is no notification subscription, register.
                        let re = p.pushManager.subscribe({
                          userVisibleOnly: true
                        })

                        firebase.messaging().onMessage((payload) => {

                          registration.showNotification(
                            payload.notification.title,
                                    {
                                      body: payload.notification.body,
                                      tag: payload.notification.tag
                                    }
                
                          );           
                      });



                      }
                    })
    
                  })
    
                } else {
                  //If notification is not allowed
                  console.log(permission)
                }
              })
          })
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                  <Route exact path={'/'} render={(props) => <HomePage {...props} 
                  />} />
                  <Route exact path={'/auth'} render={(props) => <Authentication {...props} />} />
                  <Route exact path={'/login'} render={(props) => <Login {...props} />} />
                  <Route exact path={'/signup'} render={(props) => <SignUp {...props} />} />
                  <Route exact path={'/displayBIS'} render={(props) => <DisplayBIS {...props}   />} />
                  <Route exact path={'/detail/:id'} render={(props) => <BIDetail {...props} />}  />
                  <Route exact path={'/skeleton'} render={(props) => <BIDetailSkeleton {...props} />} />
                  <Route exact path={'/profile'} render={(props) => <Profile {...props} />} />
                  <Route exact path={'/edit_profile'} render={(props) => <EditProfile {...props} />} />
                  <Route exact path={'/registerBI'} render={(props) => <RegisterBI {...props} />} />
                  <Route exact path={'/admin'} render={(props) => <AdminDashboard {...props} />} />
                  <Route exact path={'/contact'} render={(props) => <Contact {...props} />} />
                  <Route exact path={'/container'} render={(props) => <Container {...props} />} />
                  {/* <Route exact path={'/noti'} render={(props) => <Notification {...props} />} />
                  <Route exact path={'/test'} render={(props) => <Notifications {...props} />} /> */}
                </ThemeProvider>
          </Provider>
      </BrowserRouter>

    );
  }
}
export default App;

