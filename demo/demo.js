import React from 'react';
import classnames from 'classnames';
import MARKER_LIST from './markers/list';
import {AR} from '../src';
import {MapNav} from '../src';
import demoCSS from './scss/demo.module.scss';


class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarkers: []
        };

        this.renderHeader = this.renderHeader.bind(this);
        this.renderMarkerButton = this.renderMarkerButton.bind(this);
        this.toggleMarkerAction = this.toggleMarkerAction.bind(this);
    }

    toggleMarkerAction(marker) {
        const newActiveMarkers = this.state.activeMarkers.slice();

        const index = newActiveMarkers.indexOf(marker);
        if (index >= 0) {
            newActiveMarkers.splice(index, 1);
        } else {
            newActiveMarkers.push(marker);
        }
        this.setState({
            activeMarkers: newActiveMarkers
        });
    }

    renderHeader() {
        const RenderButton = this.renderMarkerButton;
        return (
            <div className={demoCSS.header}>
                <div className={demoCSS.markerList}>
                    {MARKER_LIST && MARKER_LIST.map(marker => <RenderButton key={marker.id} marker={marker} />)}
                </div>
            </div>
        );
    }

    renderMarkerButton({marker}) {
        const {activeMarkers} = this.state;
        const isActive = activeMarkers.indexOf(marker) !== -1;

        const {data} = marker;
        const {title} = data;
        const classname = classnames(demoCSS.btn, {[`${demoCSS.orange}`]: isActive});
        return (
            <button className={classname} onClick={() => { this.toggleMarkerAction(marker); }}><span>{title}</span></button>
        );
    }

    render() {
        const {activeMarkers} = this.state;
        const markers = [
            {
                id: 0,
                lat: 48.112193  ,
                lng: -1.6901916,
                data: {
                    title: 'toto',
                },
            },
            {
                id: 1,
                lat: 48.13034209,
                lng: -1.7888197,
                data: {
                    title: 'tintin',
                },
            },
            {
                id: 2,
                lat: 48.11934215,
                lng: -1.4555180,
                data: {
                    title: 'tata',
                },
            },
            {
                id: 3,
                lat: 48.15555250,
                lng: -1.8105111,
                data: {
                    title: 'tutu',
                },
            },
            {
                id: 4,
                lat: 48.118522399999996,
                lng: -1.652105,
                data: {
                    title: 'tete',
                },
            },
            {
                id: 5,
                lat: 48.118522399999996,
                lng: -1.652105,
                data: {
                    title: 'titi',
                },
            },
        ];

        function initMapNav() {
            return {
                markers,
                API_KEY: 'AIzaSyDPXKyJ4hjAnKboGc2v8ZzACYtr-qR7pYE',
                matchingZoneRadius: 10,
                handleResults: (results) => {console.warn('>>>> RESULTS =', results);},
            };
        }
        const fullScreenStyle = { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 };

        return (
            <div style={fullScreenStyle}>
                {/* Render the components */}
                <AR markers={activeMarkers} />
                <MapNav { ...initMapNav() } />

                {/* Demo overlay */}
                <div className={demoCSS.demo}>
                    {this.renderHeader()}
                </div>
            </div>
        );
    }
}

export default Demo;
