const express = require('express');

const app = express();

// body parser
app.use(express.json());

// routes
app.use('/api', require('./routes/apiRoute'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));