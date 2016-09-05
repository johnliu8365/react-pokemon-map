import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleMapLoader, GoogleMap, OverlayView } from 'react-google-maps';

import { fetchPokemonsLocation, setMapZoomLevel, setSearchLocation, fetchNOWTime } from '../actions/index';


import PokemonMarker from './pokemon_marker';

const geolocation = (
    navigator.geolocation || {
        getCurrentPosition: (success, failure) => {
            failure(`Your browser doesn't support geolocation.`);
        }
    }
);

class PokemonMap extends Component {
    constructor(props){
        super(props);

        this.refreshMap = this.refreshMap.bind(this);
        this.refreshLiveTime = this.refreshLiveTime.bind(this);
        

        this.handleZoomChanged = this.handleZoomChanged.bind(this);
        this.handleDragend = this.handleDragend.bind(this);
    }

    componentDidMount(){
        setInterval(this.refreshMap, 10000); 
        setInterval(this.refreshLiveTime, 1000); 
       
        geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            this.props.setSearchLocation(lat, lng);
            this.refreshMap();
        });
    }

    refreshLiveTime(){
        this.props.fetchNOWTime();
    }

    refreshMap(){
        const { latitude, longitude, level, selectId  } = this.props.filter;
        //console.log("refreshMap" + latitude + "," + longitude);

        this.props.fetchPokemonsLocation(latitude, longitude, level, selectId);
    }

    handleZoomChanged(){ 
        const zoomLevel = this.refs.map.getZoom();
        this.props.setMapZoomLevel(zoomLevel);
        
        this.refreshMap();
    }

    handleDragend(){
        const lat = this.refs.map.getCenter().lat();
        const lng = this.refs.map.getCenter().lng();
        this.props.setSearchLocation(lat, lng);

        this.refreshMap();
    }

    renderPokemonMarker(){
        //console.log("renderPokemonMarker");
       
        return this.props.pokemons.map((pokemon, index) => {
            
            if ("(Poke Radar Prediction)" !== pokemon.trainerName){
                return "";
            }

            const ref = `marker_${index}`;
            const icon = `/images/pokemon/${pokemon.pokemonId}.png`
            const liveTime = pokemon.created+900;
           
            return (
                <PokemonMarker
                    key={index} 
                    ref={ref}
                    icon={icon} 
                    latitude={pokemon.latitude} 
                    longitude={pokemon.longitude}
                    liveTime={liveTime}
                />            
            );
        });
    }

    render(){
        const { latitude, longitude, level, selectId  } = this.props.filter;
        //console.log("refreshMap" + latitude + "," + longitude);
        
        return(
            <div className="map">
            Pokemon Map {latitude},{longitude},{level}
            <GoogleMapLoader
                containerElement={ <div style={{height: '100%', width: '100%'}} /> }
                googleMapElement={
                    <GoogleMap
                        ref="map" 
                        defaultZoom={level}
                        defaultCenter={{ lat: latitude, lng: longitude }}
                        center={{ lat: latitude, lng: longitude }}
                        onZoomChanged={this.handleZoomChanged}
                        onDragend={this.handleDragend}>
                        {this.renderPokemonMarker()}
                    </GoogleMap>
                }
            />           
            </div>          
        );

    }
}

function mapStateToProps(state){
    return { pokemons: state.pokemon.pokemons, filter: state.filter };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators( { fetchPokemonsLocation, setMapZoomLevel, setSearchLocation, fetchNOWTime }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonMap);