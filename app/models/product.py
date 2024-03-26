from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__= 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    stock_quantity = db.Column(db.Integer)
    size = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    user_in_product = db.relationship('User', back_populates='product_in_user')
    
    reviews_in_product = db.relationship('Review', back_populates='product_in_review')
    
    @property
    def user(self):
        return {
            'id': self.user_in_product.id,
            'first_name': self.user_in_product.first_name,
            'last_name' : self.user_in_product.last_name,
            'address': self.user_in_product.address
        }
    
    @property
    def reviews(self):
        return [review.to_dict() for review in self.reviews_in_product]
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image': self.image,
            'user': self.user,
            'reviews': self.reviews,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }