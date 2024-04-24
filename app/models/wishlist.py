# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime

# class Wishlist(db.Model):
#     __tablename__ = 'wishlists'
    
#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}
        
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.now)
#     updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
#     user_in_wishlist = db.relationship('User', back_populates='wishlist_in_user')
#     product_in_wishlist = db.relationship('Product', back_populates='wishlist_in_product')
    
#     @property
#     def products(self):
#         return [product.to_dict() for product in self.product_in_wishlist]
        
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'product_id': self.product_id,
#             'products': self.products
#         }