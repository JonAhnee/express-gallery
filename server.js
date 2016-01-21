var db = require('./models');
var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'views'));

// to view a list of gallery photos
app.get('/', function (req, res) {
  // var data = {
  //   gallery: [
  //   {author: 'Jon', link: 'https://i.ytimg.com/vi/ohjvRgewjCc/maxresdefault.jpg', description: 'Kappa Kappa Kappa'},
  //   {author: 'Jon', link: 'https://i.ytimg.com/vi/ohjvRgewjCc/maxresdefault.jpg', description: 'Kappa Kappa Kappa'}
  //   ]
  // };
  // res.render('index', data);
  db.Galleries.findAll({}).then(function (gallery) {
    res.json(gallery);
  });
});

// // to see a single gallery photo
// app.get('/gallery/:id', function (req, res) {

// });

// // to see a "new photo" form
// app.get('/gallery/new', function (req, res) {

// });

// to create a new gallery photo
app.post('/gallery', function (req, res) {
  db.Gallery.create({
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  }).then(function (gallery) {
    res.json(gallery);
  });

});

// // to see a form to edit a gallery photo identified by the :id
// app.get('/gallery/:id/edit', function (req, res) {

// });

// // updates a single gallery photo identified by the :id
// app.put('/gallery/:id', function (req, res) {

// });

// // to delete a single gallery photo identified by the :id
// app.delete('/gallery/:id', function (req, res) {

// });

db.sequelize
  .sync()
  .then(function () {
    app.listen(8080, function() {
      console.log('Listening on port 8080');
    });
  });

