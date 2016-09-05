import React, { Component } from 'react';
import { connect } from 'react-redux';

class PokemonInfo extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { pokemonInfo } = this.props;
        if (!pokemonInfo || pokemonInfo.name === 'ALL') {
            return <div>Please Select Pokemon...</div>;
        }
        const icon = `/images/pokemon/${this.props.filter.selectId}.png`
        //console.log(icon);

        return(
            <div>
                <div><h3>Pokemon Info: <img height="50" width="50" src={icon} /></h3></div>
                <div>Type: {pokemonInfo.type}</div>
                <div>Attack: {pokemonInfo.attack}</div>
                <div>Defense: {pokemonInfo.defense}</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { pokemonInfo: state.pokemon.info, filter: state.filter };
}

export default connect(mapStateToProps)(PokemonInfo);