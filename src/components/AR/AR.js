import 'aframe';
import arLoadingPromise from 'ar.js/aframe/build/aframe-ar';
import {Entity} from 'aframe-react';
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

        this.getARjsProps = this.getARjsProps.bind(this);

        arLoadingPromise.then(() => {
            setTimeout(() => {
                window.ARjs.Context.baseURL = CONFIG.baseURL;

                this.setState({
                    aframeArLoaded: true
                });
            });
        });
    }

    componentWillUpdate(nextProps) {
        // Dispose AR on empty list
        const {markers = []} = nextProps;
        if (markers.length === 0) {
            this.disposeAR();
        }
    }

    componentWillUnmount() {
        this.disposeAR();
    }

    getARjsProps() {
        let props = '';
        const {arjsSystem} = CONFIG;
        Object.keys(arjsSystem).forEach((key) => {
            props += `${key}: ${arjsSystem[key]}; `;
        });
        return props;
    }

    disposeAR() {
        if (this.sceneE && this.sceneE.systems && this.sceneE.systems.arjs &&
            this.sceneE.systems.arjs._arSession) {
            const session = this.sceneE.systems.arjs._arSession;
            try {
                session.arContext.arController.dispose();
            } catch (e) {
                console.warn('fail to dispose arController', e);
            }

            try {
                const sourceE = session.arSource.domElement;
                switch (sourceE.nodeName) {
                    case 'VIDEO':
                        sourceE.srcObject.getTracks()[0].stop();
                        // sourceE.remove();
                        break;
                    case 'IMG':
                        sourceE.removeAttribute('src');
                        // sourceE.remove();
                        break;
                    default:
                        sourceE.remove();
                }
            } catch (e) {
                console.warn('fail to dispose video stream', e);
            }
        }
    }

    render() {
        const {markers = []} = this.props;
        const {aframeArLoaded} = this.state;
        return (
            <div className={arCSS.ar}>
                {aframeArLoaded && markers.length > 0 &&
                <a-scene ref={(sceneE) => { this.sceneE = sceneE; }} embedded arjs={this.getARjsProps()}>
                    <a-assets>
                        {markers.map(marker => <a-asset-item key={marker.id} id={marker.id} src={marker.data['3d-model']} />)}
                    </a-assets>

                    {markers.map(marker => <ARMarker key={marker.id} marker={marker} />)}

                    {/* Define a static camera */}
                    <Entity primitive="a-camera-static" />
                </a-scene>
                }
            </div>
        );
    }
}

export default AR;
export {AR};
