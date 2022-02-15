const express = require('express')
const app = express()
const router = require('./routes')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const Login = require('./database/login')
const auth = require('./controllers/auth')
const userRoutes = require('./userRoutes')


app.engine('handlebars', hbs.engine({
  defaultLayout: 'index',
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoMethodsByDefault: true
  }
}))

app.set('view engine', 'handlebars')

app.use('/public', express.static('public'))

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {},
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
/* app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
}) */


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(userRoutes)
app.use(router)

app.use(auth)


app.listen(8080)