import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordReset";
import HomePage from "../Home";
import ProfilePage from "../Profile";
import * as ROUTES from "../../Constants/routes";
import { withAuthentication } from "../Session";
import NotePage from "../Notes";
import Create from "../Notes/Create";
import Edit from "../Notes/Edit";
import Show from "../Notes/Show";

const App = () => (
  <Router>
    <Navigation />
    <div className='container'>
      <div>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route
          exact
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={ProfilePage} />
        <Route exact path={ROUTES.NOTES} component={NotePage} />
        <Route exact path={ROUTES.CREATE} component={Create} />
        <Route exact path={ROUTES.EDIT} component={Edit} />
        <Route exact path={ROUTES.SHOW} component={Show} />
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
