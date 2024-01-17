import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Logout from "./Logout";

const LOGO = import.meta.env.VITE_LOGO;

function NavB({ tokenName }) {
  const location = useLocation();
  const hideComponent =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return !hideComponent ? (
    <>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container className>
          <div className="logoContainer">
            <Navbar.Brand href="/">
              <img
                alt="line draw smiley face"
                src={LOGO}
                width="80"
                height="80"
                className="d-inline-block align-top"
              />
              {""}
            </Navbar.Brand>
          </div>

          <div className="navLinks">
            <Navbar></Navbar>

            <Navbar>
              <Nav className="me-auto">
                <Nav.Link href="/" className="nav-link-margin-left">
                  Home
                </Nav.Link>
                <Nav.Link href="explore" className="nav-link-margin-right">
                  Explore
                </Nav.Link>
              </Nav>
            </Navbar>
          </div>

          <div className="userControl">
            <div className="userControl">
              {[DropdownButton].map((DropdownType, idx) => (
                <DropdownType
                  as={ButtonGroup}
                  key={idx}
                  id={`dropdown-button-drop-${idx}`}
                  size="sm"
                  variant="success"
                  title="account"
                >
                  <Logout setIsAuthenticated={setIsAuthenticated} />
                  {/* <Dropdown.Divider />
                  <Dropdown.Item href="/account">profile</Dropdown.Item> */}
                </DropdownType>
              ))}
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  ) : null;
}

export default NavB;
