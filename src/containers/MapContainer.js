import React, { Component } from 'react';

import 'ol/ol.css';
import 'antd/dist/antd.css';
import './../react-geo.css';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOsm from 'ol/source/OSM';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Vector as VectorSource} from 'ol/source';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
import {Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj.js';

import {
  MapComponent
} from '@terrestris/react-geo';

const layer = new OlLayerTile({
  source: new OlSourceOsm()
});

const center = [ 0, 15 ];

var newMap = [];

const image = new CircleStyle({
  radius: 6,
  fill: new Fill({
    color: '#3399CC'
  }),
  stroke: new Stroke({
    color: '#fff',
    width: 2
  })
});

const styles = {
  'Point': new Style({
    image: image
  })
};

const styleFunction = function(feature) {
  return styles[feature.getGeometry().getType()];
};

const geojsonObject = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857'
    }
  },
  'features': newMap,
};

const vectorSource = new VectorSource({
  features: (new GeoJSON()).readFeatures(geojsonObject)
});

vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: styleFunction
});

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 5
  }),
  layers: [layer],
  vectorLayer
});

map.on('postcompose', map.updateSize);

class MapContainer extends Component {
  state = {
    features: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('1', nextProps.mapFeatures);
    if (prevState.features !== nextProps.mapFeatures) {
      return {
        features: nextProps.mapFeatures
      };
    }

    return prevState.features;
  }

  componentDidMount() {
    const { mapFeatures } = this.props;

    console.log('map', this.state.features);

    console.log(mapFeatures, 'myProp');

    if (mapFeatures && mapFeatures.length > 0) {
      newMap = mapFeatures.reduce((arr, elem) => {
        return [
          ...arr, {
            id: elem.id,
            type: elem.type,
            properties: elem.properties,
            geometry: {
              type: elem.geometry.type,
              coordinates: fromLonLat(elem.geometry.coordinates)
            }
          }
        ]
      }, []);
    }
  }

  render() {
    console.log('2', this.state.features);
    return (
      <div className="mapBox">
        <MapComponent
          map={map}
        />
      </div>
    );
  }
}

export default MapContainer;

