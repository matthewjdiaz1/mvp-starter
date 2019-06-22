import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Fretboard from './components/fretboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      // keySignature: [0, 4, 7],
      keySignature: [0, 2, 4, 5, 7, 9, 11],
      tempo: null,
      timeSignature: null,
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div>
        <button>C</button>
        <button>D</button>
        <button>E</button>
        <button>F</button>
        <button>G</button>
        <button>A</button>
        <button>B</button>
        <div></div>
        <Fretboard keySignature={this.state.keySignature} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));