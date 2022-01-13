import { React, useState } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Button,
  Card,
  CardActions,
  FormControl,
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
  const download = (photo) => {
    axios({
      url: photo,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        console.log(response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${candidate._id}.jpg`);
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
          {/* <FormControl
            variant="outlined"
            sx={{
              width: "60ch",
            }}
          > */}
          <TextField
            label="Search Id"
            value={candID}
            onChange={handleCandChange}
            sx={{
              width: "60ch",
            }}
          />
          {/* </FormControl> */}
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
              <Button onClick={() => download(candidate.photo)}>
                Download Photo
              </Button>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Name : {candidate.name && candidate.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Age : {candidate.age && candidate.age}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Gender : {candidate.gender && candidate.gender}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Highest Qualification :{" "}
                {candidate.qualification && candidate.qualification}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
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
