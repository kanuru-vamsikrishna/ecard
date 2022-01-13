import { React, useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "../../config/axios";
import Swal from "sweetalert2";
import { startDeleteCandidate } from "../../actions/candidatesActions";

function RemoveCandidate(props) {
  const [cand, setCand] = useState("");
  const dispatch = useDispatch();
  const handleCandChange = (e) => {
    setCand(e.target.value);
  };
  const handleSearch = (e) => {
    axios
      .get(`/candidate/${cand}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log(response.data.response);
        const candidate = response.data.response;
        dispatch(startDeleteCandidate(candidate._id));
        Swal.fire({
          icon: "Success",
          title: "Removed",
          text: "Successfully Removed Candidate",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Cannot find candidate`,
        });
      });
  };
  return (
    <div>
      <center>
        <h2>Remove Candidate</h2>
        <br />
        <form>
          <TextField
            label="Search Id"
            value={cand}
            id="fullWidth"
            onChange={handleCandChange}
          />
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => {
              handleSearch();
            }}
          >
            Remove
          </Button>
          <br />
        </form>
      </center>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
  };
};

export default connect(mapStateToProps)(RemoveCandidate);
