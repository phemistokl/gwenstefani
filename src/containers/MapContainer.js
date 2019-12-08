import React, { Component } from 'react'
import {
  Map,
  Marker,
  Polygon,
  Popup,
  TileLayer,
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';

export default class TooltipExample extends Component {
  state = {
    clicked: 0,
  }

  onClickCircle = () => {
    this.setState({ clicked: this.state.clicked + 1 })
  }

  render() {
    const clickedText =
      this.state.clicked === 0
        ? 'Click this Circle to change the Tooltip text'
        : `Circle click: ${this.state.clicked}`

    const { mapFeatures } = this.props;

    return (
      <Map className="markercluster-map" center={[51.0, 19.0]} zoom={4} maxZoom={18}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <MarkerClusterGroup>
          {Array.isArray(mapFeatures) && mapFeatures.length && mapFeatures.map(({ geometry, properties }, index) => (
            <Marker position={geometry.coordinates} key={index}>
              <Popup>
                <div>
                  <b>{properties.userName}</b>
                  <p><a href={`mailto:${properties.email}`}>{properties.email}</a></p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

      </Map>
    )
  }
}
