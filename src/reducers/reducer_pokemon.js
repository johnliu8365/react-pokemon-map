import { FETCH_POKEMON_INFO, FETCH_POKEMONS_LOCATION, FETCH_POKEMONS_LIST, FETCH_NOW_TIME } from '../actions/index';

const INITIAL_STATE = { list: [], pokemons: [], info: null, time:Date.now() };

export default function(state = INITIAL_STATE, action ){
    switch(action.type){  
    case FETCH_POKEMON_INFO:
        //console.log(action.payload);
        return { ...state, info:action.payload };
    case FETCH_POKEMONS_LOCATION:
        //console.log(action.payload.data);
        return { ...state, pokemons:action.payload.data.data };
    case FETCH_POKEMONS_LIST:
        //console.log(action.payload.data);
        return { ...state, list:action.payload };
   case FETCH_NOW_TIME:
        //console.log(action.payload.data);
        return { ...state, time:action.payload };     
    
    default:
        return state;
    }
}