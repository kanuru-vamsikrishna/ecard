import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import { startLogOut } from "./actions/usersActions";
import AddCandidate from "./components/Candidates/create";
import ListCandidates from "./components/Candidates/list";
import ViewCandidate from "./components/Candidates/view";
import RemoveCandidate from "./components/Candidates/delete";

function App(props) {
  const handleClick = () => {
    props.dispatch(startLogOut());
  };
  return (
    <BrowserRouter>
      <div>
        {Object.keys(props.user).length === 0 ? (
          <Button color="primary">
            <Link to="/user/login">Login</Link>
          </Button>
        ) : (
          <ul>
            <h2>Welcome to eCard</h2>

            <Button color="primary">
              <Link to="/candidate/register">Register Candidate</Link>
            </Button>
            <br />
            <Button color="primary">
              <Link to="/candidate/list">List Of Candidates</Link>
            </Button>
            <br />
            <Button color="primary">
              <Link to="/candidate/view">View Candidate</Link>
            </Button>
            <br />
            <Button color="primary">
              <Link to="/candidate/delete">Remove Candidate</Link>
            </Button>
            <br />
            <Button color="primary">
              <Link
                to="#"
                onClick={() => {
                  handleClick();
                }}
              >
                Logout
              </Link>
            </Button>
          </ul>
        )}
        <Routes>
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/account" element={<Account />} />
          <Route path="/candidate/register" element={<AddCandidate />} />
          <Route path="/candidate/list" element={<ListCandidates />} />
          <Route path="/candidate/view" element={<ViewCandidate />} />
          <Route path="/candidate/delete" element={<RemoveCandidate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
