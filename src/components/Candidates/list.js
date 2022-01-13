import React, { useEffect } from "react";
import { connect } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { startGetCandidates } from "../../actions/candidatesActions";

function ListCandidates(props) {
  useEffect(() => {
    props.dispatch(startGetCandidates());
  }, []);
  return (
    <div>
      <h2>List of Candidates - {props.candidate.length}</h2>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Qualification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.candidate.map((cand, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {cand.name}
                </TableCell>
                <TableCell align="right">{cand.age}</TableCell>
                <TableCell align="right">{cand.gender}</TableCell>
                <TableCell align="right">{cand.qualification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
  };
};

export default connect(mapStateToProps)(ListCandidates);
