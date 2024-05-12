const express = require('express')
const router = express.Router()
const Books = require('../models/bookModel')


router.get('/', async (req, res) => {
    const { search } = req.query;
  
    try {
      const searched_books = await Books.find({ category: search });
      if (searched_books.length > 0) {
        res.status(200).json(searched_books);
      } else {
        const searched_book = await Books.find({ title: search });
        if (searched_book) {
          res.status(200).json(searched_book);
        } else {
          res.status(404).json({ msg: 'No data found' });
        }
      }
    } catch (err) {
      console.error('errrrrr', err);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
module.exports = router

