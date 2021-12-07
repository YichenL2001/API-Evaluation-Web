import "./App.css";
import React from "react";
import Home from "./components/main-page/Home";
import LoginPage from "./components/Login/LoginPage";
import AdminLogin from "./components/Login/AdminLogin";
//import SignupPage from "./components/Login/SignupPage";
import Python from "./components/language-page/Pythonpage";
import Jspage from "./components/language-page/Jspage";
import Javapage from "./components/language-page/Javapage";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Profile from "./components/profile-page/Profile";
import StaticProfile from "./components/profile-page/ProfileStatic";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import AdminPages from "./components/AdminPages";
import Admin from "./components/Admin";
import LibraryPage from "./components/Reviews-page/LibraryPage";
import { checkSession } from "./actions/user";

//App component
class App extends React.Component {
  componentDidMount() {
    checkSession(this); // sees if a user is logged in
    //pushAdmin();
    //pushLibs("java");
    //pushLibs("js");
    //pushLibs("python");
  }
  state = {
    currentUser: null,
    id: null,
    is_regUser: null,
    fav_posts: [],
  };
  render() {
    const { currentUser, is_regUser } = this.state;
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={
                ["/login", "/profile"] /* any of these URLs are accepted. */
              }
              render={(props) => (
                <div>
                  {/* Different componenets rendered depending on if someone is logged in. */}
                  {!currentUser ? (
                    <LoginPage {...props} app={this} /> //not a current user
                  ) : is_regUser ? (
                    <Profile {...props} app={this} /> //is a regular user
                  ) : (
                    <Admin {...props} /> // is a admin
                  )}
                </div> // ... spread operator - provides all of the props in the props object
              )}
            />
            <Route
              exact
              path="/profile/:id"
              render={(props) => <StaticProfile app={this} user={props} />}
            />
            <Route
              exact
              path={
                ["/adminLogin", "/admin"] /* any of these URLs are accepted. */
              }
              render={(props) => (
                <div>
                  {/* Different componenets rendered depending on if someone is logged in. */}
                  {!currentUser ? (
                    <AdminLogin {...props} app={this} /> //not a current user
                  ) : is_regUser ? (
                    <Profile {...props} app={this} /> //is a regular user
                  ) : (
                    <Admin {...props} /> // is a admin
                  )}
                </div> // ... spread operator - provides all of the props in the props object
              )}
            />
            {/* <Route
              exact
              path="/adminLogin"
              render={() => <AdminLogin app={this} />}
            /> */}

            <Route exact path="/" render={() => <Home app={this} />} />
            <Route exact path="/python" render={() => <Python app={this} />} />
            <Route
              exact
              path="/javascript"
              render={() => <Jspage app={this} />}
            />
            <Route exact path="/java" render={() => <Javapage app={this} />} />
            <Route exact path="/header" render={() => <Header app={this} />} />
            {/* <Route exact path="/admin" render={() => <Admin />} /> */}
            <Route
              exact
              path="/adminPages"
              render={() => <AdminPages app={this} />}
            />
            <Route
              exact
              path="/LibraryPage/:libId"
              render={(props) => <LibraryPage app={this} lib={props} />}
            />
            {/* 404 if URL isn't expected. */}
            <Route render={() => <div>404 Not found</div>} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
