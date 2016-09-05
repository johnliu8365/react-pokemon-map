import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMapLoader, GoogleMap, OverlayView } from 'react-google-maps';

class PokemonMarker extends Component {
    
    constructor(props){
        super(props);
    }
    
    render(){
        const { latitude, longitude, icon, liveTime } = this.props;

        return(
            <OverlayView
                mapHolderRef={this.props.mapHolderRef}
                position={{lat:latitude, lng:longitude}}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={this.getPixelPositionOffset}
            >
                <div>
                    <img height="40" width="40" src={icon} />
                    <div className="overlay-view">{this.getPokemonLiveTime(liveTime)}</div>                            
                </div>
            </OverlayView>
         );
    }

    getPixelPositionOffset(width, height) {
        return { x: -(width / 2), y: -(height / 2) + 10 };
    }

    getPokemonLiveTime(secs){
        secs = secs - (this.props.nowTime / 1000);
        var sec_num = parseInt(secs, 10);    
        var hours   = Math.floor(sec_num / 3600) % 24;
        var minutes = Math.floor(sec_num / 60) % 60;
        var seconds = sec_num % 60;
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":");
    }
}

function mapStateToProps(state){
    return { nowTime: state.pokemon.time };
}

export default connect(mapStateToProps)(PokemonMarker);