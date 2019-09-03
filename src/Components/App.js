import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import  Login  from './Login'
import  Nav  from './Nav'
import  Home from './Home';
import About from './About'
import Signup from './Signup'
import Chat from './Chat';


class App extends React.Component {
    state = {
      categorySelected: 0
    }


  onCategoryChange = selectedCat => {
    console.log("selected category: " + selectedCat)
    this.setState({
        categorySelected : selectedCat
    })  
}

    render(){
      return (
        <div>
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
      );
      
  }
}


export default App;