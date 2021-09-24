const { PORT, NODE_ENV } = require('./config').config;

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

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
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));

// Serve static assets if in production
if (NODE_ENV === 'production') {
   // Set static foloder
   app.use(express.static('client/build'));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT} on http://localhost:${PORT}`);
});
