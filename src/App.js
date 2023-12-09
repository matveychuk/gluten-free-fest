import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Welcome from "./screens/Welcome";
import Info from "./screens/Info";
import Registration from "./screens/Registration";
import Dashboard from "./screens/Dashboard";
import useIsUserRegistered from "./hooks/useIsUserRegistered";
import UserContext from "./contexts/UserContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0c9e99",
    },
    secondary: {
      main: "#fd655a",
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
            <Routes>
              {/* <Route exact path="*" component={Welcome} /> */}
              <Route exact path="/" element={<Welcome />} />
              <Route path="/info" element={isUserRegistered ? <Info /> : <Registration />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
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
