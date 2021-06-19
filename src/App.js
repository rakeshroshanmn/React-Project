import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Signin" component={Signin} />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
