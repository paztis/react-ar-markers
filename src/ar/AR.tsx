import React, { Component } from 'react';
import {
    ARScene,
    ARController,
    ARCameraParam
} from './utils/artoolkit.api';
import { initUserMediaThreeScene } from './utils/artoolkit.three';
import {
    WebGLRenderer
} from 'three';
import {createFullScreenRenderer, tickStart} from './utils/threeUtils';

const cameraData: string = require('../../data/camera_para-iPhone 5 rear 640x480 1.0m.dat');

export interface ArProps {
}

export interface ArState {
}

class AR extends Component<ArProps, ArState> {
    canvasContainerE: HTMLElement;

    constructor(props: ArProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initAR();
    }

    componentWillUnmount() {

    }

    // -------- Augmented Reality -------
    initAR() {
        return initUserMediaThreeScene({
            maxARVideoSize: 640,
            cameraParam: cameraData
        }).then(({ arScene, arController, arCameraParam }) => {
            const renderer = createFullScreenRenderer(arController, this.canvasContainerE);
            this.canvasContainerE.appendChild(renderer.domElement);

            tickStart(() => {
                this.renderScene(arScene, renderer);
            });

        }).catch((e) => {
            console.error('Initialization failed', e);
        });
    }

    renderScene(arScene: ARScene, renderer: WebGLRenderer) {
        arScene.process();
        arScene.renderOn(renderer);
    }

    render() {
        return <div style={{width: '100%', height: '100%'}}>
            <div style={{width: '100%', height: '100%', overflow: 'hidden'}} ref={(el: HTMLElement) => { this.canvasContainerE = el }} />
        </div>;
    }
}

export default AR;
export { AR };
