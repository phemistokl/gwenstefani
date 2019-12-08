import React from 'react';
import MapContainer from '../containers/MapContainer';

const FeaturesList = ({ features }) =>
    <div className="map_container">
        <h2>Features</h2>
        <div className="flex-container">
            <div className="map_box">
                <MapContainer mapFeatures={features} />
            </div>
            <div className="sidebar">
                {(features && features.length > 0) ? features.map(({ properties }, i) =>
                    <div key={i} className="user_box">
                        <img src={properties.avatar} alt="logo" />
                        <div>
                            <p>{properties.userName}</p>
                            <p><a href={`mailto:${properties.email}`}>{properties.email}</a></p>
                        </div>
                    </div>
                ) : null }
            </div>
        </div>
    </div>

export default FeaturesList;