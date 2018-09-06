import React, { Component } from 'react';
import MapIcon from '../images/map.png';
import MapSelectIcon from '../images/map_select.png';
import PlaceIcon from '../images/place.png';
import PlaceSelectIcon from '../images/place_select.png';
import {searchInputStyle} from './UdaSearchBoxStyles.js';

class IconInput extends Component {
    render() {
        const {
            iconVisiblePlace,
            iconVisibleMap,
            iconActive,
        } = this.props

        if (iconVisiblePlace && iconVisibleMap) {
            return (
                <div>
                    <img
                        src={PlaceSelectIcon}
                        alt="Place icon"
                    />
                    <img
                        src={MapIcon}
                        alt="Place icon"
                    />
                </div>
            );
        } else if (iconVisiblePlace) {
            return (
                <div>
                    <img
                        src={PlaceSelectIcon}
                        alt="Place icon"
                    />
                </div>
            );
        } else if (iconVisibleMap) {
            return (
                <div>
                    <img
                        src={MapSelectIcon}
                        alt="Place icon"
                    />
                </div>
            );
        } else {
            return null;
        }
    }
}

export default IconInput;