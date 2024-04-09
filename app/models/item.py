from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Item(db.Model):
    __tablename__ = 'items'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='CASCADE'), nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(precision=10, scale=2))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    product_in_item = db.relationship('Product', back_populates='items_in_product')
    cart_in_item = db.relationship('Cart', back_populates='items_in_cart')
    
    @property
    def product(self):
        return {
            'id': self.product_in_item.id,
            'user_id': self.product_in_item.user_id,
            'name': self.product_in_item.name,
            'description': self.product_in_item.description,
            'image': self.product_in_item.image,
            'price': self.product_in_item.price,
            'stock_quantity': self.product_in_item.stock_quantity,
            'size': self.product_in_item.size
        }
    
    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'cart_id': self.cart_id,
            'quantity': self.quantity,
            'unit_price': self.product_in_item.price,
            'product': self.product
        }