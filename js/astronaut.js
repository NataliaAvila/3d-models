// Variaveis de configuração;
let container;
let camera;
let renderer;
let scene;
let astronaut;

function init() {

  // selecionando div html
  container = document.querySelector('.scene');

  // Create scene;
  scene = new THREE.Scene();

  // angulo de visualização.
  const fov = 35;

  // aspecto onde o container sera exibido na tela
  const aspect = container.clientWidth / container.clientHeight;

  // distancia de visualização
  const near = 0.1;
  const far = 500;

  // criando e configurando a camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // posição da camera x,y,z
  camera.position.set(0, 0, 10);

  // Iluminação do modelo por igual
  const ambient = new THREE.AmbientLight(0x404040, 3);
  scene.add(ambient);

  // direção da luz durante a animação
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(10, 10, 100);
  scene.add(light);

  // renderizando o modelo 3d e removendo serrilha
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  // definindo tamanho do container na tela
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // injetando o container no html
  container.appendChild(renderer.domElement);


  // load model
  let loader = new THREE.GLTFLoader();

  loader.load('./img/Astronaut.glb', function (gltf) {
    scene.add(gltf.scene);
    astronaut = gltf.scene.children[0];
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  astronaut.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

// Trabalhando com o resize da pagina
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
