const { response } = require('express');
const express = require('express')
const passport = require('passport')
const { verifyAuth } = require('./controllers/controller')
const fetch = require('node-fetch')
const throttledQueue = require('throttled-queue')

const userRoutes = express.Router()

userRoutes.get('/forms', verifyAuth, (req, res) => {
  res.render('forms', {user: req.user, noForms: req.flash('noForms')})
})

userRoutes.get('/create-form', (req, res) => {
  res.render('createForm')
})

userRoutes.post('/logout', verifyAuth, (req, res) => {
  req.logout();
  res.redirect('/');
});

userRoutes.get('/save-form', (req, res) => {
  //res.render('home')
  fetch('http://localhost:8080/save-form')
  .then(response => response.json())
  .then(data => console.log(data))
})

userRoutes.post('/save-form', (req, res) => {
  res.render('home', {layout: false})
})



module.exports = userRoutes