const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'token');
    next();
});
// # funny bug appeared - once there was CORS error,
// then I added this header - everything was fixed.
// BUT when I removed the header, it was still working

// routes
app.use('/api', require('./routes/apiRoute'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));