from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
    __tablename__ = 'carts'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')))
    status = db.Column(db.String)
    total_price = db.Column(db.Numeric(precision=10, scale=2))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    user_in_cart = db.relationship('User', back_populates='carts_in_user')
    items_in_cart = db.relationship('Item', back_populates='cart_in_item')
    
    @property
    def items(self):
        return [item.to_dict() for item in self.items_in_cart]
    
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            # 'order_id': self.order_id,
            'total_price': self.total_price,
            'items': self.items,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }