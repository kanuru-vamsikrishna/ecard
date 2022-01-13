import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
// import Register from "./Register";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { startLogin } from "../actions/usersActions";

const useStyles = makeStyles({
  cards: {
    height: 300,
    width: 500,
    padding: 10,
  },
  button: {},
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [type, setType] = useState("password");
  const classes = useStyles();

  const handleCheckbox = (e) => {
    setType(type === "password" ? "text" : "password");
  };
  const handleInputChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };
  const handleClick = () => {
    return navigate("/user/register");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: inputs.email,
      password: inputs.password,
    };
    console.log(formData);
    const redirect = () => {
      return navigate("/user/account");
    };
    dispatch(startLogin(formData, redirect));
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}></Grid>
        <Grid item xs={4}>
          <Card className={classes.cards}>
            <center>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              ></Typography>
              <form onSubmit={handleSubmit}>
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
                      name="email"
                      size="small"
                      value={inputs.email}
                      onChange={handleInputChange}
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
                      name="password"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleCheckbox}
                          >
                            {type === "password" ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={inputs.password}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </div>
                <br />
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "50ch",
                    }}
                    className={classes.Button}
                    color="success"
                  >
                    Log In
                  </Button>
                </div>
              </form>
              <Button
                variant="outlined"
                sx={{
                  width: "35ch",
                  m: 3,
                }}
                onClick={() => {
                  handleClick();
                }}
              >
                Create New Account
              </Button>
            </center>
          </Card>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default connect()(Login);
