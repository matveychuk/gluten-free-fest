import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import AddCircle from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import config from "../config";
import axios from "axios";

export default function SignIn() {
  const classes = useStyles();
  const { companyId } = useParams();

  const initialData = {
    name: "",
    description: "",
    url: "",
    imageUrl: "",
  };
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (companyId) {
      console.log("companyId", companyId);
      axios
        .get(config.api + "/admin/companies/" + companyId)
        .then((res) => {
          setData(res.data.company);
        })
        .catch((err) => console.log(err));
    }
  }, [companyId]);

  const [error, setError] = useState({
    name: false,
    description: false,
    url: false,
    imageUrl: false,
  });

  const handleInput = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const validateField = (data) => {
    if (!data.name || !data.description || !data.url || !data.imageUrl) {
      setError({
        name: !data.name,
        description: !data.description,
        url: !data.url,
        imageUrl: !data.imageUrl,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, url, imageUrl } = data;
    validateField(data);
    if (!name || !description || !url || !imageUrl) return;
    axios
      .post(config.api + "/admin/addCompany", data)
      .then((res) => {
        console.log("res", res);
        setData(initialData);
      })
      .catch((err) => console.log(err));
  };

  console.log("data", data);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Додати компанію-учасника
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Назва"
            name="name"
            autoFocus
            value={data.name}
            onChange={handleInput}
            error={error.name}
            helperText={error.name ? "Не може бути пустим" : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Опис компанії"
            name="description"
            multiline={true}
            rows={5}
            value={data.description}
            onChange={handleInput}
            error={error.description}
            helperText={error.description ? "Не може бути пустим" : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="url"
            label="Адреса сайту"
            type="text"
            id="url"
            value={data.url}
            onChange={handleInput}
            error={error.url}
            helperText={error.url ? "Не може бути пустим" : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="imageUrl"
            label="Url/Адреса логотипу"
            type="text"
            id="imageUrl"
            value={data.imageUrl}
            onChange={handleInput}
            error={error.imageUrl}
            helperText={error.imageUrl ? "Не може бути пустим" : ""}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Додати
          </Button>
        </form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
