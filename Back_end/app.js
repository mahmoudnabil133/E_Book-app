const express = require('express')
const { Port, mongoUrl } = require('./config');
const mongoose = require('mongoose');
const Book = require('./models/bookModel')
const bookRouter = require('./routes/booksRoutes')
const userRouter = require('./routes/usersRoutes')

const cors = require('cors')

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json())
mongoose
  .connect(mongoUrl)
  .then( ()=>{
    console.log('connected to db');
    app.listen(Port, () => {
        console.log(`app listening to port ${Port}`)
      });
  }
  )
  .catch((error)=>{
    console.log(error)
  }
  )

app.use('/books', bookRouter);
app.use('/users', userRouter);
  
