import React, { Component } from 'react';
import Places from './Places.js';
import Cadastre from './Cadastre.js'
import IconInput from './IconInput.js';
import PopUp from './PopUp.js';
import SearchButton from './SearchButton';
import { getToken } from '../services/auth.js';
import { coordinatesCadastre } from '../services/callCadastre.js';
import '../stylesheets/style.css';
import { SearchBox, imputIconsBox } from '../stylesheets/StylesSearchBox';

class UdaSearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placesActive: true,
      cadastreActive: false,
      popUpIsOpen: false,
      lat: null,
      lng: null,
      token: null,
      refCadastre: '',
      error: false,
    }

    this.onChangeHandlerPlaces = this.onChangeHandlerPlaces.bind(this);
    this.onChangeHandlerCadastre = this.onChangeHandlerCadastre.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onClickHandlerPlaces = this.onClickHandlerPlaces.bind(this);
    this.onClickHandlerCadastre = this.onClickHandlerCadastre.bind(this);
    this.onClosePopUp = this.onClosePopUp.bind(this);
  }

  componentDidMount() {
    getToken('adalab', '4286')
      .then((res) => {
        this.setState({ token: res.data.authToken });
      })
  }

  onChangeHandlerPlaces(lat, lng) {
    this.setState({
      lat: lat,
      lng: lng,
    })
  }

  onChangeHandlerCadastre(e) {
    this.setState({ refCadastre: e.target.value })
  }

  //Get coordinates info by sending an address or a cadastre reference
  onSubmitHandler(e) {
    e.preventDefault();
    if (this.state.placesActive) {
      const lat = this.state.lat;
      const lng = this.state.lng;
      // console.log('lat,lng', lat, lng);
      if (lat !== null && lng !== null) {
        this.setState({
          lat: lat,
          lng: lng
        }, () => console.log(this.state.lat, this.state.lng));
      } else {
        this.setState({
          error: true,
          popUpIsOpen: true,
        });
      }
    } else if (this.state.cadastreActive) {
      this.onChangeHandlerCadastre(e)
      if (this.state.refCadastre === e.target.value) {
        return null
      } else if (this.state.refCadastre !== e.target.value) {
        coordinatesCadastre(this.state.token, this.state.refCadastre)
          .then((res) => {
            if (res !== undefined) {
              console.log(res)
              this.setState({
                lat: res.data.lat,
                lng: res.data.lon
              }, () => console.log(this.state.lat, this.state.lon));
            } else {
              this.setState({
                error: true,
                popUpIsOpen: true,
              });
            }
          })
      }
    }
  }

  onClickHandlerPlaces(e) {
    this.setState({ placesActive: true, cadastreActive: false })
  }

  onClickHandlerCadastre() {
    this.setState({ placesActive: false, cadastreActive: true })
  }

  onClosePopUp() {
    this.setState({ popUpIsOpen: false, error: false }, () => console.log(this.state.error, this.state.popUpIsOpen))
  }

  render() {
    const {
      placeholderPlaces,
      placeholderCadastre,
      placesOn,
      cadastreOn,
      configPlaces,
      configCadastre,
    } = this.props;

    return (
      <div style={SearchBox}>
        <div style={imputIconsBox}>
          {((this.state.placesActive && placesOn)
            || (!cadastreOn))
            && <Places
              placeholder={placeholderPlaces}
              config={configPlaces}
              onChangeHandlerPlaces={this.onChangeHandlerPlaces}
              onSubmitHandler={this.onSubmitHandler}
            />}
          {((this.state.cadastreActive && cadastreOn)
            || (!placesOn && cadastreOn))
            && <Cadastre
              placeholder={placeholderCadastre}
              config={configCadastre}
              onChangeHandlerCadastre={this.onChangeHandlerCadastre}
              onSubmitHandler={this.onSubmitHandler}
            />}
          <IconInput
            statusPlaces={placesOn}
            statusCadastre={cadastreOn}
            placesActive={this.state.placesActive}
            cadastreActive={this.state.cadastreActive}
            onClickHandlerPlaces={this.onClickHandlerPlaces}
            onClickHandlerCadastre={this.onClickHandlerCadastre}
          />
        </div>

        {((this.state.cadastreActive && cadastreOn)
          || (!placesOn && cadastreOn))
          && <SearchButton
            config={configCadastre}
            onSubmitHandler={this.onSubmitHandler}
            lat={this.state.lat}
            lng={this.state.lng}
          />}

        {(this.state.error)
          && <PopUp
            placesStatus={this.state.placesActive}
            cadastreStatus={this.state.cadastreActive}
            popUpStatus={this.state.popUpIsOpen}
            onClosePopUp={this.onClosePopUp}
          />}
      </div>
    );
  }
}

export default UdaSearchBox;
