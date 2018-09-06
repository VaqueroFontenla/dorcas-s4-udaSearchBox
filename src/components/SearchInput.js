import React, { Component } from 'react';
import IconInput from './IconInput.js';
import {inputIconBox, inputBox} from './UdaSearchBoxStyles.js';
class SearchInput extends Component {
    render() {
        const {
            placeholderMap,
            placeholderPlace,
            iconVisiblePlace,
            iconVisibleMap,
            iconActive,
        } = this.props
        return (
            <div style={inputIconBox}>
                <label htmlFor="input-search" style={{ display: 'none' }}>Voy a ser un label oculto</label>
                <input type="search" id="input-search" placeholder="Voy a ser una prop" style={inputBox}/>
                <IconInput
                    iconVisiblePlace={iconVisiblePlace}
                    iconVisibleMap={iconVisibleMap}
                    iconActive={iconActive}
                />
            </div>
        );
    }
}

export default SearchInput;