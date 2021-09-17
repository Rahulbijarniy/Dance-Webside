const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrParser: true });
const port = 800;

// Deline mongoose
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});
var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG spicipic stupe
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
app.get('/', (req, res) => {
    const parans = {}
    res.status(200).render('home.pug', parans);

});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database ")
    }).catch(() => {
        res.status(400).send("Item was not save to the database")
    })

    // res.status(200).render('contact.pug');
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});