const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/fretboard';
const db = mongoose.connect(mongoURI, { useNewUrlParser: true });
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect(mongoURI, {
  poolSize: 1000
}, function (err, db) {
  assert.equal(null, err);
  console.log("MongoDB connected to server");
  db.close();
});

const scalesSchema = new mongoose.Schema({
  chordName: String,
  scales: {
    major: [Number],
    blues: [Number],
    minor: [Number],
    harmonicMinor: [Number],
    melodicMinor: [Number],
    majorPentatonic: [Number],
    minorPentatonic: [Number],
    majorArpeggio: [Number],
    minorArpeggio: [Number]
  }
});

const Scales = mongoose.model('Scales', scalesSchema);

const fetch = (chord, callback) => {
  Scales.find({ chordName: chord })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => console.log(err));
}

module.exports.fetch = fetch;
module.exports.db = db;