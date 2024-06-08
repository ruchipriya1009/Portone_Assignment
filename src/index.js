const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());  

// Routes
app.get('/',async(req,res)=>{
try {
  res.status(200).send('Server is Running......')
} catch (error) {
  res.status(500).send('Something Wrong')
}
})
app.use('/api/v1', paymentRoutes);

const PORT = process.env.PORT || 4040;   
app.listen(PORT, () => {                                    
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
