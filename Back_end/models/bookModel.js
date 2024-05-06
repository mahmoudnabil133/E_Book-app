const mongoose = require('mongoose');

bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    auther: {
      type: String,
      required: true
    },
    pubYear:{
      type:Number,
      required: true
    },
    imgUrl:{
      type:String,
      required:true
    },
    category:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    pdfUrl:{
      type:String,
      required: true
    }
  },
  {
    timestamps: true,
});

module.exports= mongoose.model('book', bookSchema);
