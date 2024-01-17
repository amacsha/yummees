import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import apiServiceJWT from "./APISERVICEJWT";
import Auth from "./Auth";

const LOGO = import.meta.env.VITE_LOGO;

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const res = await apiServiceJWT.login(user);

      if (res.error) {
        alert(res.message);
      } else {
        localStorage.setItem("accessToken", res.accessToken);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("An error occurred during login.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Form onSubmit={handleSubmit} className="Login">
      <Navbar.Brand href="/">
        <img
          alt="line draw smiley face"
          src={LOGO}
          width="80"
          height="80"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <div className="button-container">
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </Form>
  );
};

export default Login;
