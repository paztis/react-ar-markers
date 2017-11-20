import React from 'react';
import classnames from 'classnames';
import MARKER_LIST from './markers/list';
import {AR} from '../src';
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
        return (
            <div>
                {/* Render the components */}
                <AR markers={activeMarkers} />

                {/* Demo overlay */}
                <div className={demoCSS.demo}>
                    {this.renderHeader()}
                </div>
            </div>
        );
    }
}

export default Demo;
