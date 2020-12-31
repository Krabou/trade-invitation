const router = new require("express").Router();
const nodemailer = require("nodemailer");


async function sendMail(infos) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER_ADDRESS, // generated ethereal user
      pass: process.env.MAIL_USER_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER_ADDRESS, // sender address
    to: process.env.MAIL_USER_ADDRESS, // list of receivers
    cc: `${infos.email}`,
    subject: `invitation`, // Subject line
    text: "to configure", // plain text body
    html: `<div>to configure</div>`, // html body
  });

  console.log(info)
}

router.post("/", async (req, res, next) => {
  console.log(req.body.email);
  sendMail(req.body)
    .then(() => {
      res.status(200).json("/");
    })
    .catch((err) => {
      res.status(500).json("/");
    });
});

module.exports = router;