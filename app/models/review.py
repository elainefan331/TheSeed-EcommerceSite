from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__= 'reviews'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    user_in_review = db.relationship('User', back_populates='review_in_user')
    product_in_review = db.relationship('Product', back_populates='reviews_in_product')
    
    @property
    def product(self):
        return {
            'id': self.product_in_review.id,
            'user_id': self.product_in_review.user_id,
            'name': self.product_in_review.name,
            'description': self.product_in_review.description,
            'image': self.product_in_review.image,
            'price': self.product_in_review.price,
            'stock_quantity': self.product_in_review.stock_quantity,
            'size': self.product_in_review.size
        }
        
    
    @property
    def user(self):
        return {
            'id': self.user_in_review.id,
            'first_name': self.user_in_review.first_name,
            'last_name' : self.user_in_review.last_name,
            'address': self.user_in_review.address
        }
        
    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'review': self.review,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }