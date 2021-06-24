const db = require('../db')

class Store {
  static async listProducts(){
    let prods = await db.query(`select name from products;`)
    return prods.rows
  }
}

module.exports = Store