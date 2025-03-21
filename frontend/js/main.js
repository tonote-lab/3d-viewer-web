import { PointCloudViewer } from './pointCloudViewer.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('canvas-container');
    const viewer = new PointCloudViewer(container);
});
