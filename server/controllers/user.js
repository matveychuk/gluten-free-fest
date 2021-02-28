const Users = require("../models/user");
const Mailer = require("../utils/mailer");

registerUser = async (req, res) => {
  console.log('req', req)
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "No user provided",
    });
  }

  const email = body.email.toLowerCase();
  const event = body.event.toLowerCase();

  const isUserExist = await Users.findOne({
    $and: [{ email }, { event }],
  });

  if (isUserExist)
    return res.status(200).json({
      success: true,
      message: "User already registered for this event",
    });

  //create new user and save it to db
  const user = new Users({ ...body, event, email });

  if (!user) {
    return res.status(400).json({
      success: false,
      error: "not created",
    });
  }

  user
    .save()
    .then(() => {
      console.log("from then");
      Mailer.sendPromoCode(body.firstName, body.email, res);
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
        message: "User not saved",
      });
    });
};

getUsersList = async (req, res) => {
  const { eventName } = req.params;

  if (!eventName) {
    return res.status(400).json({
      success: false,
      error: "No event found",
    });
  }

  const users = await Users.find({ event: eventName });

  if (!users.length) {
    return res.status(400).json({
      success: false,
      error: "No users for this event",
    });
  }

  return res.status(201).json({
    success: true,
    users,
  });
};

sendReminder = async (req, res) => {
  console.log('req', req.body)
  const body = req.body;
  if (!req.body.length) return

  Mailer.sendReminder(body);

  return res.status(201).json({
    success: true
  });
};

module.exports = {
  registerUser,
  getUsersList,
  sendReminder
};
