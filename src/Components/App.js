import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import  Login  from './Login'
import  Nav  from './Nav'
import  Home from './Home';
import About from './About'
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
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
            </div>
          </Router>  
        </div>  
      );
      
  }
}


export default App;