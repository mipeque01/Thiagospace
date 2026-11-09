
import * as THREE from
    'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// ==========================================
// THIAGO SPACE - MISION 001: RUMBO A LA LUNA
// ==========================================

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02030c);
scene.fog = new THREE.FogExp2(0x02030c, 0.006);

// CÁMARA
const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 3, 12);

// RENDERIZADOR
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

document.getElementById("game-container")
    .appendChild(renderer.domElement);

// LUCES CINEMATOGRÁFICAS
scene.add(new THREE.AmbientLight(0x8abaff, 0.7));

const sunLight = new THREE.DirectionalLight(0xffffff, 3.5);
sunLight.position.set(-8, 5, 8);
scene.add(sunLight);

const blueLight = new THREE.PointLight(0x1688ff, 20, 35);
blueLight.position.set(4, 2, -5);
scene.add(blueLight);

// ESTRELLAS
const starGeometry = new THREE.BufferGeometry();
const starPositions = [];

for (let i = 0; i < 4000; i++) {
    starPositions.push(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
    );
}

starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starPositions, 3)
);

const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.18,
        sizeAttenuation: true
    })
);

scene.add(stars);

// NEBULOSA LUMINOSA
const nebulaGeometry = new THREE.SphereGeometry(80, 32, 32);

const nebulaMaterial = new THREE.MeshBasicMaterial({
    color: 0x160d48,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.25
});

const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
scene.add(nebula);

// CARGADOR DE TEXTURAS
const textureLoader = new THREE.TextureLoader();

// TIERRA
const earthGeometry = new THREE.SphereGeometry(2.5, 96, 96);

const earthMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.85,
    metalness: 0
});

const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(2, 0, -3);
scene.add(earth);

// Textura real de la Tierra
textureLoader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
    }
);

// NUBE DE LA TIERRA
const cloudGeometry = new THREE.SphereGeometry(2.54, 64, 64);

const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    roughness: 1
});

const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
clouds.position.copy(earth.position);
scene.add(clouds);

// ATMÓSFERA AZUL
const atmosphereGeometry = new THREE.SphereGeometry(2.65, 64, 64);

const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x1688ff,
    transparent: true,
    opacity: 0.13,
    side: THREE.BackSide
});

const atmosphere = new THREE.Mesh(
    atmosphereGeometry,
    atmosphereMaterial
);

atmosphere.position.copy(earth.position);
scene.add(atmosphere);

// LUNA
const moonGeometry = new THREE.SphereGeometry(0.9, 64, 64);

const moonMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1
});

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(-4, 1.5, -1);
scene.add(moon);

textureLoader.load(
    "https://threejs.org/examples/textures/planets/moon_1024.jpg",
    texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        moonMaterial.map = texture;
        moonMaterial.needsUpdate = true;
    }
);

// ÓRBITA LUMINOSA
const orbitGeometry = new THREE.TorusGeometry(
    4.5, 0.018, 8, 160
);

const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0x22cfff,
    transparent: true,
    opacity: 0.6
});

const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
orbit.position.copy(earth.position);
orbit.rotation.x = Math.PI / 2;
scene.add(orbit);

// NAVE ESPACIAL TSE-01
const ship = new THREE.Group();

const shipBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.45, 1.8, 16),
    new THREE.MeshStandardMaterial({
        color: 0xeaf4ff,
        metalness: 0.65,
        roughness: 0.25
    })
);

shipBody.rotation.z = Math.PI / 2;
ship.add(shipBody);

// Punta de la nave
const shipNose = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.7, 16),
    new THREE.MeshStandardMaterial({
        color: 0x28cfff,
        metalness: 0.5,
        roughness: 0.2
    })
);

shipNose.rotation.z = -Math.PI / 2;
shipNose.position.x = 1.15;
ship.add(shipNose);

// Ventana de la nave
const windowShip = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 24, 24),
    new THREE.MeshStandardMaterial({
        color: 0x16bfff,
        emissive: 0x087bff,
        emissiveIntensity: 1.5,
        metalness: 0.5,
        roughness: 0.15
    })
);

windowShip.position.set(0.2, 0.28, 0);
ship.add(windowShip);

