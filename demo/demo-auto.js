import React from 'react';
import classnames from 'classnames';
import MARKER_LIST from './markers/list';
import {AR, MapNav} from '../src';
import demoCSS from './scss/demo.module.scss';


class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeMarkers: []
        };

        this.getMapNavProps = this.getMapNavProps.bind(this);
        this.setCloseMarkers = this.setCloseMarkers.bind(this);
    }

    setCloseMarkers(markers) {
        console.warn('>>>> RESULTS =', markers);
        this.state = {
            closeMarkers: markers.slice()
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
        const {closeMarkers} = this.state;

        const classnameAR = classnames({
            // Hide AR when no close markers
            [demoCSS.hidden]: (closeMarkers.length === 0)
        });

        const classnameMapNav = classnames({
            // Hide MapNav when close markers
            [demoCSS.hidden]: (closeMarkers.length > 0)
        });


        return (
            <div className={demoCSS.demoContainer}>
                {/* Render the components */}
                <AR className={classnameAR} markers={closeMarkers} />
                <MapNav className={classnameMapNav} {...this.getMapNavProps()} />
            </div>
        );
    }
}

export default Demo;
