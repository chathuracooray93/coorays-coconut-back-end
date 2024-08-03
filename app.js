const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const companyRoutes = require('./routes/companyRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const coconutRoutes = require('./routes/coconutLotRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const port = config.port || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error:'));

app.use('/company', companyRoutes);
app.use('/seller', sellerRoutes);
app.use('/coconut', coconutRoutes);
app.use('/order', orderRoutes);
app.use('/login', authRoutes);

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});