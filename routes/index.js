const express = require('express')
const { serializeUser } = require('passport')
const User = require('../models/User')
const bcrypt  = require('bcrypt')
const passport = require('passport')
const router = express.Router()

router.get('/', isLoggedIn, (req, res) => {
    try {
        res.render('index', {  })
    }catch (err){
        console.error(err)
    }
})

router.get('/login', isLoggedOut, (req, res) => {
    try {
        if (req.query.error)
            res.render('login', { errorMessage: "Login failed. Check the credentials"  })
        else
            res.render('login')
    }catch (err){
        console.error(err)
    }
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
}))

router.get('/logout', function(req, res, next){
    req.logOut(function(err){
        if (err) return next(err) 
        res.redirect('/')
    })    
})

router.get('/register', (req, res) => {
    try {
        res.render('register', {  })
    }catch (err){
        console.error(err)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const exists = await User.exists({username: req.body.username})

        if (exists) {
            res.redirect('/login')
        }

        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err)
            if (req.body.password != null && req.body.password !== '' ){
                bcrypt.hash(req.body.password, salt, function(err, hash){
                    if (err) return next(err)
                    const newuser = new User({
                        username: req.body.username,
                        password: hash
                    })
    
                    newuser.save()
                })
            }
        })

        res.redirect('/login')
    }catch (err){
        console.error("Error during register")
    }
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/')
}

module.exports = router