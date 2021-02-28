const Companies = require("../models/company");
const Events = require("../models/event");
const Mailer = require("../utils/mailer");

addCompany = async (req, res) => {
  // console.log('req', req)
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "No data provided",
    });
  }

  const isCompanyExist = await Companies.findOne({
    name: body.name,
  });

  if (isCompanyExist)
    return res.status(200).json({
      success: true,
      message: "Company already exist",
    });

  //create new user and save it to db
  const company = new Companies(body);

  console.log("company created", company);

  if (body.event) {
    await Events.findOneAndUpdate(
      { name: body.event },
      {
        $addToSet: { companies: company.id },
      }
    );
  }

  if (!company) {
    return res.status(400).json({
      success: false,
      error: "not created",
    });
  }

  company
    .save()
    .then(() => {
      console.log("from then");
      return res.status(200).json({
        success: true,
        message: "created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
        message: "Company not saved",
      });
    });
};

getCompanies = async (req, res) => {
  const companies = await Companies.find();

  if (companies.length)
    return res.status(200).json({
      success: true,
      companies,
    });

  return res.status(400).json({
    success: false,
    error: "no data",
  });
};

module.exports = {
  addCompany,
  getCompanies,
};
