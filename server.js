const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const items = require('./routes/api/items')

const app = express();

// BodyParser middleware
app.use(express.json())

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongoose server
dbConnect()
async function dbConnect() {
   try {
      const connection = await mongoose.connect(db)
      const dbInfo = connection.connections[0]
      console.log(`MongoDB Connected to ... ${dbInfo.name}`)
   } catch (err) {
      console.error(`Error connecting to mongodb: ${ err }`)
   }
}

// User Routes
app.use('/api/items',items)

app.get('/', (req, res) => {
   console.log({ body: req.body })
   res.json({ body: req.body })
})

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${ port } on http://localhost:${ port }`) })