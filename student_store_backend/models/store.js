const db = require('../db')

class Store {
  static async listProducts(){
    let prods = await db.query(`select * from products;`)
    return prods.rows
  }
}

module.exports = Store