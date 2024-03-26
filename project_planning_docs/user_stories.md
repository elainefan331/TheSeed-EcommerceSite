# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` modal:
    * I would like to be able to enter my email, username, and preferred password, first name, last name, address on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.


### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` modal:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.


### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on the `/login` modal to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on `/login` modal:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.


### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a home page.
      * So that I can easily log out to keep my information secure.



## 1.Products

### Create Products

* As a logged in user, I want to be able to create a new product.
  * When I'm on the `/products/new` page:
    * I can create a new product with a create product form.

### Viewing Products

* As a logged in _or_ logged out user, I want to be able to view a selection of all the products.
  * When I'm on the `/` page:
    * I can view all the products.
    * I can also view the name and price of the products.

### Updating Products

* As a logged in user, I want to be able to update my products by clicking an update button.
  * When I'm on the `/products/current` pages:
    * I can click "update" to make changes to products I have created.

### Deleting Products

* As a logged in user, I want to be able to delete my products by clicking a delete button.
  * When I'm on the `/products/current` pages:
    * I can click "delete" to permanently delete a product I have created.


## 2.Reviews

### Create Reviews

* As a logged in user, I want to be able to create a new review.
  * When I'm on the `/products/:productId` page:
    * I can create a new review by clicking on "post my review" button to open the create review modal.

### Viewing Reviews

* As a logged in _or_ logged out user, I want to be able to view a selection of all the reviews associated with the product.
  * When I'm on the `/products/:productId` page:
    * I can view all the reviews and average ratings associated with the product.

### Updating Reviews

* As a logged in user, I want to be able to update my reviews by clicking an update button.
  * When I'm on the `/products/:productId` pages:
    * I can click "update" to make changes to reviews I have created.

### Deleting Reviews

* As a logged in user, I want to be able to delete my reviews by clicking a delete button.
  * When I'm on the `/products/:productId` pages:
    * I can click "delete" to permanently delete a review I have created.

    



