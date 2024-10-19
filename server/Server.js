const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path=require('path')

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/TechySoftware')
const db=mongoose.connection;
db.once('open',()=>{
    console.log("Mongodb connection success")
})
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

app.use(cors());
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post', async (req, res) => {
    const { name, email, message } = req.body;
    const user = new users({
        name,
        email,
        message
    });

    try {
        await user.save();
        console.log(user);
        res.status(201).send("Form submission success"); 
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send("Error occurred while saving data");
    }
});

const userSchema = new  mongoose.Schema({
    name:String,
    email:String,
    message:String
})
const users=mongoose.model("contacts",userSchema)

// feedback data

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Feedback = mongoose.model('feedbacks', feedbackSchema); 

// Handle feedback form submission
app.post('/feedback', async (req, res) => {
    console.log(req.body);
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });

    try {
        await feedback.save();
        console.log(feedback);
        res.status(201).send("Feedback submission success");
    } catch (error) {
        console.error('Error saving feedback data:', error);
        res.status(500).send("Error occurred while saving feedback data");
    }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get('/',(req,res)=>{
    res.send("good")
})