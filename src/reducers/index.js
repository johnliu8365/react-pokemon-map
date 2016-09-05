import { combineReducers } from 'redux';
import PokemonReducer from './reducer_pokemon';
import FilterReducer from './reducer_filter_data';


const rootReducer = combineReducers({
  pokemon : PokemonReducer,
  filter : FilterReducer
});

export default rootReducer;
