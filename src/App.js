import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/">
        <Search />
      </Route>
      <Route path="/profile/:username">
        <Profile username />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
export default App;
