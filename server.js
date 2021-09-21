const { PORT, PRODUCTION } = require('./config').config; 

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const items = require('./routes/api/items');

// BodyParser middleware
app.use(express.json());

// DB config
const db = require('./config/keys').mongoURI;
// Connect to mongoose server
mongoose
   .connect(db)
   .then(() => console.log(`MongoDB Connected to ...`))
   .catch(err => console.error(`Error connecting to mongodb: ${err}`));

// User Routes
app.use('/api/items', items);

// Serve static assets if in production
if (PRODUCTION === 'production') {
   // Set static foloder
    app.use(express.static('client/build'));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}


app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT} on http://localhost:${PORT}`);
});
