// Basic Three.js setup for Cloud/Fog effect
// Requires Three.js to be loaded via CDN in index.html

let scene, camera, renderer;
let cloudParticles = [];
let flash;
let ambient, directionalLight;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;

  ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  // Fog color matching the theme
  scene.fog = new THREE.FogExp2(0xf0f4f8, 0.002);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0xf0f4f8, 1); // Match background color
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  const container = document.getElementById('canvas-container');
  if (container) {
      container.appendChild(renderer.domElement);
  }

  // Cloud Texture
  const loader = new THREE.TextureLoader();
  // Using a procedural noise or a base64 placeholder if external assets aren't available immediately.
  // For this demo, we'll assume a 'smoke.png' exists or use a simple generated texture.
  // Since we can't easily generate a smoke.png here, we will use a cloud texture URL or generate one.
  // Let's use a reliable CDN for the smoke texture for now to ensure it works out of the box.
  loader.load("https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png", function(texture) {
    const cloudGeo = new THREE.PlaneGeometry(500, 500);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      opacity: 0.55, // Soft opacity
      color: 0xffffff // White clouds
    });

    for (let p = 0; p < 25; p++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 450
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 360;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
    animate();
  });

  window.addEventListener("resize", onWindowResize, false);
}

function animate() {
  cloudParticles.forEach(p => {
    p.rotation.z -= 0.002;
  });
  
  // Gentle camera movement or light movement could go here
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
