## Products

### Get all products
* `GET /api/products`

### Get all products owned by the current User
* `GET /api/products/current`

### Get details of a product from an id
* `GET /api/products/:productId`

### Create a product
* `POST /api/products`

### Edit a product
* `PUT /api/products/:productId`

### delete a product
* `DELETE /api/products/:productId`


## Reviews

### Get all reviews of the current User
* `GET /api/reviews/current`

### Get all reviews by a product's id
* `GET /api/products/:productId/reviews`

### Create a review for a product based on the product's id
* `POST /api/products/:productId/reviews`

### Edit a review
* `PUT /api/reviews/:reviewId`

### Delete a review
* `DELETE /api/reviews/:reviewId`