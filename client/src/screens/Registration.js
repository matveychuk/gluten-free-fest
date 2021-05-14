import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/bgCeliacDay.JPG";
import { grey } from "@material-ui/core/colors";
import UserContext from "../contexts/UserContext";

import config from "../config";
import axios from "axios";

export default function Registration() {
  const { isUserRegistered, updateUserRegistration } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subscribe: false,
    event: "celiac_day2021",
    member: false,
    expiredAt: new Date("2021-05-23"),
  });

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const [sending, setSending] = useState(false);

  const handleInput = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleCheckbox = (event) => {
    setData({ ...data, [event.target.name]: event.target.checked });
  };

  const validateField = (data) => {
    // const emailRegex = new RegExp(
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // );
    if (!data.lastName || !data.lastName || !data.email) {
      setError({
        firstName: !data.firstName,
        lastName: !data.lastName,
        email: !data.email,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email } = data;
    validateField(data);
    if (!firstName || !lastName || !email) return;
    setSending(true);
    axios
      .post(config.api + "/user", data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(data));
        updateUserRegistration();
      })
      .catch((err) => console.log(err))
      .finally(() => setSending(false));
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          style={{
            backgroundColor: grey[100],
            display: "flex",
            alignItems: "center",
          }}
        >
          {sending && (
            <Container maxWidth="md" className={classes.loaderContainer}>
              <CircularProgress color="primary" />
            </Container>
          )}
          {!sending && isUserRegistered && (
            <Container maxWidth="md">
              {/* <Typography
                component="h1"
                variant="h1"
                className={classes.message}
              >
                Реєстрація пройшла успішно. Ваш промокод на знижку CELIAC.
                Ярмарок буде відкрито 15-го травня, про що Ви будете додатково
                сповіщені на електронну пошту!
              </Typography> */}
              <Typography
                component="h1"
                variant="h1"
                className={classes.message}
              >
                Реєстрація пройшла успішно. Ярмарок відкрито!
              </Typography>

              <Button
                onClick={() => history.push("/info")}
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Перейти до ярмарку
              </Button>
            </Container>
          )}
          {!sending && !isUserRegistered && (
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Реєстрація
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2} justify="flex-start">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="Ім'я"
                      autoFocus
                      value={data.firstName}
                      onChange={handleInput}
                      error={error.firstName}
                      helperText={error.firstName ? "Не може бути пустим" : ""}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Прізвище"
                      name="lastName"
                      autoComplete="lname"
                      value={data.lastName}
                      onChange={handleInput}
                      error={error.lastName}
                      helperText={error.lastName ? "Не може бути пустим" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={handleInput}
                      error={error.email}
                      helperText={error.email ? "Не може бути пустим" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="phone"
                      label="Телефон"
                      name="phone"
                      autoComplete="phone"
                      value={data.phone}
                      onChange={handleInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={data.subscribe}
                          name="subscribe"
                          onChange={handleCheckbox}
                          color="primary"
                        />
                      }
                      label="Я хочу отримувати новини щодо безглютенового харчування"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={data.member}
                          name="member"
                          onChange={handleCheckbox}
                          color="primary"
                        />
                      }
                      label="Я є членом Української спілки целіакії"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Зареєструватися та отримати промокод
                </Button>
              </form>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  color: {
    backgroundColor: "black",
  },
  root: {
    height: "100vh",
    backgroundColor: "#f5f2f3",
  },
  image: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // padding: theme.spacing(8, 0, 6),
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  confirmation: {
    padding: theme.spacing(10),
    fontStyle: "italic",
    fontSize: 18,
    textAlign: "center",
    // backgroundColor: theme.palette.secondary.main,
  },
  message: {
    padding: theme.spacing(10),
    fontSize: 26,
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
