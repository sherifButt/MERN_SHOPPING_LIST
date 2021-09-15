module.exports = {
   mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gokuy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
}