const express = require('express')
const passport = require('passport')
const { verifyAuth } = require('./controllers/controller')

const userRoutes = express.Router()

userRoutes.get('/forms', verifyAuth, (req, res) => {
  res.render('forms', {user: req.user, noForms: req.flash('noForms')})
})

userRoutes.get('/create-form', verifyAuth, (req, res) => {
  res.render('createForm')
})

userRoutes.post('/logout', verifyAuth, (req, res) => {
  req.logout();
  res.redirect('/');
});



module.exports = userRoutes