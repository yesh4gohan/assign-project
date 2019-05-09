import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import SearchBar from "./components/searchBar";
import UserPage from "./components/userPage";
import SingleRepo from './components/singleRepo';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/" component={SearchBar} />
              <Route exact path="/user" component={UserPage} />
              <Route exact path='/user/:id' component={SingleRepo} />
              <Route path="*" component={() => <div>Not found</div>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
