import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import MerryChristmasImage from "../assets/tree.png";
import { grey } from "@material-ui/core/colors";

export default function Welcome() {
  let history = useHistory();
  const classes = useStyles();

  const goToRegistration = () => {
    history.push("/registration");
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
          style={{ backgroundColor: grey[200] }}
        >
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              {/* <Typography
                component="h1"
                variant="h3"
                align="center"
                gutterBottom
              >
                Вітаємо на першому в Україні online-ярмарку безглютенової
                продукції!
              </Typography> */}
              <Typography
                component="h1"
                variant="h3"
                align="center"
                gutterBottom
              >
                Ярмарок зачинився!
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
              >
                До зустрічі на наступному ярмарку у травні 2021р. Чекайте анонсу на сторінці {' '}
                <a href="https://www.facebook.com/Gluten-Free-Fest-101297068519846/" target='_blank'>facebook</a>.
              </Typography>
              {/* <Typography
                variant="h6"
                align="left"
                paragraph
              >
                Незважаючи на ситуацію в країні, пов'язану з Сovid-19, свято
                залишається святом і завжди хочеться порадувати себе і близьких
                смачними подарунками.
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
              >
                19 грудня 2020 р. почне свою роботу перший віртуальний Різдвяний
                ярмарок безглютенових продуктів, на якому ви зможете
                ознайомитися і замовити з різдвяною знижкою продукцію компаній
                сегмента Gluten free.
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
              >
                Ярмарок надає прямий, безпосередній доступ до товарів покупцям в
                умовах обмежень, пов'язаних з поширенням Сovid -19. Окрім цього
                допомогає зберегти своє здоров'я та час і замовити продукти з
                доставкою до дому.
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
              >
                На ярмарці представлена продукція підприємств, які ліцензовані
                ТМ «Перекреслений Колосок», а також продукти підприємств, які
                підтверджують відсутність глютену лабораторними дослідженнями.
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
              >
                Щоб зайти на ярмарок, Вам необхідно пройти реєстрацію. На
                електронну пошту Ви отримаєте спеціальний промокод, який надасть
                можливість придбати продукцію зі знижками, відвідавши сайт
                компанії-учасника ярмарку. Обов'язково вказуйте промокод в
                кошику інтернет-магазину при замовленні.
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
              >
                Ярмарок триватиме з 19 по 26 грудня 2020 р.
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
              >
                Приєднуйтесь! Даруйте радість собі та близьким завдяки якісним і
                безпечним продуктам!
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
                className={classes.text}
              >
                З повагою та побажанням здоров’я,
              </Typography>
              <Typography
                variant="h6"
                align="left"
                paragraph
              >
                Українська спілка целіакії
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item></Grid>
                </Grid>
              </div>*/}
            </Container> 
          </div>

          {/* <div className={classes.paper}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={goToRegistration}
            >
              Перейти до реєстрації
            </Button>
          </div> */}
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
    backgroundImage: `url(${MerryChristmasImage})`,
    backgroundImage: 'url("https://post.healthline.com/wp-content/uploads/2020/09/gluten-free-diet-thumb-1-732x549.jpg")',
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
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
    padding: theme.spacing(8, 0, 0),
    // backgroundColor: theme.palette.primary.main,
    // color: "white",
    color: theme.palette.primary.main,
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
  text: {
    whiteSpace: "pre-wrap",
    textAlign: "left",
  },
}));
