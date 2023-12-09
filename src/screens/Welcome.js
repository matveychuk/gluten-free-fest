import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/NY2022.png";
import { grey } from "@material-ui/core/colors";

export default function Welcome() {
  let navigate = useNavigate();
  const classes = useStyles();

  const goToRegistration = () => {
    navigate("/registration");
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square style={{ backgroundColor: grey[100] }}>
          <Grid className={classes.heroContent} container direction="column" justify="space-between">
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Вітаємо на традиційному online-ярмарку безглютенової продукції!
            </Typography>
            {/* <Typography component="h1" variant="h3" align="center" gutterBottom>
              Ярмарок зачинився!
            </Typography>
            <Typography variant="h6" align="left" paragraph>
              До зустрічі на наступних ярмарках. Чекайте анонсу на сторінці{" "}
              <a href="https://www.facebook.com/Gluten-Free-Fest-101297068519846/" target="_blank">
                facebook
              </a>
              .
            </Typography> */}
            {/* <Typography variant="body1" align="left" paragraph className={classes.text}>
              В усьому світі, травень - місяць поінформованості щодо захворювання целіакії. Саме 16 травня відзначається
              Міжнародний день целіакії.
            </Typography> */}
            <Typography variant="body1" align="left" paragraph className={classes.text}>
              Для людей з целіакією, глютенозалежними захворюваннями та усім особам, які дотримуються безглютенової
              дієти, саме напередодні Новорічних свят є чудова нагода придбати продукти харчування, які не містять
              глютен на online - ярмарку безглютенової продукції.
            </Typography>

            <Typography variant="body1" align="left" paragraph className={classes.text}>
              18 грудня 2021 р. почне свою роботу віртуальний Святковий Ярмарок безглютенових продуктів, на якому ви
              зможете ознайомитися і замовити зі знижкою продукцію компаній сегмента Gluten free. Ярмарок надає прямий,
              безпосередній доступ до товарів покупцям в умовах обмежень, пов'язаних з Сovid -19. Окрім цього допомогає
              зберегти своє здоров'я та час і замовити продукти з доставкою до дому.
            </Typography>
            <Typography variant="body1" align="left" paragraph className={classes.text}>
              На ярмарці представлена продукція підприємств, які ліцензовані ТМ «Перекреслений Колосок», а також
              продукція, в якій відсутність глютену підтверджена лабораторними дослідженнями.
            </Typography>
            <Typography variant="body1" align="left" paragraph className={classes.text}>
              Щоб завітати на Ярмарок, Вам необхідно пройти онлайн-реєстрацію, після чого Ви отримаєте спеціальний
              промокод, який надасть можливість придбати продукцію зі знижками, відвідавши сайт компанії-учасника
              ярмарку. Обов'язково вказуйте промокод у кошику інтернет-магазину при замовленні.
            </Typography>
            <Typography variant="body1" align="left" paragraph className={classes.text}>
              Ярмарок триватиме з 18 по 25 грудня 2021 р.
            </Typography>
            <Typography variant="body1" align="left" paragraph className={classes.text}>
              Приєднуйтесь! Даруйте радість собі та близьким завдяки якісним і безпечним продуктам!
            </Typography>
            <div>
              <Typography variant="body1" align="left" paragraph className={classes.text}>
                З повагою та побажанням здоров’я,
              </Typography>
              <Typography variant="body1" align="left" paragraph className={classes.text}>
                Українська спілка целіакії
              </Typography>
            </div>

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={goToRegistration}
            >
              Перейти до реєстрації
            </Button>
          </Grid>
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
    backgroundColor: "#abbfc8",
    "& h1": {
      color: "#2b4a60",
    },
  },
  image: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(0, 2, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  text: {
    fontSize: "1rem",
    color: "#2b4a60",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(2, 2),
    // backgroundColor: theme.palette.primary.main,
    // color: "white",
    color: theme.palette.primary.main,
    height: "100%",
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
  // text: {
  //   whiteSpace: "pre-wrap",
  //   textAlign: "left",
  // },
}));
