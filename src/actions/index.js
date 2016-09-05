import axios from 'axios';
import { pokemons } from '../data/pokemons';

export const FETCH_POKEMON_INFO = 'FETCH_POKEMON_INFO';
export const FETCH_POKEMONS_LOCATION = 'FETCH_POKEMONS_LOCATION';
export const FETCH_POKEMONS_LIST = 'FETCH_POKEMONS_LIST';
export const FETCH_NOW_TIME = 'FETCH_NOW_TIME';

export const SET_SELECT_ID = 'SET_SELECT_ID';
export const SET_MAP_LEVEL = 'SET_MAP_LEVEL';
export const SET_SEARCH_LOCATION = 'SET_SEARCH_LOCATION';

const GET_LOCATION = 'https://www.pokeradar.io/api/v1/submissions';
const GET_POKEMONS_LIST = 'https://raw.githubusercontent.com/flyswatter/poke-scanner/master/pokedex.json';


export function fetchPokemonInfo(id){ 
    return {
        type: FETCH_POKEMON_INFO,
        payload: pokemons[id]
    };
}

export function fetchPokemonsLocation(latitude, longitude, level, id){

    const url = `${ GET_LOCATION }?latitude=${latitude}&longitude=${longitude}&zoomLevel=${level-2}&pokemonId=${id}`;
    //console.log(url);
    const request = axios.get(url);

    return {
        type: FETCH_POKEMONS_LOCATION,
        payload: request
    };
}

export function fetchPokemonsList(){
    return {
        type: FETCH_POKEMONS_LIST,
        payload: pokemons
    };
}

export function fetchNOWTime(){
    return {
        type: FETCH_NOW_TIME,
        payload: Date.now()
    };
}

export function setSelectId(id){
    return {
        type: SET_SELECT_ID,
        payload: id
    };
}

export function setMapZoomLevel(level){
    return {
        type: SET_MAP_LEVEL,
        payload: level
    };
}

export function setSearchLocation(latitude, longitude){
    return {
        type: SET_SEARCH_LOCATION,
        payload: { latitude:latitude, longitude:longitude }
    };
}
