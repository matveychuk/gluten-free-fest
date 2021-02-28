import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { HashRouter, Switch, Route } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Welcome from "./screens/Welcome";
import Info from "./screens/Info";
import UsersList from "./screens/UsersList";
import AddCompany from "./screens/AddCompany";
import Registration from "./screens/Registration";
import useIsUserRegistered from "./hooks/useIsUserRegistered";
import UserContext from "./contexts/UserContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b2332e",
    },
    secondary: {
      main: "#728b48",
    },
  },
});

function App() {
  const classes = useStyles();
  const [isUserRegistered, setIsUserRegistered] = useIsUserRegistered();

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider
        value={{
          isUserRegistered,
          updateUserRegistration: () => setIsUserRegistered(true),
        }}
      >
        <CssBaseline />
        <div className={classes.app}>
          <Router>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/*" component={Welcome} />
              {/* <Route path="/info">
                {isUserRegistered ? <Info /> : <Registration />}
              </Route>
              <Route path="/registration" component={Registration} />
              <Route path="/admin/events/:eventName" component={UsersList} />
              <Route path="/admin/addCompany" component={AddCompany} /> */}
            </Switch>
          </Router>
        </div>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;

const useStyles = makeStyles(() => ({
  app: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  },
}));
