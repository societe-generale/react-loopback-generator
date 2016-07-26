import React, {Component, PropTypes} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

class MapBackground extends Component {

  render() {
    let containerStyle = {
      height: this.props.height || '100vh',
      position: 'relative',
    };
    let mapStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
    let childrenStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.65)'
    };
    return (
      <div style={containerStyle}>
        <Map
          center={[51.505, -0.09]}
          zoom={5}
          zoomControl={false}
          style={mapStyle}>
          <TileLayer
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>
        <div style={childrenStyle}>
          <div style={{position: 'relative', height: '100%'}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

export default MapBackground;
