import React from "react";
import "./App.css";
// import './components/homepage';
import Homepage from "./components/homepage";
import Posts from "./components/posts";
import Navigation from "./components/navigation";
import Post from "./components/post";
import ErrorPage from "./components/errorpage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/posts/:id" component={Post} />
          <Route path="/posts" component={Posts} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/" exact component={Homepage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
