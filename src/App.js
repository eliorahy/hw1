import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Employee } from "./components";
import EditEmployee from "./components/EditEmployee";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/employee" exact component={() => <Employee />} />
          <Route path='/employees/:id' component={EditEmployee}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;