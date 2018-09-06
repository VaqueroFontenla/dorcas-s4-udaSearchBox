import React, { Component } from 'react';
import PropTypes from 'prop-types';
import place from 'places.js';

class Places extends Component {


    componentDidMount() {

        let options = {
            container: this.autoCompletePlace,
            language: this.props.language,
            useDeviceLocation: this.props.useDeviceLocation,
        };

        const optionnalPropsKeys = ['type', 'countries', 'aroundLatLng', 'aroundRadius', 'templates', 'appId', 'apiKey'];

        for (let optionnalPropKey of optionnalPropsKeys) {
            if (this.props[optionnalPropKey]) { options[optionnalPropKey] = this.props[optionnalPropKey]; }
        }

        const autocomplete = place(options);
        autocomplete.on('change', this.props.onChange);
        autocomplete.on('suggestions', this.props.onSuggestions);
        autocomplete.on('clear', this.props.onClear);
    }

    render() {
        const {
            placeholder,
            status,
            config
        } = this.props
        console.log(this.props)
        return (
            <div status={status}>
                <label
                    htmlFor="input-search"
                    style={{ display: 'none' }}
                >
                    {placeholder}
                </label>
                <input id='urbanTourPlaces'
                    placeholder={placeholder}
                    ref={(input) => { this.autoCompletePlace = input; }} />
            </div>
        );
    }
}

Places.propTypes = {
    placeholder: PropTypes.string,
    apiKey: PropTypes.string,
    appId: PropTypes.string,
    aroundLatLng: PropTypes.string,
    aroundRadius: PropTypes.number,
    countries: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    language: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSuggestions: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    templates: PropTypes.object,
    type: PropTypes.oneOf(['city', 'country', 'address', 'busStop', 'trainStation', 'townhall', 'airport']),
    useDeviceLocation: PropTypes.bool,
};

Places.defaultProps = {
    disabled: false,
    language: navigator.language,
    useDeviceLocation: false,
    onChange: (query, rawAnswer, suggestion, suggestionIndex) => console.log(query, rawAnswer, suggestion, suggestionIndex),
    onSuggestions: (query, rawAnswer, suggestions) => console.log(query, rawAnswer, suggestions),
    onClear: (query) => console.log(query),
};

export default Places;