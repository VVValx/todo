import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { authenticate } from "./components/firebase/Firebase";
import Menu from "./components/menu/Menu";
import Todo from "./components/todo/Todo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubScribeFromAuth = null;

    unsubScribeFromAuth = authenticate.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubScribeFromAuth();
  }, [currentUser]);

  console.log(currentUser);
  return (
    <React.Fragment>
      <Menu currentUser={currentUser} />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/" component={Todo} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
