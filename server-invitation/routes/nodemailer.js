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
    to: `${infos.mail}`,// list of receivers
    subject: `invitation`, // Subject line
    text: "to configure", // plain text body
    html: `<div>to configure</div>`, // html body
  });

  console.log(info)
}

router.post("/", async (req, res, next) => {
  console.log( "on a quoi la",req.body.mail);
  if (!req.body.mail) {
   res.status(422).json("Merci de remplir tout les champs");
  }else{
    var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

    var email =  req.body.mail;
    var emails = email.split(",");
    emails.forEach((email) => {
      if (!expressionReguliere.test(email)) {
       
       res.status(422).json("L'email n'a pas le bon format"); 
       console.log("pas le bon format");
      }
    });
  }
  sendMail(req.body)
    .then(() => {
      res.status(200).json("message envoyé");
    })
    .catch((err) => {
      res.status(500).json("error");
    });
});

module.exports = router;