import React, { Component } from 'react';
import {getUserMediaThreeScene, ARScene, ARController} from './utils/artoolkit-three';
import {
    WebGLRenderer, 
    Mesh, 
    SphereGeometry, 
    MeshNormalMaterial, 
    FlatShading, 
    TorusGeometry, 
    BoxGeometry, 
    IcosahedronGeometry,
    Raycaster
} from 'three';
import HiroMarker from './markers/Hiro.marker';
import KanjiMarker from './markers/Kanji.marker';
import cameraData from '../../data/camera_para-iPhone 5 rear 640x480 1.0m.dat';
import { ARCameraParam } from './utils/artoolkit.api';

export interface ArMarkerProps {
}

export interface ArMarkerState {
}

class VR extends Component<ArMarkerProps, ArMarkerState> {
    constructor(props: ArMarkerProps) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        getUserMediaThreeScene({
            maxARVideoSize: 640,
            cameraParam: cameraData,
            onSuccess: this.onSceneInit.bind(this)
        });
    }

    onSceneInit(arScene: ARScene, arController: ARController, arCamera: ARCameraParam) {
        document.body.className = arController.orientation;
        arController.setPatternDetectionMode(artoolkit.AR_TEMPLATE_MATCHING_MONO_AND_MATRIX);
        var renderer = new WebGLRenderer({ antialias: true });
        if (arController.orientation === 'portrait') {
            var w = (window.innerWidth / arController.videoHeight) * arController.videoWidth;
            var h = window.innerWidth;
            renderer.setSize(w, h);
            renderer.domElement.style.paddingBottom = (w - h) + 'px';
        } else {
            if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
                renderer.setSize(window.innerWidth, (window.innerWidth / arController.videoWidth) * arController.videoHeight);
            } else {
                renderer.setSize(arController.videoWidth, arController.videoHeight);
                document.body.className += ' desktop';
            }
        }
        document.body.insertBefore(renderer.domElement, document.body.firstChild);
        
        let markerList = [HiroMarker, KanjiMarker];
        let markerThreeList = markerList.map((marker) => { return this.initMarker(marker, arController); });
        markerThreeList.forEach((markerThree) => {
            arScene.scene.add(markerThree);
        });

        this.listenEvents(renderer, arScene);

        this.startTick(arScene, renderer, markerList);
    }

    initMarker(markerObject, arController) {
        const markerId = arController.loadLocalMarker(markerObject.data);
        const markerRoot = arController.createThreeMarker(markerId, 3);
        const markerShape = markerObject.createShape();
        markerRoot.add(markerShape);

        return markerRoot;
    }

    listenEvents(renderer, arScene) {
        const {scene, videoCamera} = arScene;
        const raycaster = new Raycaster();

        renderer.domElement.addEventListener('click', function (ev) {
            ev.preventDefault();
            const mouse = {
				x: ( event.clientX / window.innerWidth ) * 2 - 1,
				y: - ( event.clientY / window.innerHeight ) * 2 + 1
            }

            raycaster.setFromCamera( mouse, videoCamera );
            var intersects = raycaster.intersectObjects( scene.children );
            console.log('------------', intersects, videoCamera);

        }, false);
    }

    startTick(arScene, renderer, markerList) {
        var tick = function () {
            arScene.process();
            
            markerList.forEach((marker) => {
                marker.tick();
            });
            arScene.renderOn(renderer);
            requestAnimationFrame(tick);
        };
        tick();
    }

    render() {
        return <div></div>;
    }
}

export default VR;
