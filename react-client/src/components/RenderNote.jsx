import React from 'react';

class RenderNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: "hidden"
    }
    this.setVisible = this.setVisible.bind(this);
  }
  setVisible() {
    this.setState({ visibility: "visible" });
  }
  componentDidMount() {
    setTimeout(() => this.setVisible(), this.props.index * 3);
    // console.log(this.props.index);
  }

  render() {
    if (this.props.scale.includes(this.props.fret)) {
      if (this.props.scale[0] === this.props.fret) {
        return <div className="note" key={this.props.index} style={{ color: "red", visibility: this.state.visibility }}>{this.props.fretToNote[this.props.fret]}</div>
      }
      return <div className="note" key={this.props.index} style={{ visibility: this.state.visibility }}>{this.props.fretToNote[this.props.fret]}</div>
    } else {
      return <div key={this.props.index} style={{ visibility: this.state.visibility }}></div>
    }
  }
}

export default RenderNote;