// Alas
const wingMaterial = new THREE.MeshStandardMaterial({
    color: 0x147cff,
    metalness: 0.5,
    roughness: 0.3
});

const wing1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.08, 1.1),
    wingMaterial
);

wing1.position.set(-0.3, 0, 0.6);
ship.add(wing1);

const wing2 = wing1.clone();
wing2.position.z = -0.6;
ship.add(wing2);

// Propulsor
const engine = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 24, 24),
    new THREE.MeshBasicMaterial({
        color: 0x00d9ff
    })
);

engine.position.x = -1;
ship.add(engine);

ship.position.set(-1, -1, 2);
ship.rotation.z = 0.15;
scene.add(ship);
// ==========================================
// ESCENA DE BIENVENIDA DE THIAGO
// ==========================================

const welcomeGroup = new THREE.Group();

// ------------------------------------------
// SUPERFICIE LUNAR
// ------------------------------------------

const terrainGeometry = new THREE.PlaneGeometry(30, 30, 100, 100);
terrainGeometry.rotateX(-Math.PI / 2);

const positions = terrainGeometry.attributes.position;

for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);

    let height =
        Math.sin(x * 0.45) * 0.25 +
        Math.cos(z * 0.35) * 0.20 +
        Math.sin(x * 0.8 + z * 0.5) * 0.12;

    // Cráteres
    const craters = [
        { x: -4, z: -3, radius: 2.5, depth: 0.8 },
        { x: 3, z: -5, radius: 1.8, depth: 0.5 },
        { x: 5, z: 2, radius: 2.2, depth: 0.6 },
        { x: -7, z: 4, radius: 1.5, depth: 0.4 }
    ];

    for (const crater of craters) {
        const distance = Math.sqrt(
            (x - crater.x) ** 2 +
            (z - crater.z) ** 2
        );

        if (distance < crater.radius) {
            const depression =
                Math.cos((distance / crater.radius) * Math.PI / 2);

            height -= depression * crater.depth;
        }
    }

    positions.setY(i, height);
}

terrainGeometry.computeVertexNormals();

const lunarTerrain = new THREE.Mesh(
    terrainGeometry,
    new THREE.MeshStandardMaterial({
        color: 0x858b9b,
        roughness: 1,
        metalness: 0,
        side: THREE.DoubleSide
    })
);

lunarTerrain.position.y = -2;
welcomeGroup.add(lunarTerrain);

// ------------------------------------------
// ROCAS LUNARES
// ------------------------------------------

const rockMaterial = new THREE.MeshStandardMaterial({
    color: 0x626a7a,
    roughness: 1
});

for (let i = 0; i < 22; i++) {

    const rock = new THREE.Mesh(
        new THREE.DodecahedronGeometry(
            0.15 + Math.random() * 0.35,
            0
        ),
        rockMaterial
    );

    rock.position.set(
        (Math.random() - 0.5) * 18,
        -1.5 + Math.random() * 0.4,
        -Math.random() * 12
    );

    rock.rotation.set(
        Math.random(),
        Math.random(),
        Math.random()
    );

    welcomeGroup.add(rock);
}

// ------------------------------------------
// TIERRA EN EL HORIZONTE
// ------------------------------------------

const welcomeEarth = new THREE.Mesh(
    new THREE.SphereGeometry(2.6, 64, 64),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.8
    })
);

welcomeEarth.position.set(-3.5, 3.5, -9);
welcomeGroup.add(welcomeEarth);

// Textura terrestre
textureLoader.load(
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        welcomeEarth.material.map = texture;
        welcomeEarth.material.needsUpdate = true;
    }
);

// Halo atmosférico
const earthGlow = new THREE.Mesh(
    new THREE.SphereGeometry(2.75, 64, 64),
    new THREE.MeshBasicMaterial({
        color: 0x269cff,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide
    })
);

earthGlow.position.copy(welcomeEarth.position);
welcomeGroup.add(earthGlow);

// ------------------------------------------
// BASE LUNAR
// ------------------------------------------

const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0xc5d2e5,
    roughness: 0.7,
    metalness: 0.25
});

