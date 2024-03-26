from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review, User
from app.forms import CreateReviewForm


review_routes = Blueprint('review_routes', __name__)


# get all reviews created by the current user
# do i even need this route?


# edit(update) a review by review's id
@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def updateReview(id):
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    target_review = Review.query.get(id)
    user = current_user.to_dict()
    
    if not target_review:
        return {"message": "This review could not be found"}, 404
    
    if user["id"] != target_review.to_dict()["user_id"]:
        return {"message": "unauthorized"}, 401
    
    if form.validate_on_submit():
        if form.review.data:
            target_review.review = form.review.data
        if form.rating.data:
            target_review.rating = form.rating.data
        db.session.commit()
    else:
        return form.errors
    
    updated_review = Review.query.get(id)
    updated_review_dict = updated_review.to_dict()
    return updated_review_dict    


# delete a review by review's id
@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def deleteReview(id):
    target_review = Review.query.get(id)
    user = current_user.to_dict()
    
    if not target_review:
        return {"message": "This review could not be found"}, 404
    
    if user["id"] != target_review.to_dict()["user_id"]:
        return {"message": "unauthorized"}, 401
    
    if target_review:
        db.session.delete(target_review)
        db.session.commit()
        return {"message": "Successful delete!"}, 200

