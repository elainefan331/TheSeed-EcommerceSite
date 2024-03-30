import "./ProductIndexItem.css"

function ProductIndexItem({ product }) {
    return (
        <div className="product-card-container">
            <img src={product.image} alt={product.name} />
            <div className="product-card-name-price-container">
                <p id="product-item-name">{product.name}</p>
                <p id="product-item-price">${product.price}</p>
            </div>
        </div>
    )
}

export default ProductIndexItem;