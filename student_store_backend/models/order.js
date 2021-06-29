const db = require('../db')

class Order {
  static async listOrdersForUser(user){
    const email = user.email
    
    const quer = await db.query(`
      SELECT orders.id AS "orderId", orders.customer_id AS "customerId", order_details.quantity AS "quantity",
      products.name AS "name", products.price AS "price"
      from orders JOIN order_details ON order_details.order_id = orders.id JOIN products ON products.id = order_details.product_id 
      WHERE orders.customer_id = ( SELECT id FROM users WHERE email = $1 ) ;
    `, [email])

    return quer.rows

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

    orderId = orderId.rows[0].id
    // console.log(orderId);

    // console.log('order',order);
    for( {product_id, quantity} of order ){
      const quer = db.query(`
        insert into order_details(order_id,product_id,quantity)
        values($1,$2,$3)
      `,[orderId, product_id, quantity])
    }

      


  }
}

module.exports = Order