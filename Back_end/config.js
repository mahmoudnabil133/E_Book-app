const mongoose = require("mongoose");

const Port = 3001;


// mongo db connection 
const mongoUrl = 'mongodb+srv://hoda:1234@cluster0.bp3s9ei.mongodb.net/Book_store_app?retryWrites=true&w=majority&appName=Cluster0'


// docker connection 
// const mongoUrl = 'mongodb://admin:admin@localhost:27017/Book_store_app?authSource=admin'
module.exports = {
  Port,
  mongoUrl
}