// Módulo principal
const lunarBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 1.1, 1.2, 32),
    baseMaterial
);

lunarBase.position.set(-5, -0.7, -3);
welcomeGroup.add(lunarBase);

// Cúpula
const baseDome = new THREE.Mesh(
    new THREE.SphereGeometry(
        0.8,
        32,
        24,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
    ),
    new THREE.MeshStandardMaterial({
        color: 0x5ccfff,
        transparent: true,
        opacity: 0.7,
        roughness: 0.2
    })
);

baseDome.position.set(-5, -0.1, -3);
welcomeGroup.add(baseDome);

// Luz de la base
const baseLight = new THREE.PointLight(0x21c8f6, 2, 8);
baseLight.position.set(-5, 0.5, -3);
welcomeGroup.add(baseLight);

// ------------------------------------------
// ILUMINACIÓN CINEMÁTICA
// ------------------------------------------

const welcomeLight = new THREE.PointLight(
    0x1688ff,
    25,
    40
);

welcomeLight.position.set(2, 5, 4);
welcomeGroup.add(welcomeLight);

const moonLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

moonLight.position.set(5, 8, 5);
welcomeGroup.add(moonLight);

// ------------------------------------------
// PERSONAJE THIAGO
// ------------------------------------------

const thiagoTextureLoader = new THREE.TextureLoader();

thiagoTextureLoader.load(
    "02_PERSONAJES/Thiago_personaje.png",

    texture => {

        texture.colorSpace = THREE.SRGBColorSpace;

        const thiagoMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthWrite: false
        });

        const thiago = new THREE.Sprite(thiagoMaterial);

        // Mantener proporciones originales del PNG
        const aspect =
            texture.image.width / texture.image.height;

        const characterHeight = 4.5;

        thiago.scale.set(
            characterHeight * aspect,
            characterHeight,
            1
        );

        // Thiago a la derecha de la escena
        thiago.position.set(
            3,
            0.25,
            0
        );

        welcomeGroup.add(thiago);
    }
);

// ------------------------------------------
// ESCENA OCULTA AL INICIO
// ------------------------------------------

welcomeGroup.visible = false;

scene.add(welcomeGroup);

// CONTROLES DE CÁMARA CON EL MOUSE
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;

let cameraAngleX = 0;
let cameraAngleY = 0;

