const express = require("express");

const router = express.Router();

const data = require("../utils/data");
const admins = data.admins;

// #SIGN IN
router.get("/login", (req, res, next) => {
  res.render("login", {
    pageTitle: "Login",
    signInActive: true,
  });
});

router.post("/login", (req, res, next) => {
  //      check account
  console.log("admins", admins);
  let isAccess = false;

  for (let i = 0; i < admins.length; i++) {
    if (
      admins.at(i).email == req.body.email &&
      admins.at(i).password == req.body.password
    ) {
      isAccess = true;
      break;
    }
  }

  //      render
  if (isAccess) {
    return res.redirect('/users/list');
  } else {
    return res.render("login", {
      pageTitle: "Login",
      signInActive: true,
      notify: "Fail! Check your email or password",
    });
  }
});


router.get("/register", (req, res, next) => {
  res.render("register", {
    pageTitle: "Register",
    signUpActive:true
  });
});

router.post("/register", (req, res, next) => {
  //      check available
  console.log("admins", admins);

  for (let i = 0; i < admins.length; i++) {
    if (admins.at(i).email == req.body.email) {
        console.log('email available')
      return res.render("register", {
        pageTitle: "Register",
        signUpActive: true,
        notify:'Fail! Email available'
      });
    }
  }

  //      new account admin
  console.log('req.body',req.body);
  const newAdmin = {
    _id: 'ad'+Date.now(),
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.full_name,
    avatar: req.body.avatar,
  };
  admins.push(
    newAdmin
  );
  console.log("admins", admins);

 
  res.redirect('/admins/login')
});

exports.router = router;
