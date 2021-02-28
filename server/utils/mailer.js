const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD, MAIN_URL } = require("../config");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Українська спілка целіакії",
    link: MAIN_URL,
  },
});

const sendPromoCode = (name, userEmail, res) => {
  let response = {
    body: {
      name,
      intro: "Дякуємо за рeєстрацію! Ваш промокод на знижку CELIAC.",
      greeting: "Вітаємо",
      signature: "З повагою",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Промокод від Gluten Free ярмарку",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      //FIX This
      return res.status(201).json({
        success: true,
        message: res.response,
      });
    })
    .catch((error) => console.error(error));
};

const sendReminder = (userEmails, res) => {
  let response = {
    body: {
      name: "шановний учаснику",
      intro:
        "Нагадуємо, що новорічний online ярмарок безглютенової продукції розпочинається 19-го грудня! Ваш промокод на знижку CELIAC.",
      greeting: "Вітаємо, ",
      signature: "З повагою",
      action: {
        instructions: "Для переходу на сторінку ярмарку натисніть тут",
        button: {
          color: "#728b48",
          text: "Перейти до ярмарку",
          link: "https://gluten-free-fest.com.ua/registration",
        },
      },
      outro:
        "Приєднуйтесь до нас  у соціальних мережах:\nhttps://www.facebook.com/CeliacUkraine/?ti=as\nhttps://instagram.com/celiac.ua?igshid=8bt7ralhsl6x",
    },
  };

  let mail = MailGenerator.generate(response);

  userEmails.map((email) => {
    let message = {
      from: EMAIL,
      to: email,
      subject: "Gluten Free ярмарок починається!",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        console.log("sent to", email);
      })
      .catch((error) => console.error(error));
  });
};

module.exports = {
  sendPromoCode,
  sendReminder,
};
