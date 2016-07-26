import React, {Component, PropTypes} from 'react';

class ImageBackground extends Component {

  render() {
    let imageUrl = this.props.url ? `url(${this.props.url})` : 'url(assets/images/background_00.jpg)';
    let containerStyle = {
      backgroundImage: imageUrl,
      backgroundPositionX: 'center',
      backgroundPositionY: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: this.props.height || '100vh',
    };
    return (
      <div style={containerStyle}>
        {this.props.children}
      </div>
    );
  }

}

export default ImageBackground;
