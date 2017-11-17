// import 'script-loader!jsartoolkit/build/artoolkit.min';
import 'script-loader!jsartoolkit/build/artoolkit.debug';
import 'jsartoolkit/js/artoolkit.api';

import {
    Object3D,
    Scene,
    Camera,
    WebGLRenderer
} from 'three';

// export declare class artoolkit {
//     public static readonly UNKNOWN_MARKER: number;
//     public static readonly PATTERN_MARKER: number;
//     public static readonly BARCODE_MARKER: number;

//     public static readonly AR_TEMPLATE_MATCHING_COLOR: number;
//     public static readonly AR_TEMPLATE_MATCHING_MONO: number;
//     public static readonly AR_MATRIX_CODE_DETECTION: number;
//     public static readonly AR_TEMPLATE_MATCHING_COLOR_AND_MATRIX: number;
//     public static readonly AR_TEMPLATE_MATCHING_MONO_AND_MATRIX: number;
// }
export interface artoolkitClass {
    UNKNOWN_MARKER: number;
    PATTERN_MARKER: number;
    BARCODE_MARKER: number;

    AR_TEMPLATE_MATCHING_COLOR: number;
    AR_TEMPLATE_MATCHING_MONO: number;
    AR_MATRIX_CODE_DETECTION: number;
    AR_TEMPLATE_MATCHING_COLOR_AND_MATRIX: number;
    AR_TEMPLATE_MATCHING_MONO_AND_MATRIX: number;
}
const artoolkit:artoolkitClass = (window as any).artoolkit;
export {artoolkit};

export interface AEEvent {
    name: string;
    target: any;
    data: any;
}

export interface ARScene {
    scene: Scene;
    videoScene: Scene;
    camera: Camera;
    videoCamera: Camera;
    arController: ARController;
    video: any;
    process(): void;
    renderOn(renderer: WebGLRenderer): void;
}

export interface ARController {
    width: number;
    height: number;
    camera: ARCameraParam;
    videoHeight: number;
    videoWidth: number;
    orientation: string;

    constructor(width: number, height: number, cameraData: string | ARCameraParam): void;

    onload(): void;
    debugSetup(): void;
    process(image: any): void;
    getCameraMatrix(): ArrayLike<number>;
    detectMarker(videoNative: HTMLImageElement | HTMLVideoElement): void;
    debugDraw(): void;
    getMarkerNum(): number;
    getMarker(index: number): ARMarkerInfo;
    getTransMatSquare(markerIndex: number, markerWidth: number, dst: Float64Array): void;
    getTransMatSquareCont(markerIndex: number, markerWidth: number, previousMarkerTransform: Float64Array, dst: Float64Array): void;
    transMatToGLMat(transMat: Float64Array, glMat: Float32Array | Float64Array, scale?: number): void;
    /**
        Set the pattern detection mode
 
        The pattern detection determines the method by which ARToolKit
        matches detected squares in the video image to marker templates
        and/or IDs. ARToolKit v4.x can match against pictorial "template" markers,
        whose pattern files are created with the mk_patt utility, in either colour
        or mono, and additionally can match against 2D-barcode-type "matrix"
        markers, which have an embedded marker ID. Two different two-pass modes
        are also available, in which a matrix-detection pass is made first,
        followed by a template-matching pass.
 
        @param {number} mode
            Options for this field are:
            AR_TEMPLATE_MATCHING_COLOR
            AR_TEMPLATE_MATCHING_MONO
            AR_MATRIX_CODE_DETECTION
            AR_TEMPLATE_MATCHING_COLOR_AND_MATRIX
            AR_TEMPLATE_MATCHING_MONO_AND_MATRIX
            The default mode is AR_TEMPLATE_MATCHING_COLOR.
    */
    setPatternDetectionMode(mode: number): void;

    // Methods Augmented in artoolkit-three
    loadLocalMarker(stringData: string): string;
    createThreeScene(video?: HTMLImageElement | HTMLVideoElement): ARScene;
    createThreeMarker(markerUID: string, markerWidth: number): Object3D;
    createThreeMultiMarker(markerUID: string): Object3D;
    createThreeBarcodeMarker(markerUID: string, markerWidth: number): Object3D;
    setupThree(): void;
}

export interface ARControllerClass {
    prototype: ARController;
    new(): ARController;
    getUserMediaARController(configuration: UserMediaARConfiguration): HTMLVideoElement;
};

const ARControllerThree:ARControllerClass = (window as any).ARController;
export {ARControllerThree};


export interface UserMediaARConfiguration {
    onSuccess?(controller: ARController, cameraParam: ARCameraParam): void;
    onError?(error: any): void;

    cameraParam: string;
    maxARVideoSize?: number;

    width?: number | { min: number, ideal: number, max: number };
    height?: number | { min: number, ideal: number, max: number };

    facingMode?: string | { exact: string };
}

export declare class ARCameraParam {
    onload(): void;
    load(cameraData: string): void;
}

export declare class ARMarkerInfo {
    /**
     * 2D position (in camera image coordinates, origin at top-left) of the centre of the marker.
     */
    pos: number[];
    /**
     * Line equations for the 4 sides of the marker.
     */
    line: number[];
    /** 
     * 2D positions (in camera image coordinates, origin at top-left) of the corners of the marker. 
     * vertex[(4 - dir)%4][] is the top-left corner of the marker. Other vertices proceed clockwise from this. 
     * These are idealised coordinates (i.e. the onscreen position aligns correctly with the undistorted camera image.)
     */
    vertex: number[];
    /**
     * Area in pixels of the largest connected region, comprising the marker border and regions connected to it. Note that this is not the same as the actual onscreen area inside the marker border.
     */
    area: number;
    /** 
     * If pattern detection mode is either pattern mode OR matrix but not both, will be marker ID (>= 0) if marker is valid, or -1 if invalid.
     */
    id: number;
    /**
     * If pattern detection mode includes a pattern mode, will be marker ID (>= 0) if marker is valid, or -1 if invalid.
     */
    idPatt: number;
    /**
     * If pattern detection mode includes a matrix mode, will be marker ID (>= 0) if marker is valid, or -1 if invalid.
     */
    idMatrix: number;
    /**
     * If pattern detection mode is either pattern mode OR matrix but not both, and id != -1, will be marker direction (range 0 to 3, inclusive).
     */
    dir: number;
    /**
     * If pattern detection mode includes a pattern mode, and id != -1, will be marker direction (range 0 to 3, inclusive).
     */
    dirPatt: number;
    /**
     * If pattern detection mode includes a matrix mode, and id != -1, will be marker direction (range 0 to 3, inclusive).
     */
    dirMatrix: number;
    /**
     * If pattern detection mode is either pattern mode OR matrix but not both, will be marker matching confidence (range 0.0 to 1.0 inclusive) if marker is valid, or -1.0 if marker is invalid.
     */
    cf: number;
    /**
     * If pattern detection mode includes a pattern mode, will be marker matching confidence (range 0.0 to 1.0 inclusive) if marker is valid, or -1.0 if marker is invalid.
     */
    cfPatt: number;
    /**
     * If pattern detection mode includes a matrix mode, will be marker matching confidence (range 0.0 to 1.0 inclusive) if marker is valid, or -1.0 if marker is invalid.
     */
    cfMatrix: number;
    errorCorrected: number;
}
