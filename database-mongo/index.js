const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/fretboard';
const db = mongoose.connect(mongoURI, { useNewUrlParser: true });
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect(mongoURI, {
  poolSize: 1000
}, function (err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
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
      console.log(data);
      callback(null, data);
    })
    .catch((err) => console.log(err));
}

module.exports.fetch = fetch;
module.exports.db = db;

// db.scales.insert({
//   chordName: 'B',
//   scales: {
//     major: [11,1,3,4,6,8,10],
//     blues: [11,2,4,5,6,9],
//     minor: [11,1,2,4,6,7,9],
//     harmonicMinor: [11,1,2,4,6,7,10],
//     melodicMinor: [11,1,2,4,6,8,10],
//     majorPentatonic: [11,1,3,6,8],
//     minorPentatonic: [11,2,4,6,9],
//     majorArpeggio: [11,3,6],
//     minorArpeggio: [11,2,6]
//   }
// })

// db.scales.findOneAndDelete(
//   { chordName : "G" }
// )