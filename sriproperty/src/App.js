import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Register from "./components/register";
import Home from "./components/home";
import Login from "./components/login";
import updateprofile from "./components/updateprofile";
import AddAdvertSelectAdType from "./components/AddAdvertSelectAdType";
import AddAdvertSelectAdCategory from "./components/AddAdvertSelectAdCategory";
import AddAdvertDetails from "./components/AddAdvertDetails";
import EditAdvertDetails from "./components/EditAdvertDetails";
import AddAdvertImageUpload from "./components/AddAdvertImageUpload";
import MyAds from "./components/MyAds";
import AdView from "./components/AdView";
import SPFooter from "./components/spfooter";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/authroute";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";

import { SET_AUTHENTICATED } from "./redux/types";
import { logOutUser, getUserData } from "./redux/actions/userActions";

const MainMenu = lazy(() => import("./components/mainmenu"));

const token = localStorage.FBIDToken;
//console.log(localStorage.FBIDToken);

if (token) {
  const decodedToken = jwtDecode(token);
  const history = null;
  if (this && this.props && this.props.history) {
    history = this.props.history;
  }
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOutUser(history));
    window.location.assign("http://localhost:3000/login");
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Suspense fallback={<div className="loader mx-auto"></div>}>
            <MainMenu></MainMenu>
          </Suspense>
        </header>

        <div className="content">
          <Switch>
            <AuthRoute path="/register" component={Register}></AuthRoute>
            <AuthRoute path="/login" component={Login}></AuthRoute>
            <Route path="/updateprofile" component={updateprofile}></Route>
            <Route path="/ad/:id" component={AdView}></Route>
            <Route path="/myads" component={MyAds}></Route>
            <Route
              path="/postad/category"
              component={AddAdvertSelectAdCategory}
            ></Route>
            <Route
              path="/postad/uploadimage"
              component={AddAdvertImageUpload}
            ></Route>
            <Route path="/postad/details" component={AddAdvertDetails}></Route>
            <Route path="/postad" component={AddAdvertSelectAdType}></Route>
            <Route
              path="/editad/details/:id"
              component={EditAdvertDetails}
            ></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </div>
        <SPFooter></SPFooter>
      </div>
    </Provider>
  );
}

export default App;
