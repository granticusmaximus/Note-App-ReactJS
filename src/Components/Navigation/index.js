import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../Constants/routes";
import { AuthUserContext } from "../Session";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand href='/'>Notes App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink>
                <Link to={ROUTES.HOME}>Home</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to={ROUTES.NOTES}>Notes</Link>
              </NavLink>
            </NavItem>
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
