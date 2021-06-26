const db = require('../db')

class Order {
  static async listOrdersForUser(user){
    
  }
  // user: email
  // order: [ {product_id, quantity}, ... ]
  static async createOrder(user, order){
    const email = user.email

    let orderId = await db.query(`
      insert into orders (customer_id) 
        values ((select id from users 
        where email = $1))
        returning id;
    `, [email])
    
    orderId = orderId.rows[0]

    



  }
}

module.exports = Order