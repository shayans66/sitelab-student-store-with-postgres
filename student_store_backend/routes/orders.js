const Order = require('../models/order.js')

const express = require('express')
const router = express.Router()
const { requireAuthenticatedUser }= require('../middleware/security')

router.get(requireAuthenticatedUser, '/', async (req,res,next) => {
  try{
    const { user } = res.locals
    const products = await Order.listOrdersForUser()
    // return res.status(200).json({
    //   products 
    // })
  }catch(err){
    next(err)
  }
})
router.post(requireAuthenticatedUser, '/', async (req,res,next) => {
  try{
    const { user } = res.locals
    const products = await Order.createOrder()
    // return res.status(200).json({
    //   products 
    // })
  }catch(err){
    next(err)
  }
})

module.exports = router