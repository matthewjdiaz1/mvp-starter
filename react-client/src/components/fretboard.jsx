import React from 'react';

class Fretboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guitarTuning: [
        4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4,
        7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0,
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7,
        9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2,
        4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        // 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4 // standard
        9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2 // drop A
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
  }
  filterNotes(fret) {
    if (this.props.scale.includes(fret)) {
      if (this.props.scale[0] === fret) { return <div className="note" style={{ color: 'red' }}>{this.state.fretToNote[fret]}</div> }
      return <div className="note">{this.state.fretToNote[fret]}</div>;
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div className="fretboard-container">
        <div className="note-grid">
          {this.state.guitarTuning.map(this.filterNotes)}
        </div>
      </div>
    )
  }
}

export default Fretboard;