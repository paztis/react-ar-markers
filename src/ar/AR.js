import 'aframe';
import arLoadingPromise from 'ar.js/aframe/build/aframe-ar';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ARMarker from './ARMarker';
import arCSS from './scss/ar.module.scss';
import CONFIG from './config';


class AR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aframeArLoaded: false,
        };

        arLoadingPromise.then(() => {
            setTimeout(() => {
                window.ARjs.Context.baseURL = CONFIG.baseURL;

                this.setState({
                    aframeArLoaded: true
                });
            });
        });
    }

    render() {
        const {markers = []} = this.props;
        const {aframeArLoaded} = this.state;
        return (
            <div className={arCSS.ar}>
                {aframeArLoaded && markers.length > 0 &&
                <Scene embedded arjs={`sourceType: ${CONFIG.sourceType}; sourceUrl: ${CONFIG.sourceUrl};`}>
                    <a-assets>
                        {markers.map(marker => <a-asset-item key={marker.id} id={marker.id} src={marker.data['3d-model']} />)}
                    </a-assets>

                    {markers.map(marker => <ARMarker key={marker.id} marker={marker} />)}

                    {/* Define a static camera */}
                    <Entity primitive="a-camera-static" />
                </Scene>
                }
            </div>
        );
    }
}

export default AR;
export {AR};