renderer.domElement.addEventListener("pointerdown", event => {
    isDragging = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

window.addEventListener("pointerup", () => {
    isDragging = false;
});

window.addEventListener("pointermove", event => {
    if (!isDragging) return;

    cameraAngleX += (event.clientX - previousMouseX) * 0.005;
    cameraAngleY += (event.clientY - previousMouseY) * 0.005;

    cameraAngleY = Math.max(
        -1.2,
        Math.min(1.2, cameraAngleY)
    );

    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
});

// BOTÓN DE MISIÓN
// ==========================================
// BOTÓN DE INICIO Y BIENVENIDA
// ==========================================

// ==========================================
// INICIO DE LA MISIÓN LUNAR
// ==========================================

// ==========================================
// BOTÓN EXPLORAR EL UNIVERSO
// ==========================================

const missionButton = document.getElementById("start-mission");

if (missionButton) {
    missionButton.addEventListener("click", () => {

        // Mantener la escena espacial original
        welcomeGroup.visible = false;

        earth.visible = true;
        clouds.visible = true;
        atmosphere.visible = true;
        moon.visible = true;
        orbit.visible = true;
        ship.visible = true;

        // Mostrar el menú educativo
        const spaceMenu = document.querySelector(".space-menu");

        if (spaceMenu) {
            spaceMenu.style.display = "flex";
        }

        // Mantener visible el logo
        const logo = document.querySelector(".logo-principal");

        if (logo) {
            logo.style.display = "";
        }

        // Mantener visible la interfaz
        const interfaceElement = document.querySelector(".interface");

        if (interfaceElement) {
            interfaceElement.style.display = "";
        }

    });
}

/* ==========================================
   NAVEGACIÓN DE PLANETAS
========================================== */

const planetsScreen = document.getElementById("planets-screen");
const planetsButton = document.querySelector('[data-section="planets"]');
const backToMenuButton = document.getElementById("back-to-menu");
const educationPanel = document.getElementById("education-panel");
const educationContent = document.getElementById("education-content");
const closePanelButton = document.getElementById("close-panel");

// Abrir pantalla de planetas
if (planetsButton) {
    planetsButton.addEventListener("click", () => {
        planetsScreen.classList.add("active");
        educationPanel.classList.remove("active");

        document.querySelector(".logo-principal").style.display = "none";
    });
}

// Regresar al menú principal
if (backToMenuButton) {
    backToMenuButton.addEventListener("click", () => {
        planetsScreen.classList.remove("active");

        document.querySelector(".logo-principal").style.display = "";
    });
}

// Información científica de los planetas
const planetData = {
   
mercury: {
    name: "Mercurio",
    position: "Primer planeta desde el Sol",
    diameter: "4.879 km",
    temperature: "Media aproximada de 167 °C",
    moons: "No tiene lunas",
    day: "Un día solar dura 176 días terrestres",
    year: "88 días terrestres",
    composition: "Es un planeta rocoso con un gran núcleo de hierro.",
    fact: "¡Aunque es el planeta más cercano al Sol, no es el más caliente! Venus es más caliente.",
    mission: "¿Cuánto tarda Mercurio en dar una vuelta alrededor del Sol?",
    answer: "88 días terrestres"
},

    
venus: {
    name: "Venus",
    position: "Segundo planeta desde el Sol",
    diameter: "12.104 km",
    temperature: "Aproximadamente 465 °C",
    moons: "No tiene lunas",
    day: "Un día solar dura 117 días terrestres",
    year: "225 días terrestres",
    composition: "Es un planeta rocoso con una atmósfera muy densa, formada principalmente por dióxido de carbono.",
    fact: "¡Venus es el planeta más caliente del Sistema Solar, incluso más que Mercurio!",
    mission: "¿Por qué Venus es más caliente que Mercurio?",
    answer: "Porque su atmósfera atrapa muchísimo calor mediante el efecto invernadero."
},

earth: {
    name: "Tierra",
    position: "Tercer planeta desde el Sol",
    diameter: "12.742 km",
    temperature: "Aproximadamente 15 °C de temperatura media",
    moons: "Una luna",
    day: "24 horas aproximadamente",
    year: "365 días y 6 horas aproximadamente",
    composition: "Es un planeta rocoso. Su superficie tiene océanos, continentes y una atmósfera rica en nitrógeno y oxígeno.",
    fact: "¡La Tierra es el único planeta conocido que alberga vida! Aproximadamente el 71 % de su superficie está cubierta de agua.",
    mission: "¿Qué hace que la Tierra sea especial para la vida?",
    answer: "Tiene agua líquida, una atmósfera protectora y temperaturas adecuadas para muchos seres vivos."
},

mars: {
    name: "Marte",
    position: "Cuarto planeta desde el Sol",
    diameter: "6.779 km",
    temperature: "Aproximadamente −65 °C",
    moons: "Dos lunas: Fobos y Deimos",
    day: "24 horas y 37 minutos aproximadamente",
    year: "687 días terrestres",
    composition: "Es un planeta rocoso con una atmósfera muy delgada, formada principalmente por dióxido de carbono.",
    fact: "¡Marte es conocido como el planeta rojo porque su superficie contiene óxido de hierro, parecido al material de la herrumbre!",
    mission: "¿Por qué Marte tiene un color rojizo?",
    answer: "Por el óxido de hierro presente en su superficie, que le da su característico color rojo."
},

    jupiter: {
        name: "Júpiter",
        position: "Quinto planeta desde el Sol",
        diameter: "139.820 km",
        temperature: "Aproximadamente −110 °C en sus nubes",
        moons: "Tiene muchas lunas",
        fact: "Es el planeta más grande y posee una enorme tormenta llamada Gran Mancha Roja."
    },

    saturn: {
    name: "Saturno",
    position: "Sexto planeta desde el Sol",
    diameter: "116.460 km",
    temperature: "Aproximadamente −140 °C",
    moons: "Tiene muchas lunas, entre ellas Titán y Encélado",
    day: "Aproximadamente 10 horas y 33 minutos",
    year: "29,4 años terrestres",
    composition: "Es un gigante gaseoso formado principalmente por hidrógeno y helio. Sus famosos anillos están compuestos principalmente por hielo, rocas y polvo.",
    fact: "¡Saturno es famoso por sus hermosos anillos! Aunque es enorme, es menos denso que el agua.",
    mission: "¿De qué están formados los anillos de Saturno?",
    answer: "Principalmente de pequeños fragmentos de hielo, rocas y polvo que giran alrededor del planeta."
},

    uranus: {
    name: "Urano",
    position: "Séptimo planeta desde el Sol",
    diameter: "50.724 km",
    temperature: "Aproximadamente −195 °C",
    moons: "Tiene 28 lunas conocidas, entre ellas Titania y Oberón",
    day: "Aproximadamente 17 horas y 14 minutos",
    year: "84 años terrestres",
    composition: "Es un gigante helado formado por agua, amoníaco y metano, además de hidrógeno y helio. Su atmósfera contiene metano, que le da su color azul verdoso.",
    fact: "¡Urano gira prácticamente de lado! Es como si rodara alrededor del Sol mientras viaja por su órbita.",
    mission: "¿Por qué Urano parece tener un color azul verdoso?",
    answer: "Porque el metano de su atmósfera absorbe la luz roja y refleja tonos azules y verdes."
},

    neptune: {
    name: "Neptuno",
    position: "Octavo planeta desde el Sol",
    diameter: "49.244 km",
    temperature: "Aproximadamente −200 °C",
    moons: "Tiene 16 lunas conocidas, entre ellas Tritón",
    day: "Aproximadamente 16 horas",
    year: "165 años terrestres",
    composition: "Es un gigante helado formado por agua, amoníaco y metano, además de hidrógeno y helio. El metano de su atmósfera contribuye a su intenso color azul.",
    fact: "¡Neptuno tiene vientos extremadamente rápidos que pueden superar los 2.000 km/h!",
    mission: "¿Cuánto tarda Neptuno en completar una vuelta alrededor del Sol?",
    answer: "Aproximadamente 165 años terrestres."
},
};

// Abrir ficha de cada planeta
document.querySelectorAll(".planet-card").forEach(card => {

    card.addEventListener("click", () => {

        const planet = planetData[card.dataset.planet];

        if (!planet) return;

        educationContent.innerHTML = `
            <h2>🪐 ${planet.name}</h2>

            <p><strong>Posición:</strong> ${planet.position}</p>

            <p><strong>Diámetro:</strong> ${planet.diameter}</p>

            <p><strong>Temperatura:</strong> ${planet.temperature}</p>

            <p><strong>Lunas:</strong> ${planet.moons}</p>

            
<p><strong>Duración del día:</strong> ${planet.day}</p>

<p><strong>Duración del año:</strong> ${planet.year}</p>

<h3>🔬 ¿De qué está hecho?</h3>

<p>${planet.composition}</p>

<h3>🚀 Misión espacial</h3>

<p>${planet.mission}</p>

<p><strong>Respuesta:</strong> ${planet.answer}</p>


            <h3>¿Sabías que...?</h3>

            <p>${planet.fact}</p>

            <h3>🚀 Misión espacial</h3>

            <p>
                ¡Explorador, recuerda este dato y prepárate
                para descubrir más secretos del universo!
            </p>
        `;

        educationPanel.classList.add("active");
        planetsScreen.classList.remove("active");
    });

});

// Cerrar ficha educativa
if (closePanelButton) {
    closePanelButton.addEventListener("click", () => {
        educationPanel.classList.remove("active");
    });
}

// ==========================================
// ANIMACIÓN
// ==========================================

function animate() {

    requestAnimationFrame(animate);

    // Animación de los planetas originales
    if (!welcomeGroup.visible) {

        earth.rotation.y += 0.0015;
        clouds.rotation.y += 0.0018;
        moon.rotation.y += 0.003;

        ship.position.y =
            -1 + Math.sin(Date.now() * 0.001) * 0.12;

        const radius = 12;

        camera.position.x =
            Math.sin(cameraAngleX) * radius;

        camera.position.z =
            Math.cos(cameraAngleX) * radius;

        camera.position.y =
            3 + cameraAngleY * 5;

        camera.lookAt(0, 0, 0);

    }

    // Rotación suave de la Tierra en bienvenida
    if (welcomeGroup.visible) {
        welcomeEarth.rotation.y += 0.0008;
    }

    stars.rotation.y += 0.0001;

    renderer.render(scene, camera);
}
// ==========================================
// BOTÓN COMENZAR EXPLORACIÓN
// ==========================================

const continueButton = document.getElementById("continue-mission");

if (continueButton) {
    continueButton.addEventListener("click", () => {

        // Cerrar bienvenida
        const welcomeScreen = document.getElementById("welcome-screen");

        if (welcomeScreen) {
            welcomeScreen.classList.remove("active");
        }

        // Mostrar logo centrado
        const logo = document.querySelector(".logo-principal");

        if (logo) {
            logo.style.display = "block";
        }

        // Mostrar interfaz principal
        const interfaceElement = document.querySelector(".interface");

        if (interfaceElement) {
            interfaceElement.style.display = "block";
        }

        // Mostrar menú educativo
        const spaceMenu = document.querySelector(".space-menu");

        if (spaceMenu) {
            spaceMenu.style.display = "flex";
        }

    });
}

animate();

// AJUSTAR PANTALLA
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});


