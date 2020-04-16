import React, { Component } from 'react';
import {Provider} from 'react-redux';
import themeFile from "./utils/theme";

import store  from './store'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterBI from './components/businessideas/RegisterBI';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route} from 'react-router-dom';
import HomePage from './components/anonymoususers/homepage/HomePage';
class App extends Component {
  render() {
  const theme = createMuiTheme(themeFile);

    return (
      <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <div className="App">
                      <Route exact path={'/registerBI'} render={(props) => <RegisterBI {...props} />} />
                      <Route exact path={'/'} render={(props) => <HomePage {...props} />} />
                      <Route exact path={'/nav'} render={(props) => <Navbar {...props} />} />
                      <Route exact path={'/footer'} render={(props) => <Footer {...props} />} />

                    </div>
                </ThemeProvider>
          </Provider>
      </BrowserRouter>
      
     
    );
  }
}
export default App;

