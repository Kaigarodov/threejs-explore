import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import fragment from './shaders/fragment.glsl.js';
import vertex from './shaders/vertex.glsl.js';


export default class Sketch {
    constructor(options) {
        this.scene = new THREE.Scene();
        this.container = options.dom;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer = new THREE.WebGL1Renderer();
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xeeeeee, 1);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );

        this.camera.position.set(0, 0, 1.3);
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.time = 0
        this.isPlaying = true;
        this.addObject();
        this.resize();
        this.render();
        this.setResize();
    }

    settings() {
        let that = this;
        this.settings = {
            progress: 0,
        }
        this.gui = new GUI();
        this.gui.add(this.settings, 'progress', 0, 1, 0.01)
    }

    setResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        this.imageAspect = 853 / 1280;
        let a1; let a2;
        if (this.height / this.width > this.imageAspect) {
            a1 = (this.width / this.height) * this.imageAspect;
            a2 = 1;
        } else {
            a1 = 1;
            a2 = (this.height / this.width) * this.imageAspect;
        }

        this.material.uniforms.resolution.value.x = this.width;
        this.material.uniforms.resolution.value.y = this.height;
        this.material.uniforms.resolution.value.z = a1;
        this.material.uniforms.resolution.value.w = a2;

        this.camera.updateProjectionMatrix()
    }

    addObject() {
        let that = this;
        this.material = new THREE.ShaderMaterial({
            side:THREE.DoubleSide,
            uniforms: {
                u_time: { value: 0 },
                resolution: { value: new THREE.Vector2() }
            },
            vertexShader: vertex,
            fragmentShader: fragment
        });

        this.material1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} )

        this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
    }

    stop() {
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.render()
        }
    }

    render() {
        if (!this.isPlaying) return;
        this.time += 0.05;
        this.material.uniforms.u_time.value = this.time;
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
/**
 
export const main = () => {

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const cube = createCube()
    scene.add(cube);

    camera.position.z = 25;

    const render = () => {
        requestAnimationFrame(render);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render();
}

const createCube = () => {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
}
console.log('test')

*/