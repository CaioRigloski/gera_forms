const express = require('express')
const bcrypt = require('bcrypt');
const Login = require('../database/login');

async function generateHash(user) {
  let salt = bcrypt.genSaltSync()
  return user.password = bcrypt.hashSync(user.password, salt)
}

function compareHash(password, hash) {
  return bcrypt.compareSync(password, hash)
}

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

async function createLogin(loginReq, passwordReq) {
  Login.beforeCreate(generateHash)
  await Login.create({
    login: loginReq,
    password: passwordReq
  })
}

function verifyAuth(req, res, next) {
  if(req.isAuthenticated()) {
    next()
  }
  else {
    req.flash('error', 'Acesse para continuar')
    res.redirect('/login')
  }
}


/* let user = []

async function passValidation(loginReq, passwordReq) {
  user.data = await Login.findOne({
    where: {
      login: loginReq,
    },
    attributes: [
      'login',
      'password'
    ]
  })

 if(user.data){
  return compareHash(passwordReq, user.data.password)
  }
} */


module.exports = {
  generateHash,
  compareHash,
  createLogin,
  //passValidation,
  //user
  isValidPassword,
  verifyAuth
}