# Biblio

Biblio is a social networking website for book readers allowing individuals to search a database of books, share and have their own library of books!

## Features

* Secure login and sign up options with optional captcha facility*.
* Users can add a book to their library/bookshelf, mark it as favorite, like the book, mark a book as ‘want to read’, ‘currently reading’ or ‘finished reading’ and also be able to Review it.
* A user’s profile page have the following - activity of the user, status of various books, bookshelves and the people whom they follow.
* The search bar in the home page enables user to search books by Title, Author, Publisher, ISBN or subject.
* Asynchronous Instant Searching. User's can see best search results dynamically.
* User can follow and view the profile page of other users. Users can also make their activity - public/private. Private activities will not be visible to any other user.
* Users can share their activity in their facebook wall*.

----

## Setting up

**Connecting to database**
* Replace "root" and "" with your username and password of mySQL database manager in config.php.
```html
define ('DB_USER','root');
```
```html
define ('DB_PASSWORD','');
```

----

**Setting up reCaptcha**
* Please add your private and public key of reCaptcha in config.php and change recaptcha="disabled" to "enabled".
```html
$privateKey = "private_key";
```
```html
$publicKey = "public_key";
```
----
* NOTE: Facebook sharing can be done once the website is hosted. The corresponding embed code must be pasted as $shareURL in profile.php
----

## Built using

* [HTML](https://www.w3.org/html/)
* [CSS](https://www.w3.org/Style/CSS/)
* [Vanilla JS](http://vanilla-js.com/)
* [PHP](http://php.net/)
* [AJAX](https://www.w3schools.com/xml/ajax_intro.asp)
* [reCaptcha API](https://www.google.com/recaptcha/)
