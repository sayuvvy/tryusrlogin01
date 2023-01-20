const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
//        const books = await Book.find().sort({ createdAt : 'desc' }).limit(10).exec()
        res.render('index', {  })
    }catch (err){

    }
})

router.get('/login', async (req, res) => {
    try {
//        const books = await Book.find().sort({ createdAt : 'desc' }).limit(10).exec()
        res.render('login', {  })
    }catch (err){

    }
})

router.post('/login', async (req, res) => {
    try {
//        const books = await Book.find().sort({ createdAt : 'desc' }).limit(10).exec()
        res.render('index', {  })
    }catch (err){

    }
})

router.get('/register', async (req, res) => {
    try {
//        const books = await Book.find().sort({ createdAt : 'desc' }).limit(10).exec()
        res.render('register', {  })
    }catch (err){

    }
})

module.exports = router