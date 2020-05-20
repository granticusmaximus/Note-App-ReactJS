import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { PasswordForgetLink } from "../PasswordForget";
import { Form, Input, Button } from "reactstrap";
import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../Constants/routes";

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.NOTES);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className='App-box'>
        <Form onSubmit={this.onSubmit}>
          <Input
            name='email'
            value={email}
            onChange={this.onChange}
            type='text'
            placeholder='Email Address'
          />
          <br />
          <Input
            name='password'
            value={password}
            onChange={this.onChange}
            type='password'
            placeholder='Password'
          />
          <br />
          <Button disabled={isInvalid} type='submit'>
            Sign In
          </Button>

          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
