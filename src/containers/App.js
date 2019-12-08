import React, { Component } from 'react';
import { connect}  from 'react-redux';
import { selectFeature, fetchFeatures } from '../actions';
import FeaturesList from '../components/FeaturesList';
import './App.css';

class App extends Component {
    componentDidMount() {
        const { onFetchFeatures } = this.props;

        onFetchFeatures();
    }
    
    render() {
        const { features } = this.props;

        return (
            <div>
              <FeaturesList features={features} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        features: state.features.features,
        isFetching: state.features.isFetching,
        currentFeature: state.currentFeature,
        error: state.features.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onFeatureSelect: id => dispatch(selectFeature(id)),
        onFetchFeatures: () => dispatch(fetchFeatures())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

