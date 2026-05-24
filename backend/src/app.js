const express=require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app=express()

app.use(cors())

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

module.exports=app