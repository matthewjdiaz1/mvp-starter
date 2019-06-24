import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Fretboard from './components/Fretboard.jsx';
import Chords from './components/Chords.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chord: 'C',
      chordsInKey: [
        ['A Major', [2, 6, 9]],
        ['A Major Seventh', [2, 6, 9, 13]],
        ['E Minor', [4, 7, 11]],
        ['E Minor Seventh', [4, 7, 11, 14]],
        ['F# Minor', [6, 9, 13]],
        // ['E Minor Seventh', [4, 7, 11, 2]],
        ['G Major', [7, 11, 14]],
        // ['F Major Seventh', [5, 9, 0, 4]],
        ['A Major', [9, 13, 16]],
        // ['G Dominant Seventh', [7, 11, 2, 4]],
        ['B Minor', [11, 14, 20]],
        // ['A Minor Seventh', [9, 0, 4, 7]],
        ['C# Diminished', [1, 4, 7]],
        // ['B Minor Seventh Flat Five', [11, 2, 5, 9]],
      ],
      currentScale: [0, 2, 4, 5, 7, 9, 11],
      major: null,
      blues: null,
      minor: null,
      harmonicMinor: null,
      melodicMinor: null,
      majorPentatonic: null,
      minorPentatonic: null,
      majorArpeggio: null,
      minorArpeggio: null
    }
    this.switchKey = this.switchKey.bind(this);
    this.fetchChord = this.fetchChord.bind(this);
    this.switchScale = this.switchScale.bind(this);
  }
  componentDidMount() {
    this.fetchChord('C');
  }

  fetchChord(chord) {
    $.ajax({
      url: `/api/scales/${chord}`,
      type: 'GET',
      success: (data) => {
        this.setState({
          chord: chord,
          scales: data[0].scales,
          currentScale: data[0].scales.major,
          currentScaleName: 'Major',
          major: data[0].scales.major,
          blues: data[0].scales.blues,
          minor: data[0].scales.minor,
          harmonicMinor: data[0].scales.harmonicMinor,
          melodicMinor: data[0].scales.melodicMinor,
          majorPentatonic: data[0].scales.majorPentatonic,
          minorPentatonic: data[0].scales.minorPentatonic,
          majorArpeggio: data[0].scales.majorArpeggio,
          minorArpeggio: data[0].scales.minorArpeggio
        });
      },
      error: (err) => {
        console.log('error here', err);
      }
    })
  }
  switchKey(key) {
    this.fetchChord(key);
  }
  switchScale(scale, scaleName) {
    this.setState({
      currentScale: scale,
      currentScaleName: scaleName
    })
  }


  render() {
    return (
      <div>
        <div>
          <strong>Key</strong>
          <button onClick={() => this.switchKey('C')}>C</button>
          <button onClick={() => this.switchKey('D')}>D</button>
          <button onClick={() => this.switchKey('E')}>E</button>
          <button onClick={() => this.switchKey('F')}>F</button>
          <button onClick={() => this.switchKey('G')}>G</button>
          <button onClick={() => this.switchKey('A')}>A</button>
          <button onClick={() => this.switchKey('B')}>B</button>
        </div>
        <div>
          <strong>Scale</strong>
          <button onClick={() => this.switchScale(this.state.major, 'Major')}>Major</button>
          <button onClick={() => this.switchScale(this.state.minor, 'Minor')}>Minor</button>
          <button onClick={() => this.switchScale(this.state.blues, 'Blues')}>Blues</button>
          <button onClick={() => this.switchScale(this.state.harmonicMinor, 'Harmonic Minor')}>Harmonic Minor</button>
          <button onClick={() => this.switchScale(this.state.melodicMinor, 'Melodic Minor')}>Melodic Minor</button>
          <button onClick={() => this.switchScale(this.state.majorPentatonic, 'Major Pentatonic')}>Major Pentatonic</button>
          <button onClick={() => this.switchScale(this.state.minorPentatonic, 'Minor Pentatonic')}>Minor Pentatonic</button>
          <button onClick={() => this.switchScale(this.state.majorArpeggio, 'Major Arpeggio')}>Major Arpeggio</button>
          <button onClick={() => this.switchScale(this.state.minorArpeggio, 'Minor Arpeggio')}>Minor Arpeggio</button>
        </div>
        <div>
          <strong>Current Scale  -  {this.state.chord} {this.state.currentScaleName}</strong>
        </div>
        <div>
          <Fretboard scale={this.state.currentScale} />
        </div>
        <div>
          <Chords chords={this.state.chordsInKey} currentChord={`${this.state.chord} ${this.state.currentScaleName}`} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));