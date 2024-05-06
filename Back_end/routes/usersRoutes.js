const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// function authenticateUser(req, res, next) {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//         return res.status(400).json({ msg: 'Email and password are required' });
//     }

//     // Find the user by email
//     User.findOne({ email })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json({ msg: 'User not found' });
//             }

//             // Compare the provided password with the hashed password in the database
//             bcrypt.compare(password, user.password)
//                 .then(isMatch => {
//                     if (!isMatch) {
//                         return res.status(401).json({ msg: 'Invalid credentials' });
//                     }

//                     // If the credentials are valid, attach the user to the request object
//                     req.user = user;
//                     next();
//                 })
//                 .catch(err => res.status(500).json({ msg: err.message }));
//         })
//         .catch(err => res.status(500).json({ msg: err.message }));
// }

// function authorizeUser(req, res, next) {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'your_secret_key');
//         req.userId = decoded.userId;
//         next();
//     } catch (err) {
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// }

userRouter.get('/',  async (req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    } catch(err){
        res.status(400).json({msg:err.message})
    }
})

userRouter.get('/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(err){
        res.status(400).json({msg:err.message})
    }
})

userRouter.post('/', async (req, res)=>{
    try{
        const user = new User(req.body);
        await user.save()
        // const token = jwt.sign({ userId: user._id}, 'your_secret_key', { expiresIn: '7d' });
        res.status(200).json({ user });
    } catch(err) {
        res.status(400).json({msg: err.message});
    }
});

userRouter.put('/:id', async (req, res)=>{
    const { id } = req.params;
    const updatedDate = req.body
    const user = await User.findByIdAndUpdate(id, updatedDate, {new:true});
    try{
      res.status(200).json({msg:"data updated", user});
    } catch(error) {
      res.status(400).json({msg:error.message})
    }
});
  
userRouter.delete('/:id', async (req, res)=>{
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    try{
        res.status(200).json({msg:"data deleted"});
    } catch(error) {
        res.status(400).json({msg:error.message})
    }
});

  
  
module.exports = userRouter
  