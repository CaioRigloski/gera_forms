const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

const { createLogin, passValidation, compareHash } = require('./controllers/controller')
const Login = require('./database/login')

const router = express.Router()

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
/*   var loginReq = req.body.login
  var passwordReq = req.body.password
  
  if(loginReq) {
    if(await passValidation(loginReq, passwordReq) == true) {
      res.render('home')
      console.log(req.user)
    }
  }
  
  let er = []
  er.push({text: "login incorreto"})  
  res.render('initial/login', {er: er}) */
}))

router.get('/login', (req, res) => {
  res.render('initial/login')
})

router.get('/', (req, res) => {
  res.render('home')
  console.log(req.user)
})

router.get('/create-login', (req, res) => {
  res.render('initial/create-login')
})

router.post('/create-login', async (req, res) => {
  var loginReq = req.body.login
  var passwordReq = req.body.password
  await createLogin(loginReq, passwordReq)
  res.redirect('/')
})

router.get('/forgot-password', (req, res) => {
  res.render('initial/forgot-password')
})

module.exports = router