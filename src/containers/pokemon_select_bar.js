import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPokemonsList, fetchPokemonsLocation, fetchPokemonInfo, setSelectId } from '../actions/index';

class PokemonSelectBar extends Component {
    constructor(props){
        super(props);

        this.state = { id: 0 };
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentWillMount(){
        const { latitude, longitude, level, selectId  } = this.props.filter;

        this.props.fetchPokemonsList();
        this.props.fetchPokemonsLocation(latitude, longitude, level, selectId);
    }

    renderPokemonsList(){
        return Object.keys(this.props.pokemonsList).map((key) => {
            const pokemon = this.props.pokemonsList[key];
            return (
                <option value={key} key={key}>{pokemon.name}</option>
            );
        });
    }

    onSelectChange(event){
        var pokemonId = event.target.value;
        const { latitude, longitude, level } = this.props.filter;

        //console.log(pokemonId);
        this.setState({ id: pokemonId });

        this.props.fetchPokemonsLocation(latitude, longitude, level, pokemonId);
        this.props.fetchPokemonInfo(pokemonId);
        this.props.setSelectId(pokemonId);
    }

    render(){
        return(
            <select value={this.state.id} onChange={this.onSelectChange}>
                {this.renderPokemonsList()}
            </select>
        );
    }
}

function mapStateToProps(state){
    return { pokemonsList: state.pokemon.list, filter: state.filter };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchPokemonsList, fetchPokemonsLocation, fetchPokemonInfo, setSelectId }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonSelectBar);

//export default connect(mapStateToProps, { fetchPokemonsList, fetchPokemonsLocation, fetchPokemonInfo })(PokemonSelectBar);

