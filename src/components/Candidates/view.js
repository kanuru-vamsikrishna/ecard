import { React, useState } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "../../config/axios";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";

function ViewCandidate(props) {
  const [candID, setCandID] = useState("");
  const [candidate, setCandidate] = useState({});
  const handleCandChange = (e) => {
    setCandID(e.target.value);
  };
  const handleSearch = (e) => {
    axios
      .get(`/candidate/${candID}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        console.log(response.data.response);
        const candidate = response.data.response;
        setCandidate(candidate);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Cannot find candidate`,
        });
      });
  };
  const download = (e) => {
    console.log(e.target.href);
    axios({
      url: e.target.href,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <center>
        <h2>View Candidate</h2>
        <br />
        <form>
          <TextField
            label="Search Id"
            value={candID}
            id="fullWidth"
            onChange={handleCandChange}
          />
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </Button>
        </form>
      </center>
      {candidate._id && (
        <center>
          <Card
            sx={{ maxWidth: 400 }}
            style={{ marginTop: "10px" }}
            variant="outlined"
          >
            <CardContent>
              <Avatar
                alt="Remy Sharp"
                src={candidate.photo && candidate.photo}
                sx={{ width: 150, height: 150 }}
              />
              <Button>
                <a href={candidate.photo} onClick={(e) => download(e)}>
                  Download Photo
                </a>
              </Button>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Name : {candidate.name && candidate.name}
              </Typography>
              <Typography variant="h5" component="div">
                Age : {candidate.age && candidate.age}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Gender : {candidate.gender && candidate.gender}
              </Typography>
              <Typography variant="body2">
                Highest Qualification :{" "}
                {candidate.qualification && candidate.qualification}
              </Typography>
              <Typography variant="body2">
                Signature :
                <img
                  src={candidate.signature && candidate.signature}
                  width={200}
                  alt="sign"
                />
              </Typography>
            </CardContent>
          </Card>
        </center>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
  };
};

export default connect(mapStateToProps)(ViewCandidate);
