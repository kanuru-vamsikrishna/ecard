import { React, useState } from "react";
import { connect } from "react-redux";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "../../config/axios";
import Swal from "sweetalert2";

function CandidateForm(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [photo, setPhoto] = useState("");
  const [signature, setSignature] = useState("");
  const [open, setOpen] = useState(false);

  const qualifications = [
    "SSC",
    "+2",
    "B.Com",
    "M.Com",
    "B.Sc",
    "M.Sc",
    "B.Tech",
    "M.Tech",
    "BBA",
    "MBA",
    "Phd",
  ];

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleQualifyChange = (e) => {
    console.log(e.target.value);
    setQualification(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file.size);
    if (file.size < 1000000) {
      alert("File Size should be more than 1MB");
    } else {
      const formData = new FormData();
      formData.append("image", file);
      axios
        .post("/candidate/photo", formData, {
          headers: {
            "x-auth": localStorage.getItem("authToken"),
          },
        })
        .then((response) => {
          console.log(response.data);
          const image = response.data.uploaderCreated.image;
          setPhoto(image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSignChange = (e) => {
    var _URL = window.URL || window.webkitURL;
    console.log(e.target.files);
    const file = e.target.files[0];
    const img = new Image();
    var objectUrl = _URL.createObjectURL(file);
    img.onload = function () {
      const width = this.width;
      const height = this.height;
      console.log(width, height);
      if (width <= 512 && height <= 512) {
        const formData = new FormData();
        formData.append("image", file);
        axios
          .post("/candidate/sign", formData, {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            console.log(response.data);
            const sign = response.data.signatureCreated.image;
            setSignature(sign);
          });
      } else {
        alert("Image dimensions should be less than 512 X 512");
      }
    };
    img.src = objectUrl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      age: age,
      gender: gender,
      qualification: qualification,
      photo: photo,
      signature: signature,
    };
    console.log(formData);
    const closeDialog = () => {
      setOpen(false);
    };
    props.handleSubmit(formData, closeDialog);
  };
  return (
    <div>
      <center>
        <Button variant="outlined" onClick={handleClickOpen}>
          Candidate Form
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          disableEnforceFocus
          disableBackdropClick={true}
        >
          <DialogTitle>Add Candidate</DialogTitle>
          <DialogContent>
            <br />
            <form>
              <div>
                <FormControl
                  variant="outlined"
                  sx={{
                    width: "60ch",
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-name">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-name"
                    label="Name"
                    size="small"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </FormControl>
              </div>
              <br />
              <div>
                <FormControl
                  variant="outlined"
                  sx={{
                    width: "60ch",
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-age">Age</InputLabel>
                  <OutlinedInput
                    type="text"
                    id="outlined-adornment-age"
                    label="Age"
                    size="small"
                    name="age"
                    value={age}
                    onChange={handleAgeChange}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  component="fieldset"
                  sx={{
                    width: "60ch",
                  }}
                >
                  <br />
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gender"
                      value={gender}
                      onChange={handleGenderChange}
                    >
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Others"
                        control={<Radio />}
                        label="Others"
                      />
                    </RadioGroup>
                  </FormControl>
                </FormControl>
              </div>
              <br />
              <div>
                <FormControl
                  component="fieldset"
                  sx={{
                    width: "60ch",
                  }}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Highest Qualification
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={qualification}
                    label="Highest Qualification"
                    onChange={handleQualifyChange}
                  >
                    {qualifications.map((qual, i) => {
                      return (
                        <MenuItem key={i} value={qual}>
                          {qual}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <br />
              <div>
                <InputLabel htmlFor="profilePicture">
                  Profile Picture
                </InputLabel>
                <br />
                <input
                  type="file"
                  id="profilePicture"
                  name="file"
                  accept="image/jpeg"
                  onChange={handleFileChange}
                />
              </div>
              <br />
              <div>
                <InputLabel htmlFor="signature">Signature</InputLabel>
                <br />
                <input
                  type="file"
                  id="signature"
                  name="file"
                  accept="image/jpeg"
                  onChange={handleSignChange}
                />
              </div>
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={{
                  width: "12ch",
                  m: 2,
                }}
              >
                Submit
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </center>
    </div>
  );
}

export default connect()(CandidateForm);
