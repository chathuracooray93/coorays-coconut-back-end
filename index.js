// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors')

// Create express app
const app = express();
const port = 3000;

app.use(cors());

// Middleware to parse application/json
app.use(bodyParser.json());

// MongoDB connection setup (replace 'mongodb://localhost:27017/coconutDB' with your MongoDB connection string)
mongoose.connect('mongodb+srv://kavijakumuditha12:DjBEa0AXevDpWpqx@cluster0.yvmdbhf.mongodb.net/coconutDB?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema for coconut_lot
const coconutLotSchema = new mongoose.Schema({
    username: String,
    password: String,
    quantity: Number,
    width: Number,
    size: String,
    husk_state: String,
    moisture_state: String,
    inside_state: String,
    state: String,
    image: String  // Assuming image is stored as a URL or file path
});

// Define a schema for company
const companySchema = new mongoose.Schema({
    username: String,
    password: String,
    br: String,
    email: String,
    name: String,
    address: String,
    phone: String,
    buying_price: Number,
    br_image: String  // Assuming br_image is stored as a URL or file path
});

// Define models based on the schemas
const CoconutLot = mongoose.model('CoconutLot', coconutLotSchema);
const Company = mongoose.model('Company', companySchema);

// CRUD operations for CoconutLot entity

// Create a new coconut lot
app.post('/coconut_lot', async (req, res) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const coconutLot = new CoconutLot({
            username: req.body.username,
            password: hashedPassword,  // Save the hashed password
            width: req.body.width,
            size: req.body.size,
            husk_state: req.body.husk_state,
            moisture_state: req.body.moisture_state,
            inside_state: req.body.inside_state,
            image: req.body.image
        });

        await coconutLot.save();
        res.send(coconutLot);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read all coconut lots
app.get('/coconut_lot', async (req, res) => {
    try {
        const coconutLots = await CoconutLot.find({});
        res.send(coconutLots);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a coconut lot by ID
app.put('/coconut_lot/:id', async (req, res) => {
    try {
        const coconutLot = await CoconutLot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(coconutLot);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a coconut lot by ID
app.delete('/coconut_lot/:id', async (req, res) => {
    try {
        const coconutLot = await CoconutLot.findByIdAndDelete(req.params.id);
        res.send(coconutLot);
    } catch (err) {
        res.status(500).send(err);
    }
});

// CRUD operations for Company entity

// Create a new company
app.post('/company', async (req, res) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const company = new Company({
            username: req.body.username,
            password: hashedPassword,  // Save the hashed password
            br: req.body.br,
            email: req.body.email,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            buying_price: req.body.buying_price,
            br_image: req.body.br_image
        });

        await company.save();
        res.send(company);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Read all companies
app.get('/company', async (req, res) => {
    try {
        const companies = await Company.find({});
        res.send(companies);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a company by ID
app.put('/company/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(company);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a company by ID
app.delete('/company/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        res.send(company);
    } catch (err) {
        res.status(500).send(err);
    }
});

// User login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await CoconutLot.findOne({ username });
        let userType = 'coconut_lot';

        if (!user) {
            user = await Company.findOne({ username });
            userType = 'company';
        }

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('Invalid username or password');
        }

        res.send({ message: 'Login successful', userType });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
