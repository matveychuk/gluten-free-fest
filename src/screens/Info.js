import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { grey } from "@material-ui/core/colors";
import bgImage from "../assets/cart.jpg";
import asparagus from "../assets/asparagus.jpg";
import ginger from "../assets/gingerAndWhite.jpg";
import vitaminka from "../assets/vitaminka2021.jpg";
import norimazka from "../assets/norimazka.jpg";
import chips from "../assets/chips.jpg";
import scvira from "../assets/scvira.jpg";
import niglutenu from "../assets/niglutenu.jpg";
import savin from "../assets/savin.jpg";

import config from "../config";
import axios from "axios";

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" align="center" className={classes.footer}>
      {"Copyright © "}
      <Link color="inherit" href="https://matveychuk.github.io" target="_blank">
        Sasha Matveychuk
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Info() {
  const classes = useStyles();

  const [companies, setCompanies] = useState([]);

  const getCompanyImage = (company) => {
    switch (company.name) {
      case "Аспарагус-ЛТД":
        return asparagus;
      case "VitaminiKa":
        return vitaminka;
      case "ТМ 'Ginger and White'":
        return ginger;
      case "ТМ Сквирянка":
        return scvira;
      case "NoriMazka":
        return norimazka;
      case "Toni Cocos":
        return chips;
      case "NiGlutenu інтернет-магазин":
        return niglutenu;
      case "Savin Product":
        return savin;
      default:
        return company.imageUrl;
    }
  };

  useEffect(() => {
    axios
      .get(config.api + "/getCompanies")
      .then((res) => {
        console.log("res", res);
        setCompanies(res.data.companies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <main
        style={{
          backgroundColor: "#3d3839",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "40%",
          flex: 1,
        }}
      >
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ color: "white" }}
            >
              Вітаємо на online ярмарку безглютенової (Gluten free) продукції!
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {!!companies.length &&
              companies.map((company, index) =>
                company.show ? (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card className={classes.card} style={{ backgroundColor: grey[100] }}>
                      <CardMedia className={classes.cardMedia} image={getCompanyImage(company)} title="Image title" />
                      <CardContent className={classes.cardContent}>
                        <Typography className={classes.name} gutterBottom variant="h5" component="h2">
                          {company.name}
                        </Typography>
                        <Typography className={classes.description}>
                          {/* {trimText(company.description, 300)} */}
                          {company.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {company.name === "TM “Good Line”" && (
                          <Button size="small" variant="contained" color="primary">
                            <Link
                              color="inherit"
                              href="https://docs.google.com/forms/d/e/1FAIpQLSe-pQ4BdQ22DNO8MxI_5yYKRia8kHCQ24HO57QtdAdnvb1Pjg/viewform"
                              target="_blank"
                              style={{ color: "white" }}
                            >
                              Оформити замовлення
                            </Link>
                          </Button>
                        )}
                        <Button size="small" variant="contained" color="secondary">
                          <Link color="inherit" href={company.url} target="_blank" style={{ color: "white" }}>
                            Перейти на сайт
                          </Link>
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ) : null
              )}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Контакти організаторів
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          Українська спілка целіакії
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          +380979495868, festglutenfree@gmail.com
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.primary.main,

    padding: theme.spacing(3, 0, 2),
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
    backgroundSize: "contain",
    backgroundColor: grey[300],
  },
  cardContent: {
    flexGrow: 1,
  },
  description: {
    fontSize: "0.750rem",
  },
  footer: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(1),
    color: "white",
  },
  name: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));
