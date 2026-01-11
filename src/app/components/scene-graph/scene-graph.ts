import {Component, ElementRef, ViewChild} from '@angular/core';
import * as THREE from 'three';
// Import the GLTFLoader
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// Optional: Import OrbitControls for interaction
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-scene-graph',
  imports: [],
  templateUrl: './scene-graph.html',
  styleUrl: './scene-graph.css',
})
export class SceneGraph {
  @ViewChild(
    'canvasElement') private canvasElement!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private loader!: GLTFLoader;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
    this.loadModel();
  }

  private initScene(): void {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfe3dd); // Example background color

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75,
      window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(2, 2, 5);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer(
      {canvas: this.canvasElement.nativeElement, antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement); // You might want to append it to a specific div in a real app

    // Lighting (ambient light helps illuminate the model)
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    this.scene.add(directionalLight);

    // Controls setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.target.set(0, 1, 0); // Focus the controls on the center of the model's likely position
  }

  private loadModel(): void {
    this.loader = new GLTFLoader();
    // Use the correct path to your asset
    this.loader.load('solidworks_cvt_cover_full_basepalte.glb', // Path is relative to the app's root URL
      (gltf) => {
        // Called when the model is loaded successfully
        this.scene.add(gltf.scene);
        console.log('Model loaded successfully', gltf);
      }, (xhr) => {
        // Called while loading is in progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      }, (error) => {
        // Called if loading fails
        console.error('An error happened', error);
      });
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));

    this.controls.update(); // Update controls for damping
    this.renderer.render(this.scene, this.camera);
  }
}
