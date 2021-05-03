import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Welcome from "./screens/Welcome";
import Info from "./screens/Info";
import Registration from "./screens/Registration";
import Dashboard from "./screens/Dashboard";
import useIsUserRegistered from "./hooks/useIsUserRegistered";
import UserContext from "./contexts/UserContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ed3528",
    },
    secondary: {
      main: "#b6e43b",
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
              <Route path="/info">
                {isUserRegistered ? <Info /> : <Registration />}
              </Route>
              <Route path="/registration" component={Registration} />
              <Route path="/admin" component={Dashboard} />
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
