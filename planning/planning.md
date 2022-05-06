### Project
* Working on the password manager project. Name is tentative.


## User stories

* As a ___, I want to _, because ____.

- As a user, I want to add a username and password for a specific website, because I want to retrieve it later.

- As a user, I want to generate passwords because generated passwords are more secure.

- As a user, I want to specify criteria on my passwords because some websites require conditions.

- As a user, I want to edit or change my password because sites may require me to change my password frequently or I might want to change my password.

- As a user, I want to be able to press a button to copy to clipboard because it is convenient and faster/better experience. 

- As a user, I want to categorize my passwords because I want to organize them.

- As a user, I should not be able to see passwords from other organizations because that is not secure.

- As a user, I want to be able to delete a password because I may no longer need it. (stretch)


### Identify the nouns

users - regular users & administrators (stretch)
organizations - will contain users
websites - usernames, passwords, website, category

### Routes

B GET /passwords
R GET /passwords/:id
E PUT/PATCH /passwords/:id
A POST /passwords
D DELETE /passwords/:id

## user login

```js
// do this instead
app.get('/login/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // or using plain-text cookies
  res.cookie('user_id', req.params.id);

  // send the user somewhere
  res.redirect('/');
});
```

## Stack Requirements
Your projects must use:

- ES6 for server-side (NodeJS) code
- NodeJS
- Express
- RESTful routes
- One or more CSS or UI "framework"s:
- jQuery
- A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor
- PostgreSQL and pg (with promises) for DBMS
- git for version control
