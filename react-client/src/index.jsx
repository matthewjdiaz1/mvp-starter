import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Fretboard from './components/fretboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chord: 'C',
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
    this.handleClick = this.handleClick.bind(this);
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
        console.log(data[0].scales);
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
  handleClick(chord) {
    console.log(chord);
    this.setState({
      chord
    });
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
          <button onClick={() => this.handleClick('C')}>C</button>
          <button onClick={() => this.handleClick('D')}>D</button>
          <button onClick={() => this.handleClick('E')}>E</button>
          <button onClick={() => this.handleClick('F')}>F</button>
          <button onClick={() => this.handleClick('G')}>G</button>
          <button onClick={() => this.handleClick('A')}>A</button>
          <button onClick={() => this.handleClick('B')}>B</button>
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
          <strong>{this.state.chord} {this.state.currentScaleName}</strong>
        </div>
        <div>
          <Fretboard scale={this.state.currentScale} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));