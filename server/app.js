require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router')
const PORT = process.env.PORT || 3000
const app = express();

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
    console.log(`app listening to http://localhost:${PORT}`)
})

module.exports = app