- [URL](#URL)
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
  - [How to create an account](#how-to-create-an-account)
  - [How to change profile?](#how-to-change-profile)
  - [How to find the ranking for a type of API?](#how-to-find-the-ranking-for-a-type-of-api)
  - [How to write reviews for an API and give it a rating?](#how-to-write-reviews-for-an-api-and-give-it-a-rating)
  - [How to reply under a review?](#how-to-reply-under-a-review)
  - [How to add posts to Favorites?](#how-to-add-posts-to-favorites)
- [Detailed admin functionalities](#detailed-admin-functionalities)
  - [Login](#Login)
  - [How to sign up a user](#how-to-sign-up-a-user)
  - [How to change user profile](#how-to-change-user-profile)
  - [How to delete a user](#how-to-delete-a-user)
  - [How to delete a library](#how-to-delete-a-library)
  - [How to delete a review](#how-to-delete-a-review)
  - [How to delete a reply](#how-to-delete-a-reply)
- [Routes](#routes)
- [Development Team 33](#development-team-33)

## URL
https://floating-savannah-82860.herokuapp.com/


## Important Detail

The overall purpose of our web application is for users to review and rank for the libraries, framework, and API in programming languages. This web application serves small and large tech companies, programmers and anyone who is interested in coding. It’s beneficial for them to learn which API is better at doing the job, which is more cost effective, easier to use, and has better compatibility. It is able to:

- Check which library/framework/API is the best answer for the problem
- Review the pros and cons wrote by others for each library/framework/API
- Rank the library/framework/API
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
username: admin
password: admin

-- User login
Username: user
Password: user

### User profiling:

There are two types of users: admin and regular users. Regular users are those who have registered on the website. There are a set of features of regular users including name, email, occupation, skills, etc. Regular users are able to edit these information in the User Profile Page. Guests who haven’t registered do not have a user profile, cannot make comments under Library Pages, and cannot see the profile of regular users.

### User functionality:

Users need to create and account and log into with username and password. It also has the functionality of authorization because there are things that admin can do, but regular user cannot do. And there are things that regular users can do but guests cannot do. For example, a user is not able to delete other user’s posts. Regular users are able to write comments under the reviews, rate the reviews, and see the profile of other regular users who made comments under Library Page, by clicking on their username in the Library Pages. 

### Data:

The data section stores user profile information and libraries information. User profile information includes basic information and user favorite posts. Libraries information include library basic information (name and description) and user comments and replies to comments.

### Views:

- The login page
- The main page
- The ranking page of the library(framework/API)
- The page for a chosen library(framework/API) with their reviews and
  ranking scores
- User’s profile page
- Admin page

### Admin Functionality:

The admin has access to all elements in the Admin Toolbar. The Admin Toolbar contains three tabs: Home, Edit Users, and Edit Libraries. In the Edit Users tab, the admin is able to add a new user, delete users, and edit users’ information. In the Edit Libraries tab,  Admin can delete libraries.

### Additional features:

- Search for a particular library
- Showing the library from highest rank to lowest
- Users can add posts to their Favourites, so that they can access later in their profile page. They can also edit their Favourites
- Users can comment, rank a library and reply to others' comments.
- Display trending libraries and library suggestions on the home page

##  Detailed user interactions

### How to create an account?

On the home page, click the ‘login’ button on the right. If a user has not yet owned an account, an option to Signup is available on the left side of the page. Type in a user name and password and click the ‘sign up’ button. If the account is created successfully, then click cancel to close the popup window and login.

### How to change profile?

A user will click the “edit” button on their profile page, which will let them have the ability to change the information they want.

### How to find the ranking of libraries for each language?

Under the tab of each library, the ranking of libraries are automatic, from the ones with the highest star value to the lowest. The star values are shown next to the library name.

### How to write reviews for a library and give it a rating?

Each library has a Review Section where users can rate by giving stars, writing detailed reviews. Each post can be given at most 5 stars.

### How to reply under a review?

After reading a review, users can reply under the review to make some comments about the review.

### How to add posts to Favorites?

On a review page, users can click on “Favor this library” and the button will become “Favored”, which means the post has been successfully added to Favorites in the user profile.

### How to search a library?

On the ranking page, type in the library name in CamelCase and use spaces, and click the search icon. The library would show up under the textbox. You can go to the library review page by clicking on the library name. If the library does not exist, “Lib not found” will show under the textbox. You can clear the textbox and the previous library search by clicking the “cancel” button.

## Detailed admin interactions 

### How to login as Admin
On the login page, click the ‘Admin’ button on the top left corner. Then type in admin username and password, and click ‘Login’. The web app would redirect you to the admin console.

### How to create a new user
On the admin page with the ‘Edit Users’ toolbar clicked, click the ‘Add New User’ button. Then on the popup window, type in the username and password and click the ‘Add User’ Button. A new user is then created and can be found on the page.

### How to change user profile
On the admin page with the ‘Edit Users’ toolbar clicked, click the ‘Edit user info’ button beside the user you want to change. Then in the popup window, change the information and then click the ‘submit’ button. The user’s information is changed and saved on the database.
 
### How to delete a user
On the admin page with the ‘Edit Users’ toolbar clicked, click the ‘Delete’ button beside the user you want to delete. Then the user account is deleted.

### How to delete a library
On the admin page with the ‘Edit Library’ toolbar clicked, click the ‘Delete’ button beside the library you want to delete. Then the library page is deleted and can no longer be viewed.

### How to delete a review
On the library page where the review exists, click the ‘X’ button beside the review. And then the review is deleted. 

### How to delete a reply
On the library page where the reply exists, click the ‘X’ button beside the reply. And then the review is deleted. 

## Routes

### Post Libraries
Link: "/api/libraries"
Body: {name, description, language, picture}
Result: a library will be created
Usage: use to add libraries. This api is not used by the webpage but for set up web page purposes.

### Get Libraries by Name
Link: "/api/libraries/library/:libName"
Parameter: library name
Result: the library with libName as name
Usage: get a library information by using its name. It is used to search for a library inside search functionality.

### Get Libraries
Link: "/api/libraries"
Result: get all libraries that are created inside a dictionary.

### Get Libraries by language
Link: "/api/libraries/language/:language"
Parameter: Language: python, javascript, java
Result: get the library with language as its language inside a dictionary
Usage: get a library information using its language. Used in the ranking page which has different pages for different libraries. 

### Get library by id
Link: "/api/libraries/:libID"
Parameter: the library _id
Result: get a library with libID as _id
Usage: to get the information on a library. It is used to load the library in the review page.

### Delete library
Link: "/api/libraries/:libID"
Parameter: the library _id
Result: a library with the input library_id will be deleted
Usage: it is used in the admin page to delete a library.

—

### Post Review
Link: "/api/libraries/:libID"
Parameter: the library _id that the review belongs
Body: {user_id, comment, username, rate}
Result: post a dictionary containing the new post information and the library information
Usage: it is used to add reviews into the library that has the libID. It is used when users submit a review.

### Delete Review:
Link:"/api/libraries/:libID/:commentID"
Parameter: the library _id that the review belongs and the review _id
Result: a dictionary that contains the information of deleted review and the library information
Usage: it is used for admin to delete a comment

### Post Reply
Link: "/api/libraries/:libID/:commentID"
Parameter: the library _id and the review _id that the reply belongs
Body: {user_id, username, comment}
Result: a dictionary containing the reply information and the library information
Usage: it is used when a user wants to reply to a review inside a library page

### Delete Reply
Link: "/api/libraries/:libID/:commentID/:replyID"
Parameter: the library _id and the review _id that the reply belongs to as well as the reply’s _id
Result: a dictionary that contains the reply information and the library information

—

### Login and create a session
Link: "users/login"
Body: {username, password}
Result: If authentication is successful, a dictionary that contains the user’s username, userid and if the user is a regular user (regular user-> true, admin->false).
###  POST a regular user
Link: "/api/users"
Body: {username, password}
Result: {username, password, is_regUser: true}

###  POST an admin
Link: "/api/admin"
Body: {username, password}
Result: {username, password, is_regUser: false}

### Get all users
Link: "/api/users"
Result: a dictionary that contains a list of user objects

### Get information of a particular user
Link: "/api/users/:id”
Parameter: id is userid
Result: a user object containing username, password, email, name, phone, gender, birthday, job, skills,  more, is_regUser, and fav_libs

### Update information for a user (post request)
Link: "/api/users/:id”
Parameter: id is userid
Body: {name, email, phone, gender, birthday, job, skills, more}
Result: {name, email, phone, gender, birthday, job, skills, more}

### Delete a user (delete request)
Link: "/api/users/:id"
Parameter: id is userid
Result: user deleted


—

### Post a  favourite library to a user’s fav_libs lists
Link: "/api/users/libs/:id”
Parameter: id is userid
Body: { lib_id, name, pic,  language}
Result: once a user favorites a library, this library will be appended to the user’s fav_lib list

### Get all libraries of a user with userid
Link: "/api/users/libs/:id”
Parameter:  id is userid
Result: {fav_libs: [ favLib objects ] }

### Delete one favorite library of a user
Link: "/api/users/libs/:id/:lib_id”
Parameter:  id is userid, lib_id is library id
Result: once a user unfavorite a library, this library will be deleted from the user’s fav_lib list

