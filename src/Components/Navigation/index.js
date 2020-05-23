import React, { useState } from "react";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../Constants/routes";
import * as ROLES from "../../Constants/roles";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../Session";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand href='/notes'>Notes App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            {!!authUser.roles[ROLES.ADMIN] && (
              <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
              </li>
            )}
          </Nav>
          <NavbarText>
            <SignOutButton />
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

const NavigationNonAuth = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color='light' light expand='md'>
      <NavbarBrand href='/'>Notes App</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar></Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
