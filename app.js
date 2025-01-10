require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const sevaRoutes = require('./routes/sevaRoutes');
const reprintRoutes = require('./routes/reprintRoutes');
const countRoutes = require('./routes/countRoutes');
const smsRoute = require('./routes/smsRoute');
const reportRouter = require('./routes/reportRouter');

require('./config/db_connection'); // Import the PostgreSQL connection

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.get("/api/helth_check", function (req, res) {
  res.send({status:200, message:"Server is up and running!"});
})
// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/seva', sevaRoutes);
app.use('/api/redo', reprintRoutes);
app.use('/api/count', countRoutes);
app.use('/api/sms', smsRoute);
app.use('/api/report', reportRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
