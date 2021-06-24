const Order = require('../models/order.js')

const express = require('express')
const router = express.Router()

router.get('/', async (req,res,next) => {
  try{
    const products = await Order.listOrdersForUser()
    // return res.status(200).json({
    //   products 
    // })
  }catch(err){
    next(err)
  }
})
router.get('/', async (req,res,next) => {
  try{
    const products = await Order.createOrder()
    // return res.status(200).json({
    //   products 
    // })
  }catch(err){
    next(err)
  }
})

module.exports = router