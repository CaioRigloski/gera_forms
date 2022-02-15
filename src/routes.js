const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const { createLogin, verifyAuth } = require('./controllers/controller')
const Login = require('./database/login')
const auth = require('./controllers/auth')

const router = express.Router()


router.get('/', (req, res) => {
  res.render('home')
})  

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
})
)

router.get('/login', (req, res) => {
  res.render('initial/login', {text: req.flash('error')})
})    

router.get('/about', (req, res) => {
  res.render('about')
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

router.get('/api/user', (req, res) => {
  res.json({
    username: req.user
  })
})  

module.exports = router