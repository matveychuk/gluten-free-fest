import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import PeopleIcon from "@material-ui/icons/People";
import BusinessIcon from "@material-ui/icons/Business";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

const MainListItems = () => {
  const classes = useStyles();
  return (
    <div>
      <Link to="/admin/events/new_yaer_2024" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Участники" />
        </ListItem>
      </Link>
      <Link to="/admin/companies" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Компанії" />
        </ListItem>
      </Link>
      <Link to="/admin/addCompany" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <LibraryAddIcon />
          </ListItemIcon>
          <ListItemText primary="Додати компанію" />
        </ListItem>
      </Link>
    </div>
  );
};

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "black",
    fontWeight: 700,
  },
});

export default MainListItems;
