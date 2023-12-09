import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";

import config from "../config";
import axios from "axios";

const headCells = [
  { id: "name", sortable: true, label: "Назва компанії" },
  { id: "show", sortable: false, label: "Показувати у списку" },
  // { id: "delete", sortable: false, label: "Видалити" },
  { id: "edit", sortable: false, label: "Редагувати" },
];

const CompaniesList = () => {
  const classes = useStyles();

  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    axios
      .get(config.api + "/getCompanies")
      .then((res) => {
        console.log("res", res);
        setCompanies(res.data.companies);
      })
      .catch((err) => console.log(err));
  };

  const handleShowCompany = (e, id) => {
    axios
      .post(config.api + "/showCompany", { id, show: e.target.checked })
      .then((res) => {
        console.log("res", res);
        fetchList();
      })
      .catch((err) => console.log(err));
  };

  if (!companies.length) return null;
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead padding="checkbox">
            <TableRow>
              {headCells.map((headCell) => (
                <StyledTableCell key={headCell.id} align="center">
                  <TableSortLabel>{headCell.label}</TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!companies.length &&
              companies.map((row, index) => {
                return (
                  <StyledTableRow hover tabIndex={-1} key={row.updatedAt}>
                    <TableCell
                      align="center"
                      id={row.id}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={row.show}
                        onChange={(e) => handleShowCompany(e, row._id)}
                      />
                    </TableCell>
                    {/* <TableCell align="center">
                      <DeleteIcon />
                    </TableCell> */}
                    <TableCell align="center">
                      <Link
                        to={`/admin/addCompany/${row._id}`}
                        className={classes.link}
                      >
                        <EditIcon />
                      </Link>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default CompaniesList;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  submit: {
    margin: theme.spacing(3, 8, 2),
  },
  link: {
    color: "grey",
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
