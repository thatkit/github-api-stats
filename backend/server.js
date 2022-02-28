const express = require('express');

const app = express();

app.use(express.json());

app.use('/api', require('./routes/apiRoute'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));