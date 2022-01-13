import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startAddCandidates } from "../../actions/candidatesActions";
import CandidateForm from "./form";

function AddCandidate(props) {
  const navigate = useNavigate();
  const handleSubmit = (formData) => {
    const redirect = () => {
      return navigate("/candidate/list");
    };
    props.dispatch(startAddCandidates(formData, redirect));
  };
  return (
    <div>
      <center>
        <h2>Candidate Form</h2>
        <CandidateForm handleSubmit={handleSubmit} />
      </center>
    </div>
  );
}

export default connect()(AddCandidate);
