// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models and passport as we've configured it
let db = require("../models");
let passport = require("../config/passport");
let bcrypt = require('bcryptjs');



// Requiring our Todo model
// let db = require("../models");
// let bcrypt = require('bcryptjs');
// const saltRounds = 10;

// Routes
// =============================================================



// *** Passport.js Authentication ***
// Cited: https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post('/api/signIn', passport.authenticate('local'),
      function (req, res) {
        console.log('hitting function')
        res.json({
          success: true
        });

      });


    // app.post('/api/signIn', passport.authenticate('local'), function (req, res) {


    //       res.json({
    //         sucess: true})

    //       });

    // app.post('/api/signIn', passport.authenticate('local'), function (req, res) {
    //   // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    //   // So we're sending the user back the route to the members page because the redirect will happen on the front end
    //   // They won't get this or even be able to access this page if they aren't authed
    //   console.log('hitting function api route.js')
    //   res.json("/game")
    // });




    app.post("/api/signUp", function (req, res) {
      // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
      // So we're sending the user back the route to the members page because the redirect will happen on the front end
      // They won't get this or even be able to access this page if they aren't authed
      console.log(req.body)
      db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }).then(function () {
        res.json({
          success: true
        });

      }).catch(function (err) {
        console.log(err);
        res.json({
          success: false
        });
        // res.status(422).json(err.errors[0].message);
      });
    });


    // ******* Possible function to verify if username already exists when user creates an account *************
    // app.post("/api/signUp", function (req, res, username, done) {
    //       db.User.findOne({
    //           where: {
    //             username: username
    //           }
    //         }).then(function (User, err) {
    //             if (err) {
    //               console.log("err", err)
    //               return done(err);
    //             }
    //             if (User) {
    //               console.log('signupMessage', 'That username is already taken.');
    //               return done(null, false, {
    //                 message: "Sorry, that username is already taken. Try another one."
                  

    //             } else {
    //               db.User.create({
    //                 username: req.body.username,
    //                 email: req.body.email,
    //                 password: req.body.password
    //               }).then(function () {
    //                 res.json({
    //                   success: true
    //                 });

    //               }).catch(function (err) {
    //                 console.log(err);
    //                 res.json({
    //                   success: false
    //                 });
    //                 // res.status(422).json(err.errors[0].message);
    //               });
    //             })
    //             };







                // app.post("/api/signIn", passport.authenticate('local', {
                //   failureRedirect: '/'
                // }), (req, res) => {

                //   res.redirect("/game")


                // })

                // app.post('/api/signIn', passport.authenticate('local', {
                //     failureRedirect: '/index'
                //   }),
                //   function (req, res) {
                //     res.redirect('/game');
                //   });

                //
                // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
                // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
                // otherwise send back an error
                // app.post("/api/signUp/beta", function (req, res) {
                //   console.log(req.body);

                // });
                //
                // Route for logging user out
                app.get("/logout", function (req, res) {
                  req.logout();
                  res.redirect("/");
                });
                //
                // Route for getting some data about our user to be used client side
                app.get("/api/user_data", function (req, res) {
                  if (!req.user) {
                    // The user is not logged in, send back an empty object
                    res.json({});
                  } else {
                    // Otherwise send back the user's email and id
                    // Sending back a password, even a hashed password, isn't a good idea
                    res.json({
                      email: req.user.email,
                      id: req.user.id
                    });
                  }
                });

                // login page: storing and comparing email and password,and redirecting to home page after login
                // app.post('/api/signIn', function (req, res) {
                //   db.User.findOne({
                //     where: {
                //       username: req.body.username
                //     }
                //   }).then(function (user) {
                //     if (!user) {
                //       res.redirect('/game');
                //     } else {
                //       bcrypt.compare(req.body.password, user.password, function (err, result) {
                //         if (result == true) {
                //           res.redirect('/game');
                //         } else {
                //           res.send('Incorrect password');
                //           res.redirect('/');
                //         }
                //       });
                //     }
                //   });
                // });


              }; //End of Modules Export















              // module.exports = function (app) {

              // Cited Expression.js Authentication: https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
              //register: storing name, email and password and redirecting to home page after signup
              // app.post('/userController/create', function (req, res) {
              //   bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
              //     db.User.create({
              //       name: req.body.username,
              //       email: req.body.email,
              //       password_digest: hash
              //     }).then(function (data) {
              //       if (data) {
              //         res.redirect('/game');
              //       }
              //     });
              //   });
              // });

              // login page: storing and comparing email and password,and redirecting to home page after login
              // app.post('/user', function (req, res) {
              //   db.User.findOne({
              //     where: {
              //       email: req.body.email
              //     }
              //   }).then(function (user) {
              //     if (!user) {
              //       res.redirect('/');
              //     } else {
              //       bcrypt.compare(req.body.password, user.password, function (err, result) {
              //         if (result == true) {
              //           res.redirect('/game');
              //         } else {
              //           res.send('Incorrect password');
              //           res.redirect('/');
              //         }
              //       });
              //     }
              //   });
              // });


              // GET route for getting all of the posts
              // app.get("/api/posts/", function (req, res) {
              //   db.Post.findAll({})
              //     .then(function (dbPost) {
              //       res.json(dbPost);
              //     });
              // });

              // Get route for returning posts of a specific category
              // app.get("/api/posts/category/:category", function (req, res) {
              //   db.Post.findAll({
              //       where: {
              //         category: req.params.category
              //       }
              //     })
              //     .then(function (dbPost) {
              //       res.json(dbPost);
              //     });
              // });

              // Get route for retrieving a single post
              // app.get("/api/posts/:id", function (req, res) {
              //   db.Post.findOne({
              //       where: {
              //         id: req.params.id
              //       }
              //     })
              //     .then(function (dbPost) {
              //       res.json(dbPost);
              //     });
              // });

              // POST route for saving a new post
              // app.post("/api/posts", function (req, res) {
              //   console.log(req.body);
              //   db.Post.create({
              //       title: req.body.title,
              //       body: req.body.body,
              //       category: req.body.category
              //     })
              //     .then(function (dbPost) {
              //       res.json(dbPost);
              //     });
              // });

              // DELETE route for deleting posts
              // app.delete("/api/posts/:id", function (req, res) {
              //   db.Post.destroy({
              //       where: {
              //         id: req.params.id
              //       }
              //     })
              //     .then(function (dbPost) {
              //       res.json(dbPost);
              //     });
              // });

              // PUT route for updating posts
              //   app.put("/api/posts", function (req, res) {
              //     db.Post.update(req.body, {
              //         where: {
              //           id: req.body.id
              //         }
              //       })
              //       .then(function (dbPost) {
              //         res.json(dbPost);
              //       });
              //   });
              // };