/* ==========================================
   DESAFÍO ESPACIAL - CONEXIÓN
========================================== */

const challengeOverlay = document.getElementById("challenge-overlay");
const challengeButton = document.querySelector('[data-section="quiz"]');
const closeChallengeButton = document.getElementById("close-challenge");

// ==========================================
// BIENVENIDA DEL DESAFÍO CON THIAGO
// ==========================================

if (challengeButton && challengeOverlay) {

    challengeButton.addEventListener("click", () => {

        // Mostrar el desafío
        challengeOverlay.style.display = "flex";

        // Mostrar a Thiago únicamente en la bienvenida
        challengePlanetCharacter.innerHTML = `
            <img
                src="02_PERSONAJES/Thiago_personaje.png"
                alt="Thiago, guía espacial"
                style="
                    width: 220px;
                    max-width: 100%;
                    object-fit: contain;
                "
            >
        `;

    });

}

if (closeChallengeButton && challengeOverlay) {

    closeChallengeButton.addEventListener("click", () => {

        challengeOverlay.style.display = "none";

    });

}


/* ==========================================
   MISIONES DEL DESAFÍO ESPACIAL
========================================== */

const challengeStart = document.getElementById("challenge-start");
const challengeQuestion = document.getElementById("challenge-question");
const challengeAnswers = document.getElementById("challenge-answers");
const challengeFeedback = document.getElementById("challenge-feedback");
const challengeProgress = document.getElementById("challenge-progress");
const challengePlanetCharacter = document.getElementById("challenge-planet-character");

