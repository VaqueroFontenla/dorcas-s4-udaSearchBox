import React, { Component } from 'react';
import {buttonSearch} from './UdaSearchBoxStyles.js';

class SearchButton extends Component {
    render() {
        return (
            <div>
                <button style = {buttonSearch}>Buscar</button>
            </div>
        );
    }
}

export default SearchButton;