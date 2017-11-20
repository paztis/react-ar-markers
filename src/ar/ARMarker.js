import {Entity} from 'aframe-react';
import React from 'react';

class ARMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {marker = {}} = this.props;
        const {id, data = {}} = marker;
        const {title, pattern} = data;
        return (
            <Entity primitive="a-anchor" hit-testing-enabled="true" {...pattern}>
                <Entity primitive="a-entity" gltf-model={`#${id}`} position="0 0 0" />
                <Entity primitive="a-text" value={title} color="#000000" position="0 0 1" scale="1 1 1" />
            </Entity>
        );
    }
}

export default ARMarker;
