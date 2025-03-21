import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class PointCloudViewer {
    constructor(container) {
        this.container = container;
        this.points = null;
        this.geometry = null;
        this.initThreeJs();
        this.initWebSocket();
        this.animate();
    }

    initThreeJs() {
        // シーン、カメラ、レンダラーの初期化
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // カメラの初期位置設定
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);

        // OrbitControlsの設定
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // 座標軸の追加（デバッグ用）
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        // ウィンドウリサイズへの対応
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    initWebSocket() {
        this.ws = new WebSocket('ws://localhost:8765');
        
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
            console.log('WebSocket接続が確立されました');
        };

        this.ws.onmessage = (event) => {
            this.updatePointCloud(event.data);
        };

        this.ws.onerror = (error) => {
            console.error('WebSocketエラー:', error);
        };

        this.ws.onclose = () => {
            console.log('WebSocket接続が閉じられました');
        };
    }

    updatePointCloud(binaryData) {
        // バイナリデータをFloat32Arrayに変換
        const pointsArray = new Float32Array(binaryData);
        const numPoints = pointsArray.length / 3;

        // ポイント数を更新
        document.getElementById('points-count').textContent = `Points: ${numPoints}`;

        if (!this.geometry) {
            // 初回のみジオメトリとマテリアルを作成
            this.geometry = new THREE.BufferGeometry();
            const material = new THREE.PointsMaterial({
                size: 0.05,
                color: 0x00ffff,
                sizeAttenuation: true
            });

            // position属性を設定
            this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3));
            
            // ポイントクラウドオブジェクトを作成
            this.points = new THREE.Points(this.geometry, material);
            this.scene.add(this.points);
        } else {
            // 既存のジオメトリの位置を更新
            this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3));
            this.geometry.attributes.position.needsUpdate = true;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        
        // FPSの更新
        const fps = Math.round(this.renderer.info.render.fps);
        document.getElementById('fps').textContent = `FPS: ${fps}`;
    }
}
