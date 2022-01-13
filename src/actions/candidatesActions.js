import axios from "../config/axios";
import Swal from "sweetalert2";

export const setCandidates = (candidate) => {
  return { type: "GET_CANDIDATES", payload: candidate };
};

export const startGetCandidates = () => {
  return (dispatch) => {
    axios
      .get("/candidate/list", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const candidate = response.data.response;
        dispatch(setCandidates(candidate));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addCandidate = (candidate) => {
  return { type: "ADD_CANDIDATE", payload: candidate };
};

export const startAddCandidates = (formData, closeDialog) => {
  return (dispatch) => {
    axios
      .post("/candidate/register", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const candidate = response.data.response;
        dispatch(addCandidate(candidate));
        closeDialog();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateCandidate = (candidate) => {
  return { type: "UPDATE_CANDIDATE", payload: candidate };
};

export const startUpdateCandidate = (formData, id, redirect) => {
  return (dispatch) => {
    axios
      .put(`/candidate/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const candidate = response.data.response;
        dispatch(updateCandidate(candidate));
        Swal.fire({
          icon: "success",
          title: "Created",
          text: `Candidate created Successfully`,
        });
        setTimeout(() => {
          redirect();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error while creating candidate`,
        });
      });
  };
};

export const deleteCandidate = (candidate) => {
  return { type: "DELETE_CANDIDATE", payload: candidate };
};

export const startDeleteCandidate = (id) => {
  return (dispatch) => {
    axios
      .delete(`/candidate/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const candidate = response.data.response;
        dispatch(deleteCandidate(candidate));
        Swal.fire({
          icon: "Success",
          title: "Removed",
          text: `Removed Candidate Successfully`,
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
};
