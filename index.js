const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use(require("./routes/auth.route"))
app.use(require("./routes/branch.router"))
app.use(require("./routes/task.router"))

mongoose.connect(process.env.SERVER, (err) => {
    if(err){return console.log(err)}
    console.log("monoose connected")

    app.listen(process.env.PORT, () => {
        console.log(`connected on ${process.env.PORT}`)
    })
})