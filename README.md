- [Important Detail](#important-detail)
- [Install Instructions](#install-instructions)
- [Feature List](#feature-list)
  - [User profiles:](#user-profiles)
  - [User functionality:](#user-functionality)
  - [Data:](#data)
  - [Views:](#views)
  - [Admin Functionality:](#admin-functionality)
  - [Additional features:](#additional-features)
- [Detailed user interactions](#detailed-user-interactions)
  - [How to create an account and user profile ?](#how-to-create-an-account-and-user-profile-)
  - [How to change profile?](#how-to-change-profile)
  - [How to find the ranking for a type of API?](#how-to-find-the-ranking-for-a-type-of-api)
  - [How to write reviews for an API and give it a rating?](#how-to-write-reviews-for-an-api-and-give-it-a-rating)
  - [How to comment under a review?](#how-to-comment-under-a-review)
  - [How to share a review on social media?](#how-to-share-a-review-on-social-media)
  - [How to add posts to Favorites?](#how-to-add-posts-to-favorites)
- [Development Team 33](#development-team-33)

## Important Detail

The overall purpose of our web application is for users to review, rank, and share tutorials for the libraries, framework, and API in programming languages. This web application serves small and large tech companies, programmers and anyone who is interested in coding. It’s beneficial for them to learn which API is better at doing the job, which is more cost effective, easier to use, and has better compatibility. It is able to:

- Check which library/framework/API is the best answer for the problem
- Review the pros and cons for each library/framework/API
- Build a community for people interested in library/framework/API to share their thoughts
- Comment under others review

## Install Instructions

Below are the third-party APIs:

- npm i react-star-ratings
- npm install --save react-bootstrap bootstrap@3
- npm install --save react-bootstrap-validation

## Feature List

Followings are the features and descriptions for each of them:

### Login

-- Admin login
email: admin
password: admin

### User profiles:

Our website meets the User Profile specification because users of our website are able to create user profiles, and only users with profiles are able to post content to the website after admin review.

### User functionality:

Our website has the user functionality of authentication because users need to log into their account with user email and password. It also has the functionality of authorization because there are things that regular users cannot do but admin can do. For example, a user is not able to delete other user’s posts. Regular users are also able to write comments under the reviews and rate the reviews.

### Data:

The data section stores user profiles and posts, as well as users' favourite libraries. And it will also store the reviews and comment that a library/framework gets from users.

### Views:

- The login page
- The main page
- The ranking page of the library(framework/API )based on users'
  personal preference
- The page for a chosen library(framework/API) with their reviews and
  ranking scores
- User’s profile page


### Admin Functionality:

Admins have access to all elements in the Admin Toolbar and can add content to any page, including adding and deleting users’ posts. Admin can also delete users' account.

### Additional features:

- Ranking page
- Users can add posts to their Favourites, so that they can access later

## Detailed user interactions

### How to create an account and user profile ?

The default initial page is the LogInpage. If a user has not yet owned an account, an option to Signup is available on the left side of the page. A new account can be created by email address.

### How to change profile?

A user will click the “edit” button on their profile page, which will let them have the ability to change the information they want.

### How to find the ranking for a type of API?

A user will click on the “Ranks” button, which allows them to view ranks for a type of API.

### How to write reviews for an API and give it a rating?

Each post has a review section where users can rate by giving stars, writing detailed comments. The API is ranked by the RatingStars written by the previews users. Each post can be given at most 5 stars.

### How to comment under a review?

After reading the review, users can scroll down to the comment section, leave their comment and then hit the comment button.

### How to add posts to Favorites?

On a review page, user can click on the white heart shape, and then the heart shape will become red, which means the post has been successfully added to Favorites.

## Development Team 33

| Name         | UTROid   | Git Name(s)     |
| ------------ | -------- | --------------- |
| Xinyu Yao    | yaoxiny3 | MY2333          |
| Yi chen liu  | liuyi104 | KKKK123454321   |
| Jiaming Yang | yangj295 | Jiaming-Yang-20 |