let currentChallenge = 0;
let challengeScore = 0;


const challengeMissions = [
    {
        planet: "Mercurio",
        character: "02_PERSONAJES/Mercurio_personaje.png",
        question: "¡Hola, explorador! ¿Cuál es el planeta más cercano al Sol?",
        answers: ["Mercurio", "Marte", "Neptuno"],
        correct: 0,
        explanation: "¡Correcto! Mercurio es el planeta más cercano al Sol."
    },
    {
        planet: "Venus",
        character: "02_PERSONAJES/Venus_personaje.png",
        question: "¿Cuál es el planeta más caliente del sistema solar?",
        answers: ["Marte", "Venus", "Mercurio"],
        correct: 1,
        explanation: "¡Muy bien! Venus es el planeta más caliente."
    },
    {
        planet: "Tierra",
        character: "02_PERSONAJES/Thiago_personaje.png",
        question: "¿En qué planeta vivimos?",
        answers: ["Tierra", "Saturno", "Urano"],
        correct: 0,
        explanation: "¡Exacto! La Tierra es nuestro hogar."
    },
    {
        planet: "Marte",
        character: "02_PERSONAJES/Marte_personaje.png",
        question: "¿Qué planeta es conocido como el planeta rojo?",
        answers: ["Venus", "Marte", "Neptuno"],
        correct: 1,
        explanation: "¡Correcto! Marte tiene un color rojizo."
    },
    {
        planet: "Júpiter",
        character: "02_PERSONAJES/Jupiter_personaje.png",
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answers: ["Júpiter", "Tierra", "Mercurio"],
        correct: 0,
        explanation: "¡Excelente! Júpiter es el planeta más grande."
    },
    {
        planet: "Saturno",
        character: "02_PERSONAJES/Saturno_personaje.png",
        question: "¿Qué planeta es famoso por sus grandes anillos?",
        answers: ["Marte", "Saturno", "Venus"],
        correct: 1,
        explanation: "¡Muy bien! Saturno tiene un espectacular sistema de anillos."
    },
    {
        planet: "Urano",
        character: "02_PERSONAJES/Urano_personaje.png",
        question: "¿Qué planeta gira casi acostado?",
        answers: ["Urano", "Júpiter", "Tierra"],
        correct: 0,
        explanation: "¡Correcto! Urano gira inclinado, casi de lado."
    },
    {
        planet: "Neptuno",
        character: "02_PERSONAJES/Neptuno_personaje.png",
        question: "¿Cuál es el planeta más lejano del Sol?",
        answers: ["Mercurio", "Saturno", "Neptuno"],
        correct: 2,
        explanation: "¡Fantástico! Neptuno es el planeta más lejano del Sol."
    }
];


