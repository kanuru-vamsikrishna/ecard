import React from "react";
import { connect } from "react-redux";

function Account(props) {
  return (
    <div>
      <h2>Account Info</h2>
      <p>Name: {props.user.username}</p>
      <p>Email: {props.user.email}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Account);
