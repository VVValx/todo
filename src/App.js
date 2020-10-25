import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import {
  authenticate,
  createUserProfile,
} from "./components/firebase/Firebase";
import { userContext } from "./contexts/UserContext";
import { authContext } from "./contexts/AuthContext";
import Menu from "./components/menu/Menu";
import Todo from "./components/todo/Todo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    let unsubScribeFromAuth = null;

    unsubScribeFromAuth = authenticate.onAuthStateChanged(async (user) => {
      if (!user) return setCurrentUser(user);
      const ref = await createUserProfile(user);

      ref.onSnapshot((snap) => {
        setCurrentUser({
          id: snap.id,
          ...snap.data(),
        });
      });
    });

    return () => unsubScribeFromAuth();
  }, []);

  const validateAuth = (value) => {
    setAuth(value);
  };

  const authValue = {
    auth,
    validateAuth,
  };
  return (
    <React.Fragment>
      <authContext.Provider value={authValue}>
        <userContext.Provider value={currentUser}>
          <Menu />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" component={Todo} />
          </Switch>
        </userContext.Provider>
      </authContext.Provider>
    </React.Fragment>
  );
}

export default App;
