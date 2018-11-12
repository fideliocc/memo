import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";

// Import Private Route Component
import PrivateRoute from './components/common/PrivateRoute';

// Import layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import EditPassword from './components/edit-password/EditPassword';
import Profile from './components/profile/Profile';
import PostForm from './components/posts/PostForm';
import Post from './components/post/Post';
import EditPost from './components/admin-components/edit-post/EditPost'
import NotFound from './components/not-found/NotFound';

import AdminLogin from "./components/admin-components/auth/Login"
import AdminDashboard from "./components/admin-components/dashboard/Dashboard"

import "./App.css";


// Check for token in the whole app
if (localStorage.jwtToken) {
  // Set Token in Auth header
  setAuthToken(localStorage.jwtToken);
  // Decode Token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile())
    // Redirect to Login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
              {/* De acá llama a Posts!! */}
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Switch>
                <Route exact path="/admin/login" component={AdminLogin} />
                </Switch>
                <Route exact path="/login" component={Login} />
                <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                <PrivateRoute exact path="/profile/:handle" component={Profile} />
                </Switch>

                <Switch>
                <PrivateRoute exact path="/admin" component={AdminDashboard} />
                </Switch>

                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
              </Switch>
              <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
            <Switch>
            <PrivateRoute
              exact
              path="/edit-password"
              component={EditPassword}
            />
          </Switch>
                <Switch>
                  <PrivateRoute exact path="/posts" component={PostForm} />
              </Switch>
              <Switch>
                  <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Switch>
                  <PrivateRoute exact path="/admin/post/:id/edit" component={EditPost} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
          <Footer />
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
