from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id = 1,
        product_id = 5,
        review = "What a fantastic experience! The plant arrived much faster than I anticipated, and the packaging was impeccable.",
        rating = 4
    )
    review2 = Review(
        user_id = 1,
        product_id = 9,
        review = "The care instructions included were a godsend for a plant newbie like me. I was worried about keeping it alive, but it's thriving!",
        rating = 4
    )
    review3 = Review(
        user_id = 1,
        product_id = 15,
        review = "Really happy with my purchase. The plant looks just as lush and vibrant as in the website photos.",
        rating = 4
    )
    review4 = Review(
        user_id = 2,
        product_id = 1,
        review = "I've ordered from several sites before, but this one is by far the best. The plant was so healthy and full upon arrival, and it's adapted to my home wonderfully. I'm already browsing for my next green friend!",
        rating = 5
    )
    review5 = Review(
        user_id = 2,
        product_id = 2,
        review = "Impressed with the selection available—found varieties here I haven't seen anywhere else. My order arrived in perfect condition, and the detailed care guide has been incredibly helpful.",
        rating = 5
    )
    review6 = Review(
        user_id = 2,
        product_id = 3,
        review = "Absolutely in love with my purchase!",
        rating = 5
    )
    review7 = Review(
        user_id = 2,
        product_id = 4,
        review = "My plant is flourishing, thanks to their expert advice.",
        rating = 5
    )
    review8 = Review(
        user_id = 3,
        product_id = 1,
        review = "Overall, a good experience. The plant is healthy and growing, but the delivery took longer than expected, and the customer service response time could be improved.",
        rating = 3
    )
    review9 = Review(
        user_id = 3,
        product_id = 2,
        review = "The plant selection on the website is impressive, and the plant I received is healthy and seems to be adjusting well to its new home. However, I found the pricing to be a bit on the higher side compared to other websites.",
        rating = 3
    )
    review10 = Review(
        user_id = 3,
        product_id = 3,
        review = "I was amazed at how beautifully my plant was packaged—no soil spillage or leaf damage whatsoever.",
        rating = 4
    )
    review11 = Review(
        user_id = 3,
        product_id = 4,
        review = "This was my first time ordering a plant online, and I was not disappointed. The plant arrived healthy, well-packaged, and is now a stunning addition to my living space. Excellent service and quality.",
        rating = 5
    )
    
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.commit()
    
    
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()