require("dotenv").config();
const cors = require('cors')
const express = require('express');
const { getReviews } = require("./controllers/getReviews");
const { handleEnquiry } = require("./controllers/handleEnquiry");

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/reviews', getReviews)
app.post('/form', handleEnquiry)

app.listen(process.env.PORT, () => console.log(`Server listening at port ${process.env.PORT}`))