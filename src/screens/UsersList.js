import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { useParams } from "react-router-dom";

import config from "../config";
import axios from "axios";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "lastName", sortable: true, label: "Прізвище" },
  { id: "firstName", sortable: false, label: 'Ім"я' },
  { id: "email", sortable: false, label: "Електронна пошта" },
  { id: "phone", sortable: false, label: "Телефон" },
  { id: "subscribe", sortable: true, label: "Підписка" },
  { id: "member", sortable: true, label: "Член спілки" },
];

export default function UsersList() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  const { eventName } = useParams();
  useEffect(() => {
    axios
      .get(config.api + "/admin/events/" + eventName)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }, [eventName]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Прізвище");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const [selected, setSelected] = React.useState([]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const numSelected = selected.length;
  const rowCount = users.length;

  const sendReminder = () => {
    axios
      .post(config.api + "/sendReminder", selected)
      .then((res) => {
        setSelected([]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {/* <Typography
        component="h1"
        variant="h4"
        align="center"
        gutterBottom
        style={{ fontStyle: "italic", padding: 30 }}
      >
        Список зареєстрованих учасників
      </Typography> */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead padding="checkbox">
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </StyledTableCell>
              {headCells.map((headCell) => (
                <StyledTableCell
                  key={headCell.id}
                  align="center"
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {headCell.sortable && orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!users.length &&
              stableSort(users, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.email);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.email)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.email}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.lastName}
                      </TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">
                        {row.subscribe ? "+" : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {row.member ? "+" : "-"}
                      </TableCell>
                    </StyledTableRow>
                  );
                }
              )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        // fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={sendReminder}
      >
        Надіслати нагадування
      </Button>
    </>
  );
}

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
