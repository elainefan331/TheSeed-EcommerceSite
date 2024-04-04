from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Cart, Item, User
import json

cart_routes = Blueprint('cart_routes', __name__)

# get all shopping carts(orders) by user's id
@cart_routes.route("/current")
@login_required
def currentUserShoppingCarts():
    user = current_user.to_dict()
    all_shopping_carts = Cart.query.join(User).filter(User.id == user["id"]).all()
    return {"orders": [cart.to_dict() for cart in all_shopping_carts]}

# create a shopping cart(order)
# create cart items point to the shopping cart
@cart_routes.route("", methods=["POST"])
@login_required
def createShoppingCart():
    data = json.loads(request.data)
    user = current_user.to_dict()
    print("data=======================", data)
    print("user========================", user)
    
    subtotal = sum(float(item['productPrice']) * item['quantity'] for item in data['cart_items'])

    print("total_price=========", subtotal)
    
    new_cart = Cart(
        user_id = user["id"],
        status = "completed",
        total_price = subtotal
    )
    db.session.add(new_cart)
    db.session.commit()
    
    cart_id = new_cart.id
    print("cart_id=================", cart_id)
    
    for item in data["cart_items"]:
        new_cart_item = Item(
            product_id = item['productId'],
            cart_id = cart_id,
            quantity = item['quantity'],
            unit_price = float(item['productPrice']),
        )
        db.session.add(new_cart_item)
        
    db.session.commit()
    
    return new_cart.to_dict()
    
    
        