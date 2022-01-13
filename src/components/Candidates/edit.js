import React from "react";
import { connect } from "react-redux";
import CandidateForm from "./form";

function CandidateEdit(props) {
  return (
    <div>
      <h2>Edit Candidate</h2>
      <CandidateForm />
    </div>
  );
}

export default connect()(CandidateEdit);
