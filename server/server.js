const express = require('express')
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
    res.json({hi: "there"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})