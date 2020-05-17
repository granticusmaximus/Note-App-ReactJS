import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import * as ROUTES from "../../Constants/routes";

const Landing = () => (
  <div className='container'>
    <h1>React Notes Application</h1>
    <p>
      Welcome to this application. This is a simple notes taking application. It
      is written with ReactJS and uses Firebase for real time data storage.
    </p>
    <hr />
    <center>
      <p>
        <Button color='warning'>
          <Link to={ROUTES.SIGN_IN}>Login</Link>
        </Button>
      </p>
    </center>
    <p></p>
  </div>
);

export default Landing;
