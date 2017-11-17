import {
    WebGLRenderer
} from 'three';

const createFullScreenRenderer = (config:{orientation: string, videoWidth: number, videoHeight: number}, containerE: HTMLElement) => {
    const {orientation, videoWidth, videoHeight} = config;

    const minWidth = containerE.clientWidth;
    const minHeight = containerE.clientHeight;
    let w = videoWidth;
    let h = videoHeight;
    let x = 0;
    let y = 0;

    if(w > minWidth && h > minHeight) {
        const ratio = minWidth / w;
        w = minWidth;
        h *= ratio;
    }
    if(w < minWidth) {
        const ratio = minWidth / w;
        w = minWidth;
        h *= ratio;
    }
    if(h < minHeight) {
        const ratio = minHeight / h;
        h = minHeight;
        w *= ratio;
    }

    if(w > minWidth) {
        x = (minWidth - w) / 2;
    }
    if(h > minHeight) {
        y = (minHeight - h) / 2;
    }
    
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.domElement.style.margin = `${y} 0 0 ${x}px`;

    // if (orientation === 'portrait') {
    //     var w = (window.innerWidth / videoHeight) * videoWidth;
    //     var h = window.innerWidth;
    //     renderer.setSize(w, h);
    //     renderer.domElement.style.paddingBottom = (w - h) + 'px';
    // } else {
    //     if (/Android|mobile|iPad|iPhone/i.test(navigator.userAgent)) {
    //         renderer.setSize(window.innerWidth, (window.innerWidth / videoWidth) * videoHeight);
    //     } else {
    //         renderer.setSize(videoWidth, videoHeight);
    //         document.body.className += ' desktop';
    //     }
    // }

    return renderer;
}

const tickStart = (actionF: any) => {
    const tick = () => {
        actionF();
        requestAnimationFrame(tick);
    }
    tick();
}

export {
    createFullScreenRenderer,
    tickStart
};
