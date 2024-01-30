const nodemailer = require('nodemailer');
const FormDataModel = require('./models/FormData');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/employee').then(()=>{
  console.log('Mongodb database Connected......')
}).catch((err)=>{console.log(err)});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onlineexamportaldemo@gmail.com',
    pass: 'wgjf hnlo enrh yuok',
  },
});

app.post('/register', (req, res) => {
  const { firstName, lastName, email, phoneNo, password } = req.body;

  FormDataModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json('Already registered');
      } else {
        const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

        FormDataModel.create({ firstName, lastName, email, phoneNo, password, activationCode })
          .then((result) => {
            const mailOptions = {
              from: 'onlineexamportaldemo@gmail.com',
              to: email,
              subject: 'Activate Your Account',
              text: `Your activation code is: ${activationCode}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                res.status(500).send('Error sending activation email');
              } else {
                console.log('Email sent: ' + info.response);
                res.json({ activationCode });
              }
            });
          })
          .catch((err) => res.json(err));
      }
    })
    .catch((err) => res.json(err));
});

app.post('/activate', (req, res) => {
  const {  enteredCode } = req.body;

  FormDataModel.findOne({activationCode: enteredCode})
  .then(user => {
    if(!user) {
      res.status(400).json("Invalid activation code");
    } else {
      user.active = true;
      user.save()
      res.status(200).json("Account activated!");
    }
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  }) 
  
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (!user.active){
          res.json('Account Not Activated');
          return
        }
        if (user.password === password) {
          res.json({
            msg: "Success",
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNo: user.phoneNo
            }
          });
          return
        } else {
          res.json('Wrong password');
          return
        }
      } else {
        res.json('No records found!');
      }
    })
    .catch((err) => res.json(err));
});

app.post('/reactivate/send-code', (req, res) => {
  const { email } = req.body;

  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        const ActivationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.ActivationCode = ActivationCode;
        user.save();

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'onlineexamportaldemo@gmail.com',
            pass: 'wgjf hnlo enrh yuok',
          },
        });

        const mailOptions = {
          from: 'onlineexamportaldemo@gmail.com',
          to: email,
          subject: 'Reactivate account - Activation Code',
          text: `Your Activation code is: ${ActivationCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).send('Error sending Activation code');
          } else {
            console.log('Activation code sent: ' + info.response);
            res.json({ message: 'Activation code sent successfully' });
          }
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Internal server error' }));
});

app.post('/vactivate/submit-code', (req, res) => {
  const {  enteredCode } = req.body;

  FormDataModel.findOne({ActivationCode: enteredCode})
  .then(user => {
    if(!user) {
      res.status(400).json("Invalid activation code");
    } else {
      user.active = true;
      user.
      user.save()
      res.status(200).json("Account activated!");
    }
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  }) 
  
});


app.post('/forgot-password/send-code', (req, res) => {
  const { email } = req.body;

  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        user.save();

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'onlineexamportaldemo@gmail.com',
            pass: 'wgjf hnlo enrh yuok',
          },
        });

        const mailOptions = {
          from: 'onlineexamportaldemo@gmail.com',
          to: email,
          subject: 'Forgot Password - Verification Code',
          text: `Your verification code is: ${verificationCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).send('Error sending verification code');
          } else {
            console.log('Verification code sent: ' + info.response);
            res.json({ message: 'Verification code sent successfully' });
          }
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Internal server error' }));
});

app.post('/forgot-password/reset-password', (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  FormDataModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.verificationCode === verificationCode && user.verificationCode !== '') {
          user.password = newPassword;
          user.verificationCode = '';
          user.save();
          res.json({ message: 'Password reset successful' });
        } else {
          res.status(401).json({ message: 'Invalid verification code' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((err) => {
      console.error('Error during password reset:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.listen(5002, () => {
  console.log('Server listening on http://127.0.0.1:5002');
});
