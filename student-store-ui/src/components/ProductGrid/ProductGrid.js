import ProductCard from "../ProductCard/ProductCard"
import "./ProductGrid.css"
import {v4 as uuid } from 'uuid'

export default function ProductGrid({ addToCart, removeFromCart, getQuantityOfItemInCart, products = [] }) {
  return (
    <div id="Buy" className="ProductGrid">
      <div className="content">
        <h3>Best Selling Products</h3>
        <div className="grid">
          {products?.map((product) => (
            <ProductCard
              key={uuid()}
              product={product}
              quantity={getQuantityOfItemInCart(product)}
              addToCart={() => addToCart(product)}
              removeFromCart={() => removeFromCart(product)}
            />
          ))}
          {!products?.length ? (
            <div className="card">
              <p>No products available</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
