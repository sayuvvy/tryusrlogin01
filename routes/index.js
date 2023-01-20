const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    try {
//        const books = await Book.find().sort({ createdAt : 'desc' }).limit(10).exec()
        res.render('index', {  })
    }catch (err){

    }
})

router.get('/login', (req, res) => {
    try {
//        const books = await Book.find().sort({ createdAt : 'desc' }).limit(10).exec()
        res.render('login', {  })
    }catch (err){

    }
})

router.post('/login', (req, res) => {
    try {
//        const books = await Book.find().sort({ createdAt : 'desc' }).limit(10).exec()
        res.render('index', {  })
    }catch (err){

    }
})

router.get('/register', (req, res) => {
    try {
//        const books = await Book.find().sort({ createdAt : 'desc' }).limit(10).exec()
        res.render('register', {  })
    }catch (err){

    }
})

module.exports = router