import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import 'typeface-roboto';
import  Login  from './Login'
import  Nav  from './Nav'
import  Home from './Home';
import About from './About'
import Signup from './Signup'
import Chat from './Chat';

// Theme for material ui
const theme = createMuiTheme({
    primary: "#25274D",
    primaryLight: "#464866",
    secondary: "#B8AB77",
    palette: {
      primary: { 500: "#25274D", A400: "#25274D" },
      secondary: { 500: '#ffffff', A400: '#ffffff' },
    }
});

const useStyles = theme => ({
  root: {
      background: "url('https://www.toptal.com/designers/subtlepatterns/patterns/brushed.png')",
      height: "100vh",
  },
}); 

class App extends React.Component {
  state = {
    categorySelected: 0
  }


onCategoryChange = selectedCat => {
  this.setState({
      categorySelected : selectedCat
  })  
}

    render(){
      const { classes } = this.props;

      return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Router>
            <div>
              <Nav selectedCat={this.state.categorySelected} onSelect={this.onCategoryChange}/>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/chat" component={Chat} />
            </div>
          </Router>  
        </div>  
        </ThemeProvider>
      );
  }
}

export default withStyles(useStyles)(App);