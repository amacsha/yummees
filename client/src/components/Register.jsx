import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import apiServiceJWT from "./APISERVICEJWT";

const LOGO = import.meta.env.VITE_LOGO;

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { username, email, password };
      const res = await apiServiceJWT.register(newUser);

      if (res.error) {
        alert(res.message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="Register">
      <Navbar.Brand href="/">
        <img
          alt="line draw smiley face"
          src={LOGO}
          width="80"
          height="80"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}

export default Register;
