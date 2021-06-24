const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')
const { UnauthorizedError } = require('../utils/errors')


// extract jwt from req header
const jwtFrom = ({ headers }) => {
  if(headers?.authorizatoin) {
    // authorizaotion: 'bearer 4jfdlsjflj3jrlk'
    const [scheme, token] = headers.authorizatoin.split(' ')
    if(scheme.trim() === 'Bearer' ){
      return token
    }
  }
  return undefined
}

// attach user to res obj
const extractUserFromJwt = (req,res,next) => {
  try{
    const token = jwtFrom(req)
    // if token valid
    if(token){

      res.locals.user = jwt.verify(token, SECRET_KEY)
    }
    return next()
  }catch(err){
    next(err)
  }
}

// verify authed user exists
const requireAuthenticatedUser = (req,res,next) => {
  try{
    const { user } = res.locals
    if(!user?.email){
      throw new UnauthorizedError()
    }
  }catch(err){
    return next(err)
  }
}

module.exports = {

  extractUserFromJwt,
  requireAuthenticatedUser
}