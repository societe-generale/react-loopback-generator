import React, {Component, PropTypes} from 'react';

class ColorBackground extends Component {

  render() {
    let containerStyle = {
      backgroundColor: this.props.color || 'white',
      height: this.props.height || '100vh',
      position: 'relative',
    };
    return (
      <div style={containerStyle}>
        {this.props.children}
      </div>
    );
  }

}

export default ColorBackground;
