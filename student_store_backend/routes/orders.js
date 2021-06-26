const Order = require('../models/order.js')

const express = require('express')
const router = express.Router()
const { requireAuthenticatedUser } = require('../middleware/security')
const { BadRequestError } = require('../utils/errors.js')

router.get('/', requireAuthenticatedUser, async (req,res,next) => {
  console.log('geteorder');
  try{
    const { user } = res.locals
    const products = await Order.listOrdersForUser(user)
    return res.status(200).json({
      orders : products
    })
  }catch(err){
    next(err)
  }

})
router.post('/', requireAuthenticatedUser, async (req,res,next) => {
  console.log('post');
  try{
    if(!res.locals.hasOwnProperty('user') || !req.body.hasOwnProperty('order'))
      throw new BadRequestError()

    const { user } = res.locals
    const order = req.body.order
    const products = await Order.createOrder(user, order)

    // sus
    return res.status(200).json({
      order : order 
    })
  }catch(err){
    next(err)
  }
})

module.exports = router