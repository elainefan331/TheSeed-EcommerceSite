from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, User, Review
from app.forms import CreateProductForm, CreateReviewForm
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

product_routes = Blueprint('product_routes', __name__)


# get all products
@product_routes.route("")
def all_products():
    all_products = Product.query.all()
    return {"products": [product.to_dict() for product in all_products]}


# get all products owned by the current user
@product_routes.route("/current")
@login_required
def currentUserProducts():
    user = current_user.to_dict()
    all_products = Product.query.join(User).filter(User.id == user["id"]).all()
    return {"products": [product.to_dict() for product in all_products]}


# get details of a product from a product id
@product_routes.route("/<int:id>")
def product_detail(id):
    product = Product.query.get(id)
    if not product:
        return {"message": "This product could not be found"}, 404
    product_dict = product.to_dict()
    reviews_list = product_dict["reviews"]
    num_reviews = len(reviews_list)
    rating_sum = 0
    for review in reviews_list:
        rating_sum += review["rating"]
    if num_reviews > 0:
        avg = rating_sum / num_reviews
        avg_rating = round(avg, 1)
    
    if num_reviews == 0:
        avg_rating = 0
        
    product_dict["avg_rating"] = avg_rating 
    product_dict["num_reviews"] = num_reviews
    print("product_dict===========", product_dict)
    return product_dict
    # return product.to_dict()


# create a product
# aws setting not done yet
@product_routes.route("", methods=["POST"])
@login_required
def createProduct():
    form = CreateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.to_dict()
    
    if form.validate_on_submit():
        image = form.image.data
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)
        
        if "url" not in upload:
            return form.errors
        url = upload["url"]
        
        new_product = Product(
            user_id = user["id"],
            name = form.name.data,
            description = form.description.data,
            image = url, # for aws
            # image = form.image.data, # for postman test
            price = form.price.data
        )
        
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    if form.errors:
        print(form.errors)
        return form.errors
    

# edit(update) a product by product id

@product_routes.route("/<int:id>", methods=["PUT"])
@login_required
def updateProduct(id):
    form = CreateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    target_product = Product.query.get(id)
    user = current_user.to_dict()
    
    if not target_product:
        return {"message": "This product could not be found"}, 404
    
    if user["id"] != target_product.to_dict()["user"]["id"]:
        return {"message": "unauthorized"}, 401
    
    if form.name.data:
        target_product.name = form.name.data
    
    if form.description.data:
        target_product.description = form.description.data
        
    if form.price.data:
        target_product.price = form.price.data
        
    if form.image.data:
        if form.validate_on_submit():
            image = form.image.data
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return form.errors
            url = upload["url"]
            target_product.image = url # for aws
        else:
            return form.errors
    
    db.session.commit()
    
    updated_product = Product.query.get(id)
    updated_product_dict = updated_product.to_dict()
    return updated_product_dict


# delete a product by product id
# aws setting not done yet
@product_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def deleteProduct(id):
    target_product = Product.query.get(id)
    user = current_user.to_dict()
    
    if not target_product:
        return {"message": "This product could not be found"}, 404
    
    if user["id"] != target_product.to_dict()["user"]["id"]:
        return {"message": "unauthorized"}, 401
    
    if target_product:
        db.session.delete(target_product)
        db.session.commit()
        remove_file_from_s3(target_product.image) # delete the file on aws
        return {"message": "Successful delete!"}, 200
    
    
# get all reviews by a product's id
@product_routes.route("/<int:id>/reviews")
def reviewsOfProduct(id):
    target_product = Product.query.get(id)
    
    if not target_product:
        return {"message": "This product could not be found"}, 404
    
    if target_product:
        all_reviews = target_product.to_dict()["reviews"]
        
    return {"reviews": all_reviews}


# create a review for a product based on the product's id
@product_routes.route("/<int:id>/reviews", methods=["POST"])
@login_required
def createReview(id):
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    target_product = Product.query.get(id)
    user = current_user.to_dict()
    
    if not target_product:
        return {"message": "This product could not be found"}, 404
    
    all_reviews = target_product.to_dict()["reviews"]
    
    for review in all_reviews:
        if review["user_id"] == user["id"]:
            return {"message": "You already has a review for this product"}
        
    if form.validate_on_submit():
        new_review = Review(
            user_id = user["id"],
            product_id = id,
            review = form.review.data,
            rating = form.rating.data
        )
        
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    if form.errors:
        return form.errors
    
        
    
    
    
    




    

        