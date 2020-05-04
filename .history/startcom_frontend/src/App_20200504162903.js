import React, { Component } from 'react';
import {Provider} from 'react-redux';
import themeFile from "./utils/theme";

import store  from './store'
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route} from 'react-router-dom';

//Import pages
import RegisterBI from './components/businessideas/registerbusinessidea/RegisterBI';
import HomePage from './components/anonymoususers/homepage/HomePage';
import Authentication from './components/authentication/Authentication';
import Login from './components/authentication/login/Login';
import SignUp from './components/authentication/register/SignUp';
import AdminDashboard from './components/admin/AdminDashboard.js';
import Contact from './components/contact/Contact';
import './custom.css';
import Container  from './components/contact/Container';
import DisplayBIS from "./components/businessideas/displaybusinessideas/DisplayBIS";
import BIDetail from './components/Layout/BIDetail';
import BIDetailSkeleton from "./components/skeleton/BIDetailSkeleton";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";

class App extends Component {
  render() {
  const theme = createMuiTheme(themeFile);

    return (
      <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                  <Route exact path={'/'} render={(props) => <HomePage {...props} />} />
                  <Route exact path={'/auth'} render={(props) => <Authentication {...props} />} />
                  <Route exact path={'/login'} render={(props) => <Login {...props} />} />
                  <Route exact path={'/signup'} render={(props) => <SignUp {...props} />} />
                  <Route exact path={'/displayBIS'} render={(props) => <DisplayBIS {...props} />} />
                  <Route exact path={'/detail/:id'} render={(props) => <BIDetail {...props} />} />
                  <Route exact path={'/skeleton'} render={(props) => <BIDetailSkeleton {...props} />} />
                  <Route exact path={'/profile'} render={(props) => <Profile {...props} />} />
                  <Route exact path={'/edit_profile'} render={(props) => <EditProfile {...props} />} />
                  <Route exact path={'/registerBI'} render={(props) => <RegisterBI {...props} />} />
                  <Route exact path={'/admin'} render={(props) => <AdminDashboard {...props} />} />
                  <Route exact path={'/contact'} render={(props) => <Contact {...props} />} />
                  <Route exact path={'/container'} render={(props) => <Container {...props} />} />
                </ThemeProvider>
          </Provider>
      </BrowserRouter>

    );
  }
}
export default App;