function startChallengeMission() {

    const mission = challengeMissions[currentChallenge];

    challengeProgress.textContent =
        `Misión ${currentChallenge + 1} de 8 ⭐`;

    challengeQuestion.textContent = mission.question;

    challengeFeedback.textContent = "";

    challengeStart.style.display = "none";

    challengePlanetCharacter.innerHTML = `
        <img
            src="${mission.character}"
            alt="${mission.planet}"
            style="width:180px; max-width:100%; object-fit:contain;"
        >
    `;

    challengeAnswers.innerHTML = "";

    mission.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "challenge-answer";
        button.textContent = answer;

        button.addEventListener("click", () => {

    if (index === mission.correct) {

        challengeScore++;

        challengeFeedback.textContent =
            "¡Excelente, explorador! ⭐ " + mission.explanation;

        challengeFeedback.style.color = "#7CFFB2";

        // ==========================================
// TEXTO PARA CONTINUAR LA EXPLORACIÓN
// ==========================================
const nextMissionText = document.createElement("button");
nextMissionText.textContent = "🚀 CONTINUAR EXPLORACIÓN";

nextMissionText.style.cssText = `
    display: block;
    width: fit-content;
    max-width: 90%;
    margin: 20px auto;
    padding: 10px;
    text-align: center;
    background: transparent;
    color: #FFD700;
    border: none;
    border-radius: 0;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: none;
`;

challengeFeedback.appendChild(nextMissionText);

nextMissionText.addEventListener("click", () => {

    currentChallenge++;

    if (currentChallenge < challengeMissions.length) {

        startChallengeMission();

    } else {

        challengeQuestion.textContent =
            "¡Felicidades, explorador espacial! 🌟";

        challengeProgress.textContent =
            "¡Has completado todas las misiones!";

        challengeAnswers.innerHTML = "";

        challengeFeedback.textContent =
            "¡Thiago, eres un verdadero explorador del universo! 🚀";

        challengeStart.textContent = "Volver a jugar 🚀";
        challengeStart.style.display = "block";

        challengeStart.onclick = () => {

            currentChallenge = 0;
            challengeScore = 0;

            challengeStart.textContent = "¡Comenzar misión! 🚀";
            challengeStart.onclick = null;

            startChallengeMission();

        };

    }

});

challengeFeedback.appendChild(nextMissionText);

    } else {

        challengeFeedback.textContent =
            "¡Inténtalo de nuevo! 🚀";

        challengeFeedback.style.color = "#FFD76A";

    }

});

        challengeAnswers.appendChild(button);

    });

}

if (challengeStart) {

    challengeStart.addEventListener("click", startChallengeMission);

}


