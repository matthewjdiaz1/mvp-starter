const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const scales = require('../database-mongo');
const db = require('../database-mongo/index.js');
const port = 3001;

const app = express();


app.use(express.static(path.join(__dirname + '/../react-client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/scales/:chord', function (req, res) {
  const chord = req.params.chord
  scales.fetch(chord, function (err, data) {
    if (err) {
      console.log('server data', data);
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

