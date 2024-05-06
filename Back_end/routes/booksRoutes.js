const express = require('express');
const bookRouter = express.Router()
const Book = require('../models/bookModel')
const mongoose = require('mongoose');



bookRouter.get('/', async (req, res)=>{
    const books = await Book.find();
    try{
      res.status(200).json(books)
    } catch(error) {
      res.status(404).json({msg:error.message})
    }
});

bookRouter.post('/', async (req, res)=>{
  try{
    const new_book = new Book(req.body);
    await new_book.save()
    res.status(201).json({msg: 'newBook added', new_book})
  } catch(error) {
    res.status(500).json({msg:error.message})
  }
});

bookRouter.get('/:id', async (req, res)=>{
  const { id } = req.params;
  const book = await Book.findById(id)
  try{
    res.status(200).json(book);
  } catch(error) {
    res.status(400).json({msg:error.message})
  }
});


bookRouter.put('/:id', async (req, res)=>{
  const { id } = req.params;
  const updatedDate = req.body
  const book = await Book.findByIdAndUpdate(id, updatedDate, {new:true});
  try{
    res.status(200).json({msg:"data updated", book});
  } catch(error) {
    res.status(400).json({msg:error.message})
  }
});

bookRouter.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const updatedDate = req.body
  const book = await Book.findByIdAndDelete(id);
  try{
    res.status(200).json({msg:"data deleted"});
  } catch(error) {
    res.status(400).json({msg:error.message})
  }
});



module.exports = bookRouter
