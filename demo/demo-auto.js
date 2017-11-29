import React from 'react';
import MARKER_LIST from './markers/list';
import {AR, MapNav} from '../src';
import demoCSS from './scss/demo.module.scss';


class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarkers: []
        };

        this.getMapNavProps = this.getMapNavProps.bind(this);
        this.setCloseMarkers = this.setCloseMarkers.bind(this);
    }

    setCloseMarkers(markers) {
        console.warn('>>>> RESULTS =', markers);
        this.state = {
            activeMarkers: markers.slice()
        };
    }

    getMapNavProps() {
        return {
            markers: MARKER_LIST,
            API_KEY: 'AIzaSyDPXKyJ4hjAnKboGc2v8ZzACYtr-qR7pYE',
            matchingZoneRadius: 10,
            handleResults: this.setCloseMarkers
        };
    }

    render() {
        const {activeMarkers} = this.state;



        return (
            <div className={demoCSS.demoContainer}>
                {/* Render the components */}
                <AR markers={activeMarkers} />
                <MapNav {...this.getMapNavProps()} />
            </div>
        );
    }
}

export default Demo;
