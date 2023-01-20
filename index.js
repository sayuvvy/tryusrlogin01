const express = require('express')
const session = require('express-session')
const cors = require('cors')
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

const hbs = require('express-handlebars')

const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt  = require('bcrypt')
const app = express()

mongoose.connect("mongodb://localhost/node-auth01", {})

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', ()=> console.log('connected successfully to mongoose'))

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)

//app.engine('hbs', hbs({extname: '.hbs'}))
//app.set('view engine', 'hbs')

app.use(expressLayouts);

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(express.static(__dirname + 'public'))
app.use(session({
    secret: "testsecret",
    resave: false,
    saveUninitialized: true
}))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.use('/', indexRouter)

passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user)
    })
})

passport.use(new localStrategy(function(username, password, done){
    User.findOne({username: username}, function(err, user){
        if (err) {return done(err)}
        if (!user) { return done(null, false, { messge: 'Incorrect Username'})}

        bcrypt.compare(password, user.password, function(err, res){
            if (err) {return done(err)}
            if (res === false) {return done(null, false, {message: 'Incorrect Password'})}

            return done(null, user);
        })
    })
}))

app.listen(process.env.PORT || 3000, ()=>{console.log("Server available at 3000")})