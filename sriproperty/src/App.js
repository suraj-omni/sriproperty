import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
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
import AdReview from "./components/AdReview";
import AdminAdvertList from "./components/AdminAdvertList";
import SearchAdvert from "./components/SearchAdvert";
import SPFooter from "./components/spfooter";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/authroute";
import ProtectedRoute from "./components/common/protectedRoute";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";

import { SET_AUTHENTICATED } from "./redux/types";
import { logOutUser, getUserData } from "./redux/actions/userActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const MainMenu = lazy(() => import("./components/mainmenu"));

// uat
// axios.defaults.baseURL =
//   "https://us-central1-sriproperty-8d3b1.cloudfunctions.net/api";

// live
axios.defaults.baseURL =
  "https://us-central1-sriproperty-b397e.cloudfunctions.net/api";

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
    window.location.assign("/login");
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <Row className="mx-auto">
        <Col xs={12} className="maincontainer-col">
          <Suspense fallback={<div className="loader mx-auto"></div>}>
            <MainMenu></MainMenu>
          </Suspense>
        </Col>
        <Col xs={12} className="maincontainer-col">
          <Switch>
            <AuthRoute path="/register" component={Register}></AuthRoute>
            <AuthRoute path="/login" component={Login}></AuthRoute>
            <ProtectedRoute
              path="/updateprofile"
              component={updateprofile}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/adreview/:id"
              component={AdReview}
            ></ProtectedRoute>
            <Route path="/ad/:id" component={AdView}></Route>
            <ProtectedRoute path="/myads" component={MyAds}></ProtectedRoute>
            <ProtectedRoute
              path="/postad/category"
              component={AddAdvertSelectAdCategory}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/postad/uploadimage"
              component={AddAdvertImageUpload}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/postad/details"
              component={AddAdvertDetails}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/postad"
              component={AddAdvertSelectAdType}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/editad/details/:id"
              component={EditAdvertDetails}
            ></ProtectedRoute>
            <Route
              path="/search/:district/:category/:adtype"
              component={SearchAdvert}
            ></Route>
            <ProtectedRoute
              path="/admin"
              component={AdminAdvertList}
            ></ProtectedRoute>
            <Route path="/" component={Home}></Route>
          </Switch>
        </Col>
        <SPFooter></SPFooter>
      </Row>
    </Provider>
  );
}

export default withRouter(App);
