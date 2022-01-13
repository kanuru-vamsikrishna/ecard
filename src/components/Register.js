import React, { useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { startRegister } from "../actions/usersActions";
import { useDispatch } from "react-redux";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [type, setType] = useState({});

  const handleChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handlePassword = (e) => {
    setType(type === "password" ? "text" : "password");
  };

  const handlePassChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };
    console.log(formData);
    const redirect = () => {
      return navigate("/user/login");
    };
    dispatch(startRegister(formData, redirect));
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl
            variant="outlined"
            sx={{
              width: "45ch",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-username">
              Username
            </InputLabel>
            <OutlinedInput
              type="text"
              id="outlined-adornment-username"
              label="Username"
              size="small"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <br />
        <div>
          <FormControl
            variant="outlined"
            sx={{
              width: "45ch",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-email">
              Email Address
            </InputLabel>
            <OutlinedInput
              type="text"
              id="outlined-adornment-email"
              label="Email Address"
              size="small"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <br />
        <div>
          <FormControl
            variant="outlined"
            sx={{
              width: "45ch",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              type={type}
              id="outlined-adornment-password"
              label="Password"
              size="small"
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePassword}
                  >
                    {type === "password" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              value={inputs.password}
              onChange={handlePassChange}
            />
          </FormControl>
        </div>
        <br />
        <Button type="submit" variant="contained" color="success">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Register;
