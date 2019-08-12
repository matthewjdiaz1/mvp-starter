import React from 'react';

class Fretboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guitarTuning: [
        4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4,
        11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7,
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2,
        9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4,
        // 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 // 1st string - standard
        9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9   // 1st string - drop A
      ],
      fretToNote: {
        0: 'C',
        1: 'C#', // Db
        2: 'D',
        3: 'D#', // Eb
        4: 'E',
        5: 'F',
        6: 'F#', // Gb
        7: 'G',
        8: 'G#', // Ab
        9: 'A',
        10: 'A#', // Bb
        11: 'B'
      }
    }
    this.filterNotes = this.filterNotes.bind(this);
    this.highlightFrets = this.highlightFrets.bind(this);
  }
  filterNotes(fret, index) {
    if (this.props.scale.includes(fret)) {
      if (this.props.scale[0] === fret) {
        return <div className="note" key={index} style={{ color: 'red' }}>{this.state.fretToNote[fret]}</div>
      }
      return <div className="note" key={index}>{this.state.fretToNote[fret]}</div>;
    } else {
      return <div key={index}></div>
    }
  }
  highlightFrets(fretNumber, index) {
    let fretAccent = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    if (index <= 24) {
      if (!fretAccent.includes(index)) {
        return <div className='fret-number' key={index} style={{ opacity: .25 }}></div>
      } else {
        return <div className='fret-number' key={index}></div>
      }
    }

  }

  render() {
    return (
      <div className="fretboard-container">
        <div>{this.props.currentScale}</div>
        <div className="note-grid">
          {this.state.guitarTuning.map(this.filterNotes)}
        </div>
        <div className="fret-number-container">
          {this.state.guitarTuning.map(this.highlightFrets)}
        </div>
      </div>
    )
  }
}

export default Fretboard;
