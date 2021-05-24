const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const UserController = require("./controllers/user");
const CompanyController = require("./controllers/company");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://gluten-free-fest.com.ua/"],
  })
);

const uri =
  "mongodb+srv://admin:S17HpJM9Rw1ngrOU@cluster0.r7b2j.mongodb.net/test";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

app.post("/user", UserController.registerUser);
app.get("/admin/events/:eventName", UserController.getUsersList);
app.post("/sendReminder", UserController.sendReminder);
app.post("/admin/addCompany", CompanyController.addCompany);
app.get("/getCompanies", CompanyController.getCompanies);
app.get("/admin/companies/:companyId", CompanyController.getCompany);
app.post("/showCompany", CompanyController.showCompany);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
