const express = require('express');

const app = express();

// body parser
app.use(express.json());
// app.use('/', (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next();
// });
// # funny bug appeared - once there was CORS error,
// then I added this header - everything was fixed.
// BUT when I removed the header, it was still working

// routes
app.use('/api', require('./routes/apiRoute'));

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Running mockup server. Listening to port ${port}`));