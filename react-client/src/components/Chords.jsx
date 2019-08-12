import React from 'react';

class Chords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChordName: 'D Major',
      currentChord: [0, 4, 7],
      blackKeys: [1, 3, 6, 8, 10, 13, 15, 18, 20, 22],
      whiteKeys: [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23]
    }
    this.mapChordsTop = this.mapChordsTop.bind(this);
    this.mapChordsBot = this.mapChordsBot.bind(this);
    this.mapChordNames = this.mapChordNames.bind(this);
    this.clickChord = this.clickChord.bind(this);
  }
  clickChord(currentChord) {
    this.setState({
      currentChordName: currentChord[0],
      currentChord: currentChord[1]
    });
    this.mapChordsTop(currentChord);
    this.mapChordsBot(currentChord);
  }
  mapChordNames(chord, index) {
    return <div key={index} onClick={() => this.clickChord(chord)}>{chord[0]}</div>
  }
  mapChordsTop(chordNumber, index) {
    const blackKeys = {
      1: 'C#',
      3: 'D#',
      6: 'F#',
      8: 'G#',
      10: 'A#',
      13: 'C#',
      15: 'D#',
      18: 'F#',
      20: 'G#',
      22: 'A#'
    }
    if (this.state.currentChord.includes(chordNumber)) {
      return <div className="note" key={index} style={{ color: 'red' }}>{blackKeys[chordNumber]}</div>
    } else {
      return <div key={index}></div>
    }
  }
  mapChordsBot(chordNumber, index) {
    const whiteKeys = {
      0: 'C',
      2: 'D',
      4: 'E',
      5: 'F',
      7: 'G',
      9: 'A',
      11: 'B',
      12: 'C',
      14: 'D',
      16: 'E',
      17: 'F',
      19: 'G',
      21: 'A',
      23: 'B'
    }
    if (this.state.currentChord.includes(chordNumber)) {
      return <div className="note" key={index}>{whiteKeys[chordNumber]}</div>
    } else {
      return <div key={index}></div>
    }
  }

  render() {
    return (
      <div className="piano-container">
        <div className="chord-list">
          <div>
            <strong>Chords in Key - {this.props.currentChord}</strong>
          </div>
          {this.props.chords.map(this.mapChordNames)}
        </div>
        <div className="piano-grid">
          <div className="piano-grid-top">
            {this.state.blackKeys.map(this.mapChordsTop)}
          </div>
          <div>
            <strong>Current Chord: {this.state.currentChordName}</strong>
          </div>
          <div className="piano-grid-bot">
            {this.state.whiteKeys.map(this.mapChordsBot)}
          </div>
        </div>
      </div>
    )
  }
}

export default Chords;
