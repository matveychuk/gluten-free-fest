const Companies = require("../models/company");
const Events = require("../models/event");
const Mailer = require("../utils/mailer");

addCompany = async (req, res) => {
  console.log("req", req.body);
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "No data provided",
    });
  }

  const isCompanyExist = await Companies.findOne({
    _id: body._id,
  });

  if (isCompanyExist) {
    await Companies.findOneAndUpdate(
      { _id: body._id },
      {
        $set: {
          name: body.name,
          description: body.description,
          imageUrl: body.imageUrl,
          url: body.url,
          updatedAt: new Date(),
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Company already exist",
    });
  }

  //create new user and save it to db
  const company = new Companies(body);

  console.log("company created", company);

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

showCompany = async (req, res) => {
  // console.log('req', req)
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "No data provided",
    });
  }

  const isCompanyExist = await Companies.findOne({
    _id: body.id,
  });

  console.log("isCompanyExist", isCompanyExist);

  if (isCompanyExist)
    await Companies.findOneAndUpdate(
      { _id: body.id },
      {
        $set: { show: body.show },
      }
    );

  return res.status(200).json({
    success: true,
    message: "Company data updated",
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

getCompany = async (req, res) => {
  const body = req.body;
  const { companyId } = req.params;
  if (!companyId) {
    return res.status(400).json({
      success: false,
      error: "No company provided",
    });
  }

  const company = await Companies.findOne({ _id: companyId });

  if (company)
    return res.status(200).json({
      success: true,
      company,
    });

  return res.status(400).json({
    success: false,
    error: "no data",
  });
};

module.exports = {
  addCompany,
  getCompanies,
  showCompany,
  getCompany,
};
