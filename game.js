
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
            logo.style.display = "block";
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

        document.querySelector(".logo-principal").style.display = "block";
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
// GUÍA ESPACIAL - METEORITOS
// ==========================================


// ==========================================
// GUÍA ESPACIAL - BIBLIOTECA DEL UNIVERSO
// ==========================================

const assistantButton = document.querySelector('[data-section="assistant"]');

const guideTopics = {
    sistema: {
        icon: "☀️",
        title: "Nuestro Sistema Solar",
        intro: "El Sistema Solar es nuestro hogar en el universo.",
        sections: [
            ["¿Qué es el Sistema Solar?", "Es un conjunto formado por el Sol y todos los cuerpos celestes que giran a su alrededor debido a la gravedad."],
            ["¿Cuántos planetas tiene?", "Tiene ocho planetas: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno."],
            ["Dato de explorador 🚀", "El Sol es una estrella y contiene casi toda la masa de nuestro Sistema Solar."]
        ]
    },

    universo: {
        icon: "🌌",
        title: "El Universo y las galaxias",
        intro: "¡El universo es muchísimo más grande de lo que imaginamos!",
        sections: [
            ["¿Qué es el universo?", "Es todo lo que existe: estrellas, planetas, galaxias, materia y energía."],
            ["¿Qué es una galaxia?", "Es un enorme conjunto de estrellas, gas, polvo y otros objetos unidos por la gravedad."],
            ["Nuestra galaxia ⭐", "Vivimos en la Vía Láctea, una galaxia que contiene miles de millones de estrellas."]
        ]
    },

    planetas: {
        icon: "🪐",
        title: "Los ocho planetas",
        intro: "Cada planeta tiene características sorprendentes.",
        sections: [
            ["Planetas rocosos", "Mercurio, Venus, Tierra y Marte son planetas rocosos. Tienen superficies sólidas."],
            ["Gigantes del Sistema Solar", "Júpiter y Saturno son gigantes gaseosos. Urano y Neptuno son gigantes helados."],
            ["Dato de explorador 🚀", "Júpiter es el planeta más grande y Mercurio es el más cercano al Sol."]
        ]
    },

    tierra: {
        icon: "🌍",
        title: "La Tierra y la Luna",
        intro: "Nuestro planeta es un lugar extraordinario.",
        sections: [
            ["¿Por qué hay día y noche?", "Porque la Tierra gira sobre sí misma. La parte que mira al Sol tiene día y la parte opuesta tiene noche."],
            ["¿Por qué vemos diferentes fases de la Luna?", "Porque vemos distintas partes de la Luna iluminadas por el Sol mientras nuestro satélite se mueve alrededor de la Tierra."],
            ["Dato de explorador 🌙", "La Luna es el satélite natural de la Tierra y tarda aproximadamente 27 días en dar una vuelta alrededor de nuestro planeta."]
        ]
    },

    exploracion: {
        icon: "🚀",
        title: "Exploración espacial",
        intro: "¡Los seres humanos también han viajado al espacio!",
        sections: [
            ["¿Qué hace un astronauta?", "Explora el espacio, realiza experimentos y estudia nuestro planeta y otros cuerpos celestes."],
            ["¿Qué es una estación espacial?", "Es un laboratorio que orbita la Tierra y donde los astronautas pueden vivir y trabajar."],
            ["Dato de explorador ⭐", "La Estación Espacial Internacional permite realizar investigaciones científicas en el espacio."]
        ]
    },

    meteoritos: {
        icon: "☄️",
        title: "¡Misión Meteoritos!",
        intro: "¡Bienvenido, explorador! Hoy descubriremos los misterios de las rocas espaciales.",
        sections: [
            ["¿Qué es un meteorito?", "Un meteorito es un fragmento de roca o metal procedente del espacio que logra atravesar la atmósfera y llegar hasta la superficie de la Tierra o de otro cuerpo celeste."],
            ["🌠 ¿Sabías que...?", "Cuando un pequeño fragmento espacial entra en la atmósfera y produce una brillante estela de luz, lo llamamos meteoro. Si una parte llega hasta el suelo, se convierte en meteorito."],
            ["🚀 ¡Dato de explorador!", "Los meteoritos nos ayudan a conocer cómo se formó nuestro Sistema Solar."]
        ]
    },

    curiosidades: {
        icon: "⭐",
        title: "Datos sorprendentes",
        intro: "¡Prepárate para descubrir algunos secretos del espacio!",
        sections: [
            ["El día más largo", "Venus tarda más en girar sobre sí mismo que en dar una vuelta alrededor del Sol."],
            ["Una montaña gigante", "Marte tiene el Monte Olimpo, un volcán enorme que es el más alto conocido del Sistema Solar."],
            ["Un planeta con muchos satélites", "Saturno tiene un espectacular sistema de anillos formado principalmente por hielo y fragmentos rocosos."]
        ]
    },

    rocas: {
        icon: "☄️",
        title: "Asteroides y cometas",
        intro: "En el espacio también existen cuerpos pequeños que viajan alrededor del Sol.",
        sections: [
            ["¿Qué es un asteroide?", "Es un cuerpo rocoso que gira alrededor del Sol. Muchos se encuentran en el cinturón de asteroides entre Marte y Júpiter."],
            ["¿Qué es un cometa?", "Es un cuerpo formado por hielo, polvo y roca. Cuando se acerca al Sol, puede desarrollar una brillante cola."],
            ["Dato de explorador 🚀", "Los cometas y asteroides son restos de los materiales que participaron en la formación del Sistema Solar."]
        ]
    }
};

function showGuideHome() {
    educationContent.innerHTML = `
        <h2>🌌 GUÍA ESPACIAL</h2>
        <p>¡Hola, explorador! Elige un tema para descubrir los secretos del universo.</p>

        <div class="guide-topics">
            ${Object.entries(guideTopics).map(([key, topic]) => `
                <button class="guide-topic" data-guide-topic="${key}">
                    ${topic.icon} ${topic.title}
                </button>
            `).join("")}
        </div>

        <p>🚀 ¡Tu aventura por el conocimiento comienza aquí!</p>
    `;

    educationContent.querySelectorAll("[data-guide-topic]").forEach(button => {
        button.addEventListener("click", () => {
            showGuideTopic(button.dataset.guideTopic);
        });
    });
}

function showGuideTopic(key) {
    const topic = guideTopics[key];
    if (!topic) return;

    educationContent.innerHTML = `
        <h2>${topic.icon} ${topic.title}</h2>
        <p>${topic.intro}</p>

        ${topic.sections.map(section => `
            <h3>${section[0]}</h3>
            <p>${section[1]}</p>
        `).join("")}

        <button id="back-guide">
            ← Volver a la Guía Espacial
        </button>
    `;

    document.getElementById("back-guide").addEventListener("click", showGuideHome);
}

if (assistantButton) {
    assistantButton.addEventListener("click", () => {
        showGuideHome();

        educationPanel.classList.add("active");
        document.querySelector(".logo-principal").style.display = "none";
        planetsScreen.classList.remove("active");

    });
}


// ==========================================
// ANIMACIÓN
// ==========================================
// INICIO DEL EXPLORADOR SOLAR
let solarSystemActive = false;

 // ==========================================
 // CÁMARA 3D DEL SISTEMA SOLAR
 // ==========================================

let solarCameraAngle = 0;
let solarCameraElevation = 0.62;
let solarCameraDistance = 53;

let solarDragging = false;
let solarPreviousX = 0;
let solarPreviousY = 0;
let solarHasDragged = false;

function updateSolarCamera() {

    const horizontalDistance =
        Math.cos(solarCameraElevation) * solarCameraDistance;

    camera.position.x =
        Math.sin(solarCameraAngle) * horizontalDistance;

    camera.position.y =
        Math.sin(solarCameraElevation) * solarCameraDistance;

    camera.position.z =
        Math.cos(solarCameraAngle) * horizontalDistance;

    camera.lookAt(0, 0, 0);
}

const solarExplorer = document.getElementById("solar-explorer");
const solarButton = document.querySelector('[data-section="solar"]');
const solarBackButton = document.getElementById("solar-back");
const solarInfo = document.getElementById("solar-info");

const solarSystemGroup = new THREE.Group();
solarSystemGroup.visible = false;
scene.add(solarSystemGroup);
// ==========================================
// CREACIÓN DEL SOL Y LOS 8 PLANETAS
// ==========================================

const solarPlanets = [];
const solarRaycaster = new THREE.Raycaster();
const solarPointer = new THREE.Vector2();



// SOL

 
// ==========================================
// CONTROLES DE CÁMARA 3D
// ==========================================

const solarCanvas = renderer.domElement;

solarCanvas.style.touchAction = "none";

const solarPointers = new Map();
let solarPreviousPinchDistance = 0;

// GIRAR CON UN DEDO O MOUSE
solarCanvas.addEventListener("pointerdown", (event) => {
    if (!solarSystemActive) return;

    solarPointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
    });

    solarCanvas.setPointerCapture(event.pointerId);

    if (solarPointers.size === 1) {
        solarDragging = true;
        solarHasDragged = false;
        solarPreviousX = event.clientX;
        solarPreviousY = event.clientY;
    }

    if (solarPointers.size === 2) {
        const points = [...solarPointers.values()];

        solarPreviousPinchDistance = Math.hypot(
            points[1].x - points[0].x,
            points[1].y - points[0].y
        );
    }
});

solarCanvas.addEventListener("pointermove", (event) => {
    if (!solarSystemActive || !solarPointers.has(event.pointerId)) return;

    solarPointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
    });

    // GIRAR CON UN DEDO
    if (solarPointers.size === 1) {

        const deltaX = event.clientX - solarPreviousX;
        const deltaY = event.clientY - solarPreviousY;

        if (Math.abs(deltaX) + Math.abs(deltaY) > 3) {
            solarHasDragged = true;
        }

        solarCameraAngle -= deltaX * 0.005;
        solarCameraElevation += deltaY * 0.005;

        solarCameraElevation = Math.max(
            -1.35,
            Math.min(1.35, solarCameraElevation)
        );

        solarPreviousX = event.clientX;
        solarPreviousY = event.clientY;

        updateSolarCamera();
    }

    // ZOOM CON DOS DEDOS
    if (solarPointers.size === 2) {

        solarHasDragged = true;

        const points = [...solarPointers.values()];

        const currentDistance = Math.hypot(
            points[1].x - points[0].x,
            points[1].y - points[0].y
        );

        const difference = currentDistance - solarPreviousPinchDistance;

        solarCameraDistance -= difference * 0.08;

        solarCameraDistance = Math.max(
            30,
            Math.min(90, solarCameraDistance)
        );

        solarPreviousPinchDistance = currentDistance;

        updateSolarCamera();
    }
});

// FINALIZAR GESTOS
function stopSolarDrag(event) {

    solarPointers.delete(event.pointerId);

    solarDragging = solarPointers.size > 0;

    if (solarPointers.size === 1) {

        const remaining = [...solarPointers.values()][0];

        solarPreviousX = remaining.x;
        solarPreviousY = remaining.y;
    }

    if (solarPointers.size === 0) {
        solarPreviousPinchDistance = 0;
    }
}

solarCanvas.addEventListener("pointerup", stopSolarDrag);
solarCanvas.addEventListener("pointercancel", stopSolarDrag);

// ZOOM CON RUEDA DEL MOUSE
solarCanvas.addEventListener("wheel", (event) => {

    if (!solarSystemActive) return;

    event.preventDefault();

    solarCameraDistance += event.deltaY * 0.035;

    solarCameraDistance = Math.max(
        30,
        Math.min(90, solarCameraDistance)
    );

    updateSolarCamera();

}, { passive: false });


const sun = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 48, 48),
    new THREE.MeshBasicMaterial({
        color: 0xffa51f
    })
);

solarSystemGroup.add(sun);

const solarSunLight = new THREE.PointLight(0xffaa33, 180, 100);
solarSystemGroup.add(solarSunLight);

// PLANETAS
const solarPlanetData = [
    { name: "Mercurio", color: 0x99918a, size: 0.38, distance: 4, speed: 0.025, description: "Es el planeta más cercano al Sol y el más pequeño." },
    { name: "Venus", color: 0xe6b56b, size: 0.65, distance: 6, speed: 0.018, description: "Es el planeta más caliente del Sistema Solar." },
    { name: "Tierra", color: 0x247eea, size: 0.72, distance: 8.5, speed: 0.014, description: "Es nuestro hogar y tiene agua líquida y vida." },
    { name: "Marte", color: 0xc94f32, size: 0.55, distance: 11, speed: 0.011, description: "Es conocido como el planeta rojo." },
    { name: "Júpiter", color: 0xd5a77d, size: 1.35, distance: 15, speed: 0.007, description: "Es el planeta más grande del Sistema Solar." },
    { name: "Saturno", color: 0xe6d0a0, size: 1.1, distance: 19, speed: 0.005, description: "Es famoso por sus hermosos anillos." },
    { name: "Urano", color: 0x77d5dc, size: 0.85, distance: 23, speed: 0.0035, description: "Es un gigante helado de color azul verdoso." },
    { name: "Neptuno", color: 0x3159d8, size: 0.82, distance: 27, speed: 0.0025, description: "Es el planeta más lejano del Sol." }
];

// ==========================================
// GENERADOR DE TEXTURAS PROCEDURALES
// THIAGO SPACE EXPLORER
// ==========================================

function createSolarPlanetTexture(name) {

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    // COLORES BASE
    const colors = {
        "Mercurio": ["#77736e", "#aaa39a"],
        "Venus": ["#a96c36", "#e7c18a"],
        "Tierra": ["#063b83", "#168bd1"],
        "Marte": ["#762d20", "#d66b43"],
        "Júpiter": ["#a56d4b", "#e5c39b"],
        "Saturno": ["#a88b60", "#e8d4a5"],
        "Urano": ["#267c91", "#8bd9e4"],
        "Neptuno": ["#102e83", "#397ce0"]
    };

    const palette = colors[name] || ["#555555", "#aaaaaa"];

    // FONDO Y VARIACIONES DE COLOR
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, palette[1]);
    gradient.addColorStop(0.5, palette[0]);
    gradient.addColorStop(1, palette[1]);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // TIERRA: OCÉANOS Y CONTINENTES
    if (name === "Tierra") {

        ctx.fillStyle = "#176d43";

        const continents = [
            [220, 145, 115, 85],
            [285, 300, 65, 145],
            [505, 140, 160, 90],
            [540, 285, 100, 125],
            [790, 170, 120, 75],
            [875, 340, 65, 45]
        ];

        continents.forEach(([x, y, rx, ry]) => {
            ctx.beginPath();
            ctx.ellipse(x, y, rx, ry, 0.3, 0, Math.PI * 2);
            ctx.fill();
        });

        // REGIONES DESÉRTICAS
        ctx.fillStyle = "#b69b63";

        ctx.beginPath();
        ctx.ellipse(530, 160, 65, 35, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // NUBES
        ctx.fillStyle = "rgba(255,255,255,0.22)";

        for (let i = 0; i < 110; i++) {
            const x = (i * 137) % 1024;
            const y = (i * 73) % 512;

            ctx.beginPath();
            ctx.ellipse(x, y, 18, 5, 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // JÚPITER Y SATURNO: BANDAS ATMOSFÉRICAS
    if (name === "Júpiter" || name === "Saturno") {

        const bands = name === "Júpiter" ? 24 : 17;

        for (let i = 0; i < bands; i++) {

            const y = i * (512 / bands);

            ctx.fillStyle = i % 2 === 0
                ? "rgba(255,224,184,0.38)"
                : "rgba(75,43,30,0.18)";

            ctx.beginPath();
            ctx.moveTo(0, y);

            for (let x = 0; x <= 1024; x += 32) {
                ctx.lineTo(
                    x,
                    y + Math.sin(x * 0.018 + i) * 9
                );
            }

            ctx.lineTo(1024, y + 30);
            ctx.lineTo(0, y + 30);
            ctx.closePath();
            ctx.fill();
        }
    }

    // GRAN MANCHA ROJA DE JÚPITER
    if (name === "Júpiter") {

        ctx.fillStyle = "#ad4932";

        ctx.beginPath();
        ctx.ellipse(690, 285, 65, 23, -0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255,210,170,0.6)";
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    // CRÁTERES DE MERCURIO Y MARTE
    if (name === "Mercurio" || name === "Marte") {

        for (let i = 0; i < 150; i++) {

            const x = (i * 197) % 1024;
            const y = (i * 113) % 512;
            const radius = 3 + (i % 12);

            ctx.fillStyle = "rgba(35,25,20,0.25)";

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "rgba(255,220,190,0.28)";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // VENUS: NUBES DENSAS
    if (name === "Venus") {

        for (let i = 0; i < 180; i++) {

            ctx.fillStyle = "rgba(255,224,160,0.13)";

            ctx.beginPath();
            ctx.ellipse(
                (i * 83) % 1024,
                (i * 47) % 512,
                35,
                8,
                0.4,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

    // URANO Y NEPTUNO: BANDAS SUAVES
    if (name === "Urano" || name === "Neptuno") {

        for (let i = 0; i < 18; i++) {

            ctx.fillStyle = "rgba(210,245,255,0.12)";

            ctx.fillRect(0, i * 30, 1024, 12);
        }
    }

    // TEXTURA FINAL
    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
}


solarPlanetData.forEach(data => {

    // ÓRBITA
    const points = [];

    for (let i = 0; i <= 160; i++) {
        const angle = (i / 160) * Math.PI * 2;

        points.push(new THREE.Vector3(
            Math.cos(angle) * data.distance,
            0,
            Math.sin(angle) * data.distance
        ));
    }

    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

    const orbitLine = new THREE.Line(
        orbitGeometry,
        new THREE.LineBasicMaterial({
            color: 0x456b9b,
            transparent: true,
            opacity: 0.55
        })
    );

    solarSystemGroup.add(orbitLine);

    // GRUPO ORBITAL
    const pivot = new THREE.Group();
    solarSystemGroup.add(pivot);

    // PLANETA
    const planet = new THREE.Mesh(
    new THREE.SphereGeometry(data.size, 64, 64),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.9,
        metalness: 0
    })
);
// APLICAR TEXTURA PROCEDURAL AL PLANETA
planet.material.map = createSolarPlanetTexture(data.name);
planet.material.color.set(0xffffff);
planet.material.needsUpdate = true;
    planet.position.x = data.distance;

    planet.userData = {
        name: data.name,
        description: data.description
    };

    pivot.add(planet);

    // ANILLOS DE SATURNO
    if (data.name === "Saturno") {
        const rings = new THREE.Mesh(
            new THREE.RingGeometry(data.size * 1.35, data.size * 2.1, 80),
            new THREE.MeshBasicMaterial({
                color: 0xd9c49b,
                side: THREE.DoubleSide
            })
        );

        rings.rotation.x = Math.PI / 2.4;
        planet.add(rings);
    }

    solarPlanets.push({
        planet: planet,
        orbitPivot: pivot,
        speed: data.speed
    });

});
// ==========================================
// ABRIR Y CERRAR EXPLORACIÓN SOLAR
// ==========================================

if (solarButton) {
    solarButton.addEventListener("click", () => {

        solarSystemActive = true;
        solarSystemGroup.visible = true;

        earth.visible = false;
        clouds.visible = false;
        atmosphere.visible = false;
        moon.visible = false;
        orbit.visible = false;
        ship.visible = false;

        document.querySelector(".interface").style.display = "none";

        solarExplorer.classList.add("active");
        document.querySelector(".logo-principal").style.display = "none";

        camera.position.set(0, 31, 43);
        camera.lookAt(0, 0, 0);

        solarInfo.innerHTML = `
            <h2>☀️ El Sol</h2>
            <p>Es la estrella que ilumina nuestro Sistema Solar. ¡Selecciona un planeta para descubrirlo!</p>
        `;
    });
}

if (solarBackButton) {
    solarBackButton.addEventListener("click", () => {

        solarSystemActive = false;
        solarSystemGroup.visible = false;
        solarExplorer.classList.remove("active");

        earth.visible = true;
        clouds.visible = true;
        atmosphere.visible = true;
        moon.visible = true;
        orbit.visible = true;
        ship.visible = true;

        cameraAngleX = 0;
        cameraAngleY = 0;

        document.querySelector(".interface").style.display = "";
        document.querySelector(".logo-principal").style.display = "block";

    });
}
// ==========================================
// SELECCIÓN DE PLANETAS
// ==========================================

renderer.domElement.addEventListener("click", (event) => {

    if (!solarSystemActive) return;

    solarPointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    solarPointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    solarRaycaster.setFromCamera(solarPointer, camera);

    const planetMeshes = solarPlanets.map(item => item.planet);

    const intersections = solarRaycaster.intersectObjects(planetMeshes);

    if (intersections.length > 0) {

        const selected = intersections[0].object;

        solarInfo.innerHTML = `
            <h2>🪐 ${selected.userData.name}</h2>
            <p>${selected.userData.description}</p>
            <p>¡Sigue explorando, astronauta!</p>
        `;
    }

});
function animate() {

    requestAnimationFrame(animate);

    // Animación de los planetas originales
    if (!welcomeGroup.visible && !solarSystemActive) {

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
// Animación del Sistema Solar
if (solarSystemActive) {

    sun.rotation.y += 0.001;

    solarPlanets.forEach(item => {
        item.orbitPivot.rotation.y += item.speed * 0.35;
        item.planet.rotation.y += 0.012;
    });

}
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

    const planetClass = mission.planet
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

challengePlanetCharacter.innerHTML = `
    <div
        class="challenge-planet ${planetClass}"
        role="img"
        aria-label="Planeta ${mission.planet}"
    ></div>
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
            "¡Eres un verdadero explorador del universo!🚀 ";

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

// ==========================================
// DESAFÍO ESPACIAL 2
// ==========================================

const rescueOverlay = document.getElementById("rescue-overlay");
const rescueOpenButton = document.querySelector(
    '[data-section="challenge2"]'
);
const rescueCloseButton = document.getElementById("rescue-close");

const rescueProgress = document.getElementById("rescue-progress");
const rescueTitle = document.getElementById("rescue-title");
const rescueInstructions = document.getElementById("rescue-instructions");
const rescueActivity = document.getElementById("rescue-activity");
const rescueFeedback = document.getElementById("rescue-feedback");
const rescueNext = document.getElementById("rescue-next");
const rescueScore = document.getElementById("rescue-score");

// Abrir el segundo desafío y comenzar desde cero
if (rescueOpenButton && rescueOverlay) {
    rescueOpenButton.addEventListener("click", () => {

        // Reiniciar progreso y puntuación
        rescueMissionStarted = false;
        rescueMissionCompleted = false;
        rescueCurrentMission = 0;
        rescuePoints = 0;

        // Restaurar pantalla inicial
        rescueProgress.textContent = "MISIÓN 1 DE 8";
        rescueTitle.textContent = "¡Prepárate para tu nueva aventura!";
        rescueInstructions.textContent =
            "Explora nuevos mundos y supera cada misión.";

        rescueFeedback.textContent = "";
        rescueActivity.innerHTML = "";
        rescueScore.textContent = "⭐ Puntos: 0";

        rescueNext.textContent = "COMENZAR AVENTURA 🚀";
        rescueNext.style.display = "inline-block";
        rescueNext.disabled = false;

        rescueOverlay.style.display = "flex";
    });
}

// Cerrar el segundo desafío y reiniciar la aventura
if (rescueCloseButton && rescueOverlay) {
    rescueCloseButton.addEventListener("click", () => {

        rescueOverlay.style.display = "none";

        // Reiniciar progreso y puntuación
        rescueMissionStarted = false;
        rescueMissionCompleted = false;
        rescueCurrentMission = 0;
        rescuePoints = 0;

        // Restaurar pantalla inicial
        rescueProgress.textContent = "MISIÓN 1 DE 8";
        rescueTitle.textContent = "¡Prepárate para tu nueva aventura!";
        rescueInstructions.textContent =
            "Explora nuevos mundos y supera cada misión.";

        rescueFeedback.textContent = "";
        rescueActivity.innerHTML = "";
        rescueScore.textContent = "⭐ Puntos: 0";

        rescueNext.textContent = "COMENZAR AVENTURA 🚀";
        rescueNext.style.display = "inline-block";
        rescueNext.disabled = false;

    });
}


/* ==========================================
   DESAFÍO ESPACIAL 2
   MISIÓN 1: DETECTA EL PLANETA CORRECTO
========================================== */

let rescueMissionStarted = false;
let rescueMissionCompleted = false;
let rescuePoints = 0;

function startRescueMissionOne() {

    rescueMissionStarted = true;
    rescueMissionCompleted = false;

    rescueProgress.textContent = "MISIÓN 1 DE 8";
    rescueTitle.textContent = "¡Detecta el planeta correcto!";
    rescueInstructions.textContent =
        "Soy el planeta más cercano al Sol. ¿Quién soy?";

    rescueFeedback.textContent = "";
    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    rescueNext.style.display = "none";
    rescueActivity.innerHTML = "";

    const planets = [
        {
            name: "Mercurio",
            image: "02_PERSONAJES/mercurio_personaje.png",
            correct: true
        },
        {
            name: "Venus",
            image: "02_PERSONAJES/venus.png",
            correct: false
        },
        {
            name: "Marte",
            image: "02_PERSONAJES/Marte_personaje.png",
            correct: false
        }
    ];

    planets.forEach(planet => {

        const card = document.createElement("button");

        card.className = "rescue-planet-option";

        card.innerHTML = `
            <img src="${planet.image}" alt="${planet.name}">
            <span>${planet.name}</span>
        `;

        card.addEventListener("click", () => {

    if (rescueMissionCompleted) return;

    if (planet.correct) {

        rescueMissionCompleted = true;

                rescuePoints += 100;

        rescueFeedback.textContent =
            "¡EXCELENTE, COMANDANTE! 🚀 +100 puntos ⭐";
        rescueFeedback.style.color = "#7CFFB2";
        card.classList.add("correct");

        rescueActivity.querySelectorAll("button")
            .forEach(button => button.disabled = true);

        rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

        rescueNext.textContent = "CONTINUAR EXPLORACIÓN 🚀";
        rescueNext.style.display = "inline-block";
        rescueNext.disabled = false;

    
} else {

    rescueFeedback.style.color = "#FFD76A";

    rescuePoints = Math.max(0, rescuePoints - 25);
    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    rescueFeedback.textContent =
        "¡Respuesta incorrecta! Pierdes 25 puntos. Inténtalo otra vez, comandante. 🚀";

    card.classList.add("incorrect");

    setTimeout(() => {
        card.classList.remove("incorrect");
    }, 700);
}
});


        rescueActivity.appendChild(card);

    });

}

/* ==========================================
   MISIÓN 2: ORDENA LOS PLANETAS
========================================== */

let rescueCurrentMission = 0;

function startRescueMissionTwo() {

    rescueCurrentMission = 2;
    rescueMissionCompleted = false;

    rescueProgress.textContent = "MISIÓN 2 DE 8";
    rescueTitle.textContent = "¡Ordena los planetas!";
    rescueInstructions.textContent =
        "Toca los planetas en orden, comenzando por el más cercano al Sol.";

    rescueFeedback.textContent = "";
    rescueNext.style.display = "none";
    rescueActivity.innerHTML = "";

    const correctOrder = [
        "Mercurio", "Venus", "Tierra", "Marte",
        "Júpiter", "Saturno", "Urano", "Neptuno"
    ];

    
const planetOptions = [
    { name: "Tierra", image: "01_ASSETS/planetas/tierra.png" },
    { name: "Saturno", image: "01_ASSETS/planetas/saturno.png" },
    { name: "Mercurio", image: "01_ASSETS/planetas/mercurio.png" },
    { name: "Neptuno", image: "01_ASSETS/planetas/neptuno.png" },
    { name: "Venus", image: "01_ASSETS/planetas/venus.png" },
    { name: "Júpiter", image: "01_ASSETS/planetas/jupiter.png" },
    { name: "Marte", image: "01_ASSETS/planetas/marte.png" },
    { name: "Urano", image: "01_ASSETS/planetas/urano.png" }
];


    let nextPlanet = 0;
    let missionTwoErrors = 0;
    let missionTwoPoints = 100;

    
planetOptions.forEach(planet => {

    const name = planet.name;

    const card = document.createElement("button");
    card.className = "rescue-planet-option";

    card.innerHTML = `
        <img src="${planet.image}" alt="${name}">
        <span>${name}</span>
    `;

    card.addEventListener("click", () => {

        if (rescueMissionCompleted || card.disabled) return;

        if (name === correctOrder[nextPlanet]) {

            card.classList.add("correct");
            card.disabled = true;
            nextPlanet++;

            rescueFeedback.textContent =
                "¡Muy bien! " + name + " está en su posición correcta. ⭐";

            rescueFeedback.style.color = "#7CFFB2";

            if (nextPlanet === correctOrder.length) {

                rescueMissionCompleted = true;
                rescuePoints += missionTwoPoints;

                rescueFeedback.textContent =
                    "¡ORDEN PERFECTO, COMANDANTE! 🚀 Has organizado los ocho planetas.";

                rescueScore.textContent =
                    "⭐ Puntos: " + rescuePoints;

                rescueNext.textContent = "MISIÓN 2 COMPLETADA ⭐";
                rescueNext.style.display = "inline-block";
                rescueNext.disabled = false;
            }

        } else {

            rescueFeedback.textContent =
                "¡Revisa el orden! ¿Qué planeta está más cerca del Sol? 🌞";

            rescueFeedback.style.color = "#FFD76A";

            card.classList.add("incorrect");

            setTimeout(() => {
                card.classList.remove("incorrect");
            }, 700);
        }
    });

    rescueActivity.appendChild(card);
});

rescueScore.textContent = "⭐ Puntos: " + rescuePoints;
}

function startRescueMissionThree() {

    rescueCurrentMission = 3;
    rescueMissionCompleted = false;

    rescueProgress.textContent = "MISIÓN 3 DE 8";
    rescueTitle.textContent = "Los secretos de los gigantes";
    rescueInstructions.textContent =
        "¡Comandante! Descubre qué planeta corresponde a cada pista.";

    rescueFeedback.textContent = "";
    rescueNext.style.display = "none";
    rescueActivity.innerHTML = "";

    const questions = [
        {
            clue: "¿Cuál es el planeta más grande del Sistema Solar?",
            answer: "Júpiter",
            explanation: "¡Correcto! Júpiter es el planeta más grande."
        },
        {
            clue: "¿Qué planeta es famoso por sus grandes anillos?",
            answer: "Saturno",
            explanation: "¡Excelente! Saturno es famoso por su espectacular sistema de anillos."
        }
    ];

    let questionIndex = 0;

    function showQuestion() {

        const question = questions[questionIndex];

        rescueInstructions.textContent = question.clue;
        rescueActivity.innerHTML = "";

        const planets = [
            {
                name: "Júpiter",
                image: "01_ASSETS/planetas/jupiter.png"
            },
            {
                name: "Saturno",
                image: "01_ASSETS/planetas/saturno.png"
            }
        ];

        planets.forEach(planet => {

            const card = document.createElement("button");
            card.className = "rescue-planet-option";

            card.innerHTML = `
                <img src="${planet.image}" alt="${planet.name}">
                <span>${planet.name}</span>
            `;

            card.addEventListener("click", () => {

                if (rescueMissionCompleted || card.disabled) return;

                if (planet.name === question.answer) {

                    card.classList.add("correct");

                    rescueActivity.querySelectorAll("button")
                        .forEach(button => button.disabled = true);

                    rescueFeedback.textContent = question.explanation;
                    rescueFeedback.style.color = "#7CFFB2";

                    if (questionIndex === 0) {

                        rescuePoints += 100;
                        rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

                        setTimeout(() => {
                            questionIndex++;
                            rescueFeedback.textContent = "";
                            showQuestion();
                        }, 1300);

                    } else {

                        rescuePoints += 100;
                        rescueMissionCompleted = true;

                        rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

                        rescueFeedback.textContent =
                            "¡MISIÓN SUPERADA, COMANDANTE! 🌟";

                        rescueNext.textContent = "MISIÓN 3 COMPLETADA ⭐";
                        rescueNext.style.display = "inline-block";
                        rescueNext.disabled = false;
                    }

                } else {

    rescuePoints = Math.max(0, rescuePoints - 25);
    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    rescueFeedback.textContent =
        "¡Respuesta incorrecta! Pierdes 25 puntos. ¡Inténtalo otra vez, comandante! 🚀";

    rescueFeedback.style.color = "#FFD76A";

    card.classList.add("incorrect");

    setTimeout(() => {
        card.classList.remove("incorrect");
    }, 700);
}
            });

            rescueActivity.appendChild(card);
        });
    }

    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;
    showQuestion();
}

// ==========================================
// MISIÓN 4: VERDADERO O FALSO ESPACIAL
// ==========================================

function startRescueMissionFour() {

    rescueCurrentMission = 4;
    rescueMissionCompleted = false;

    rescueProgress.textContent = "MISIÓN 4 DE 8";
    rescueTitle.textContent = "Verdadero o falso espacial";
    rescueInstructions.textContent =
        "¡Comandante! Analiza cada afirmación y selecciona tu respuesta.";

    rescueFeedback.textContent = "";
    rescueNext.style.display = "none";
    rescueActivity.innerHTML = "";

    const questions = [
    {
        statement: "Júpiter es el planeta más grande del Sistema Solar.",
        image: "01_ASSETS/planetas/jupiter.png",
        answer: true,
        explanation: "¡Correcto! Júpiter es el planeta más grande."
    },
    {
        statement: "Venus es el planeta más cercano al Sol.",
        image: "01_ASSETS/planetas/venus.png",
        answer: false,
        explanation: "¡Muy bien! Mercurio es el planeta más cercano al Sol."
    },
    {
        statement: "La Tierra tiene un satélite natural llamado Luna.",
        image: "01_ASSETS/planetas/luna.png",
        answer: true,
        explanation: "¡Exacto! La Luna es el satélite natural de la Tierra."
    },
    {
        statement: "Saturno es famoso por sus espectaculares anillos.",
        image: "01_ASSETS/planetas/saturno.png",
        answer: true,
        explanation: "¡Excelente! Saturno es famoso por su sistema de anillos."
    }
];
    let questionIndex = 0;

    function showQuestion() {

        const question = questions[questionIndex];

        rescueInstructions.textContent =
            "AFIRMACIÓN " + (questionIndex + 1) + " DE 4";

        rescueActivity.innerHTML = `
            <div style="
                background: linear-gradient(145deg, #101d3c, #172c50);
                border: 2px solid #36caff;
                border-radius: 18px;
                padding: 24px 18px;
                max-width: 650px;
                margin: 15px auto;
                box-shadow: 0 0 25px rgba(54,202,255,0.2);
                text-align: center;
            ">

                <div style="
                    color: #45d9ff;
                    font-size: 13px;
                    letter-spacing: 3px;
                    margin-bottom: 18px;
                ">
                    ◉ CENTRO DE CONTROL ESPACIAL
                </div>

                <div style="
    margin: 15px auto 20px;
    width: 190px;
    height: 190px;
    display: flex;
    align-items: center;
    justify-content: center;
">
    <img
        src="${question.image}"
        alt="Imagen espacial"
        style="
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 0 15px rgba(54,202,255,0.45));
        "
    >
</div>

                <p style="
                    color: white;
                    font-size: 20px;
                    line-height: 1.5;
                    font-weight: bold;
                    margin-bottom: 25px;
                ">
                    ${question.statement}
                </p>

                <div style="
                    display: flex;
                    justify-content: center;
                    gap: 14px;
                    flex-wrap: wrap;
                ">

                    <button class="rescue-answer-button"
                        data-answer="true"
                        style="
                            background: linear-gradient(135deg,#16b978,#087b59);
                            color: white;
                            border: 2px solid #65ffc0;
                            border-radius: 12px;
                            padding: 15px 25px;
                            font-size: 17px;
                            font-weight: bold;
                            cursor: pointer;
                            min-width: 135px;
                        ">
                        ✓ VERDADERO
                    </button>

                    <button class="rescue-answer-button"
                        data-answer="false"
                        style="
                            background: linear-gradient(135deg,#e05262,#a92348);
                            color: white;
                            border: 2px solid #ff91a3;
                            border-radius: 12px;
                            padding: 15px 25px;
                            font-size: 17px;
                            font-weight: bold;
                            cursor: pointer;
                            min-width: 135px;
                        ">
                        ✕ FALSO
                    </button>

                </div>
            </div>
        `;

        rescueActivity.querySelectorAll(".rescue-answer-button")
            .forEach(button => {

                button.addEventListener("click", () => {

                    if (rescueMissionCompleted || button.disabled) return;

                    const selectedAnswer =
                        button.dataset.answer === "true";

                    if (selectedAnswer === question.answer) {

                        rescueActivity.querySelectorAll("button")
                            .forEach(btn => btn.disabled = true);

                        rescuePoints += 50;
                        rescueScore.textContent =
                            "⭐ Puntos: " + rescuePoints;

                        rescueFeedback.textContent =
                            question.explanation + " +50 puntos ⭐";

                        rescueFeedback.style.color = "#7CFFB2";

                        setTimeout(() => {

                            questionIndex++;

                            if (questionIndex < questions.length) {

                                rescueFeedback.textContent = "";
                                showQuestion();

                            } else {

                                rescueMissionCompleted = true;

                                rescueInstructions.textContent =
                                    "¡Has superado las cuatro afirmaciones!";

                                rescueActivity.innerHTML = `
                                    <div style="
                                        text-align: center;
                                        padding: 25px;
                                        color: white;
                                    ">
                                        <div style="font-size: 65px;">🏆</div>
                                        <h2 style="color: #FFD76A;">
                                            ¡MISIÓN SUPERADA!
                                        </h2>
                                        <p>
                                            ¡Excelente trabajo, comandante!
                                            Has demostrado tus conocimientos.
                                        </p>
                                    </div>
                                `;

                                rescueFeedback.textContent =
                                    "¡Ganaste 200 puntos! ⭐";

                                rescueNext.textContent =
                                    "MISIÓN 4 COMPLETADA ⭐";

                                rescueNext.style.display = "inline-block";
                                rescueNext.disabled = false;

                            }

                        }, 1300);

                    } else {

    rescuePoints = Math.max(0, rescuePoints - 25);
    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    rescueFeedback.textContent =
        "¡Respuesta incorrecta! Pierdes 25 puntos. ¡Revisa la afirmación e inténtalo otra vez! 🚀";

    rescueFeedback.style.color = "#FFD76A";
}

                });

            });
    }

    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    showQuestion();
}


function startRescueMissionFive() {

    rescueCurrentMission = 5;
    rescueMissionCompleted = false;

    rescueProgress.textContent = "MISIÓN 5 DE 8";
    rescueTitle.textContent = "Tierra y Luna: misión orbital";
    rescueInstructions.textContent =
        "¡Comandante! Descubre los secretos de nuestro planeta y su satélite.";

    rescueFeedback.textContent = "";
    rescueNext.style.display = "none";
    rescueActivity.innerHTML = "";

    const questions = [
        {
            clue: "¿Cuál de estos dos cuerpos celestes es nuestro planeta?",
            answer: "Tierra",
            explanation: "¡Correcto! La Tierra es nuestro hogar en el universo."
        },
        {
            clue: "¿Qué cuerpo celeste gira alrededor de la Tierra?",
            answer: "Luna",
            explanation: "¡Excelente! La Luna es el satélite natural de la Tierra."
        },
        {
            clue: "¿Qué movimiento de la Tierra produce el día y la noche?",
            answer: "Rotación",
            explanation: "¡Muy bien! La Tierra gira sobre sí misma. Ese movimiento se llama rotación."
        },
        {
            clue: "¿Por qué vemos diferentes fases de la Luna?",
            answer: "Iluminación del Sol",
            explanation: "¡Exacto! Vemos diferentes partes de la Luna iluminadas por el Sol."
        }
    ];

    let questionIndex = 0;

    function showQuestion() {

        const question = questions[questionIndex];

        rescueInstructions.textContent =
            "PRUEBA " + (questionIndex + 1) + " DE 4";

        rescueActivity.innerHTML = `
            <div style="
                background: linear-gradient(145deg, #101d3c, #172c50);
                border: 2px solid #36caff;
                border-radius: 18px;
                padding: 22px 16px;
                max-width: 650px;
                margin: 15px auto;
                box-shadow: 0 0 25px rgba(54,202,255,0.2);
                text-align: center;
            ">

                <div style="
                    color: #45d9ff;
                    font-size: 13px;
                    letter-spacing: 2px;
                    margin-bottom: 18px;
                ">
                    🌎 EXPEDICIÓN TIERRA Y LUNA
                </div>

                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 25px;
                    flex-wrap: wrap;
                    margin: 15px auto 22px;
                ">

                    <div>
                        <img
                            src="01_ASSETS/planetas/tierra.png"
                            alt="Planeta Tierra"
                            style="
                                width: 125px;
                                height: 125px;
                                object-fit: contain;
                                filter: drop-shadow(0 0 12px rgba(54,202,255,0.5));
                            "
                        >
                        <div style="color:white;font-weight:bold;">
                            TIERRA
                        </div>
                    </div>

                    <div>
                        <img
                            src="01_ASSETS/planetas/luna.png"
                            alt="La Luna"
                            style="
                                width: 125px;
                                height: 125px;
                                object-fit: contain;
                                filter: drop-shadow(0 0 12px rgba(180,190,255,0.5));
                            "
                        >
                        <div style="color:white;font-weight:bold;">
                            LUNA
                        </div>
                    </div>

                </div>

                <p style="
                    color: white;
                    font-size: 19px;
                    line-height: 1.5;
                    font-weight: bold;
                    margin: 15px 0 22px;
                ">
                    ${question.clue}
                </p>

                <div style="
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                " id="rescue-five-options"></div>

            </div>
        `;

        const optionsContainer =
            rescueActivity.querySelector("#rescue-five-options");

        let options = [];

        if (questionIndex === 0) {
            options = ["Luna", "Tierra"];
        } else if (questionIndex === 1) {
            options = ["Tierra", "Luna"];
        } else if (questionIndex === 2) {
            options = ["Traslación", "Rotación"];
        } else {
            options = [
                "Porque cambia de forma",
                "Iluminación del Sol"
            ];
        }

        options.forEach(option => {

            const button = document.createElement("button");

            button.textContent = option;
            button.style.cssText = `
                background: linear-gradient(135deg,#087baf,#07517f);
                color: white;
                border: 2px solid #45d9ff;
                border-radius: 12px;
                padding: 14px 20px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                min-width: 140px;
                max-width: 100%;
            `;

            button.addEventListener("click", () => {

                if (rescueMissionCompleted || button.disabled) return;

                if (option === question.answer) {

                    optionsContainer.querySelectorAll("button")
                        .forEach(btn => btn.disabled = true);

                    rescuePoints += 50;

                    rescueScore.textContent =
                        "⭐ Puntos: " + rescuePoints;

                    rescueFeedback.textContent =
                        question.explanation + " +50 puntos ⭐";

                    rescueFeedback.style.color = "#7CFFB2";

                    setTimeout(() => {

                        questionIndex++;

                        if (questionIndex < questions.length) {

                            rescueFeedback.textContent = "";
                            showQuestion();

                        } else {

                            rescueMissionCompleted = true;

                            rescueInstructions.textContent =
                                "¡Has completado la expedición Tierra y Luna!";

                            rescueActivity.innerHTML = `
                                <div style="
                                    text-align:center;
                                    padding:25px;
                                    color:white;
                                ">
                                    <div style="font-size:65px;">🌎🌙</div>

                                    <h2 style="color:#FFD76A;">
                                        ¡MISIÓN SUPERADA!
                                    </h2>

                                    <p>
                                        ¡Excelente trabajo, comandante!
                                        Ya conoces los secretos de la Tierra y la Luna.
                                    </p>
                                </div>
                            `;

                            rescueFeedback.textContent =
                                "¡Ganaste 200 puntos! ⭐";

                            rescueNext.textContent =
                                "MISIÓN 5 COMPLETADA ⭐";

                            rescueNext.style.display = "inline-block";
                            rescueNext.disabled = false;

                        }

                    }, 1300);

                                } else {

                    rescuePoints = Math.max(0, rescuePoints - 25);

                    rescueScore.textContent =
                        "⭐ Puntos: " + rescuePoints;

                    rescueFeedback.textContent =
                        "¡Respuesta incorrecta! Pierdes 25 puntos. ¡Inténtalo otra vez, comandante! 🚀";

                    rescueFeedback.style.color = "#FFD76A";
                }

            });

            optionsContainer.appendChild(button);
        });
    }

    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    showQuestion();
}

function startRescueMissionSix() {

    rescueCurrentMission = 6;
    const rescueWindow = document.querySelector(".rescue-window");

rescueWindow.style.backgroundImage =
    "url('01_ASSETS/fondo-mision-6.jpg')";

rescueWindow.style.backgroundSize = "cover";
rescueWindow.style.backgroundPosition = "center";
rescueWindow.style.backgroundRepeat = "no-repeat";
    rescueMissionCompleted = false;

    rescueProgress.textContent = "MISIÓN 6 DE 8";
    rescueTitle.textContent = "Meteoritos y asteroides";
    rescueInstructions.textContent =
        "¡Comandante! Investiga los objetos misteriosos del espacio.";

    rescueFeedback.textContent = "";
    rescueNext.style.display = "none";
    rescueActivity.innerHTML = "";

    const questions = [
        {
            icon: "☄️",
            title: "INVESTIGACIÓN 001",
            clue: "¿Qué es un asteroide?",
            options: [
                "Una estrella brillante",
                "Un cuerpo rocoso que gira alrededor del Sol",
                "Un planeta con anillos"
            ],
            answer: "Un cuerpo rocoso que gira alrededor del Sol",
            explanation: "¡Correcto! Los asteroides son cuerpos rocosos que giran alrededor del Sol."
        },
        {
            icon: "🌠",
            title: "INVESTIGACIÓN 002",
            clue: "¿Cómo se llama la brillante estela de luz que vemos cuando un fragmento espacial entra en la atmósfera?",
            options: [
                "Meteoro",
                "Asteroide",
                "Satélite"
            ],
            answer: "Meteoro",
            explanation: "¡Muy bien! El meteoro es el fenómeno luminoso que vemos en el cielo."
        },
        {
            icon: "🌍",
            title: "INVESTIGACIÓN 003",
            clue: "¿Cómo se llama un fragmento espacial que logra llegar hasta la superficie de la Tierra?",
            options: [
                "Cometa",
                "Meteoro",
                "Meteorito"
            ],
            answer: "Meteorito",
            explanation: "¡Exacto! Cuando un fragmento espacial llega al suelo, se llama meteorito."
        },
        {
            icon: "🪐",
            title: "INVESTIGACIÓN 004",
            clue: "¿Entre qué dos planetas se encuentra el cinturón principal de asteroides?",
            options: [
                "Tierra y Marte",
                "Marte y Júpiter",
                "Júpiter y Saturno"
            ],
            answer: "Marte y Júpiter",
            explanation: "¡Excelente! El cinturón principal de asteroides está entre Marte y Júpiter."
        }
    ];

    let questionIndex = 0;

    function showQuestion() {

        const question = questions[questionIndex];

        rescueInstructions.textContent =
            "INVESTIGACIÓN " + (questionIndex + 1) + " DE 4";

        rescueActivity.innerHTML = `
            <div style="
                background: linear-gradient(145deg, #10172f, #25204b);
                border: 2px solid #a879ff;
                border-radius: 20px;
                padding: 24px 18px;
                max-width: 650px;
                margin: 15px auto;
                box-shadow: 0 0 25px rgba(168,121,255,0.25);
                text-align: center;
            ">

                <div style="
                    color: #c6a5ff;
                    font-size: 13px;
                    letter-spacing: 3px;
                    margin-bottom: 12px;
                ">
                    LABORATORIO ESPACIAL
                </div>

                <div style="
                    font-size: 65px;
                    margin: 12px auto;
                    filter: drop-shadow(0 0 15px rgba(168,121,255,0.5));
                ">
                    ${question.icon}
                </div>

                <div style="
                    color: #ffd76a;
                    font-size: 12px;
                    letter-spacing: 2px;
                    margin-bottom: 12px;
                ">
                    ${question.title}
                </div>

                <p style="
                    color: white;
                    font-size: 19px;
                    line-height: 1.5;
                    font-weight: bold;
                    margin: 15px 0 22px;
                ">
                    ${question.clue}
                </p>

                <div id="rescue-six-options" style="
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    max-width: 440px;
                    margin: auto;
                "></div>

            </div>
        `;

        const optionsContainer =
            rescueActivity.querySelector("#rescue-six-options");

        question.options.forEach(option => {

            const button = document.createElement("button");

            button.textContent = option;

            button.style.cssText = `
                background: linear-gradient(135deg,#45317d,#263b72);
                color: white;
                border: 2px solid #a879ff;
                border-radius: 12px;
                padding: 14px 16px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                width: 100%;
            `;

            button.addEventListener("click", () => {

                if (rescueMissionCompleted || button.disabled) return;

                if (option === question.answer) {

                    optionsContainer.querySelectorAll("button")
                        .forEach(btn => btn.disabled = true);

                    rescuePoints += 50;

                    rescueScore.textContent =
                        "⭐ Puntos: " + rescuePoints;

                    rescueFeedback.textContent =
                        question.explanation + " +50 puntos ⭐";

                    rescueFeedback.style.color = "#7CFFB2";

                    setTimeout(() => {

                        questionIndex++;

                        if (questionIndex < questions.length) {

                            rescueFeedback.textContent = "";
                            showQuestion();

                        } else {

                            rescueMissionCompleted = true;

                            rescueInstructions.textContent =
                                "¡Has completado todas las investigaciones!";

                            rescueActivity.innerHTML = `
                                <div style="
                                    text-align:center;
                                    padding:25px;
                                    color:white;
                                ">
                                    <div style="font-size:65px;">🏆☄️</div>

                                    <h2 style="color:#FFD76A;">
                                        ¡MISIÓN SUPERADA!
                                    </h2>

                                    <p>
                                        ¡Excelente trabajo, comandante!
                                        Ya conoces los secretos de las rocas espaciales.
                                    </p>
                                </div>
                            `;

                            rescueFeedback.textContent =
                                "¡Ganaste 200 puntos! ⭐";

                            rescueNext.textContent =
                                "MISIÓN 6 COMPLETADA ⭐";

                            rescueNext.style.display = "inline-block";
                            rescueNext.disabled = false;
                        }

                    }, 1300);

                                } else {

                    rescuePoints = Math.max(0, rescuePoints - 25);

                    rescueScore.textContent =
                        "⭐ Puntos: " + rescuePoints;

                    rescueFeedback.textContent =
                        "¡Respuesta incorrecta! Pierdes 25 puntos. ¡Analiza las pistas e inténtalo nuevamente, comandante! 🚀";

                    rescueFeedback.style.color = "#FFD76A";
                }
            });

            optionsContainer.appendChild(button);
        });
    }

    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    showQuestion();
}

function startRescueMissionSeven() {

    rescueCurrentMission = 7;
    // FONDO EXCLUSIVO DE LA MISIÓN 7
const rescueWindow = document.querySelector(".rescue-window");
if (rescueWindow) {
    rescueWindow.style.backgroundImage =
        "linear-gradient(rgba(5, 10, 35, 0.25), rgba(5, 10, 35, 0.40)), url('01_ASSETS/fondo-mision-7.jpg')";

    rescueWindow.style.backgroundSize = "cover";
    rescueWindow.style.backgroundPosition = "center";
    rescueWindow.style.backgroundRepeat = "no-repeat";
}
    rescueMissionCompleted = false;

    rescueProgress.textContent = "MISIÓN 7 DE 8";
    rescueTitle.textContent = "Completa el mapa del Sistema Solar";
    rescueInstructions.textContent =
        "¡Comandante! Ordena los planetas desde el Sol.";

    rescueFeedback.textContent = "";
    rescueNext.style.display = "none";
    rescueActivity.innerHTML = "";

    const correctOrder = [
        "Mercurio", "Venus", "Tierra", "Marte",
        "Júpiter", "Saturno", "Urano", "Neptuno"
    ];

    const planets = [
        { name: "Mercurio", image: "01_ASSETS/planetas/mercurio.png" },
        { name: "Venus", image: "01_ASSETS/planetas/venus.png" },
        { name: "Tierra", image: "01_ASSETS/planetas/tierra.png" },
        { name: "Marte", image: "01_ASSETS/planetas/marte.png" },
        { name: "Júpiter", image: "01_ASSETS/planetas/jupiter.png" },
        { name: "Saturno", image: "01_ASSETS/planetas/saturno.png" },
        { name: "Urano", image: "01_ASSETS/planetas/urano.png" },
        { name: "Neptuno", image: "01_ASSETS/planetas/neptuno.png" }
    ];

    let nextPlanet = 0;

    function showMap() {

        rescueInstructions.textContent =
            "PLANETA " + (nextPlanet + 1) + " DE 8 · " +
            "¿Cuál sigue desde el Sol?";

        rescueActivity.innerHTML = `
            <div style="
                background: linear-gradient(145deg,#101d3c,#172c50);
                border: 2px solid #36caff;
                border-radius: 20px;
                padding: 20px 15px;
                max-width: 700px;
                margin: 15px auto;
                text-align: center;
                box-shadow: 0 0 25px rgba(54,202,255,0.2);
            ">

                <div style="
                    color:#45d9ff;
                    letter-spacing:2px;
                    font-size:13px;
                    margin-bottom:15px;
                ">
                    🌞 MAPA DE EXPLORACIÓN
                </div>

                <div style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-wrap:wrap;
                    gap:8px;
                    margin-bottom:22px;
                " id="rescue-seven-map"></div>

                <div style="
                    color:#ffd76a;
                    font-weight:bold;
                    margin-bottom:15px;
                ">
                    ELIGE EL SIGUIENTE PLANETA
                </div>

                <div style="
                    display:grid;
                    grid-template-columns:repeat(auto-fit,minmax(115px,1fr));
                    gap:12px;
                " id="rescue-seven-options"></div>

            </div>
        `;

        const map = rescueActivity.querySelector("#rescue-seven-map");
        const options = rescueActivity.querySelector("#rescue-seven-options");

        const sun = document.createElement("div");
        sun.innerHTML = "☀️";
        sun.style.fontSize = "32px";
        map.appendChild(sun);
correctOrder.slice(0, nextPlanet).forEach(name => {

    const planet = planets.find(p => p.name === name);

    const item = document.createElement("div");
    item.innerHTML = `
        <img src="${planet.image}" alt="${name}"
        style="width:42px;height:42px;object-fit:contain;">
    `;
    map.appendChild(item);
});
        planets.forEach(planet => {

            if (correctOrder.slice(0, nextPlanet).includes(planet.name)) {
                return;
            }

            const button = document.createElement("button");

            button.style.cssText = `
                background:linear-gradient(145deg,#153b68,#102448);
                border:2px solid #36caff;
                border-radius:12px;
                padding:10px 5px;
                color:white;
                cursor:pointer;
                font-weight:bold;
            `;

            button.innerHTML = `
                <img src="${planet.image}" alt="${planet.name}"
                style="width:75px;height:75px;object-fit:contain;display:block;margin:auto;">
                <span>${planet.name}</span>
            `;

            button.addEventListener("click", () => {

                if (rescueMissionCompleted) return;

                if (planet.name === correctOrder[nextPlanet]) {

                    nextPlanet++;
                    rescuePoints += 25;

                    rescueScore.textContent =
                        "⭐ Puntos: " + rescuePoints;

                    rescueFeedback.textContent =
                        "¡Correcto, comandante! 🌟";

                    rescueFeedback.style.color = "#7CFFB2";

                    if (nextPlanet === correctOrder.length) {

                        rescueMissionCompleted = true;

                        rescueInstructions.textContent =
                            "¡Has completado el mapa del Sistema Solar!";

                        rescueActivity.innerHTML = `
                            <div style="text-align:center;padding:25px;color:white;">
                                <div style="font-size:65px;">🌞🪐🏆</div>
                                <h2 style="color:#FFD76A;">¡MAPA COMPLETADO!</h2>
                                <p>¡Excelente trabajo, comandante! Has organizado los ocho planetas.</p>
                            </div>
                        `;

                        rescueFeedback.textContent =
                            "¡Ganaste 200 puntos! ⭐";

                        rescueNext.textContent =
                            "MISIÓN 7 COMPLETADA ⭐";

                        rescueNext.style.display = "inline-block";
                        rescueNext.disabled = false;

                    } else {

                        setTimeout(() => {
                            rescueFeedback.textContent = "";
                            showMap();
                        }, 900);
                    }

                } else {

    rescuePoints = Math.max(0, rescuePoints - 25);

    rescueScore.textContent =
        "⭐ Puntos: " + rescuePoints;

    rescueFeedback.textContent =
        "¡Respuesta incorrecta! Pierdes 25 puntos. ¡Inténtalo otra vez, comandante! 🚀";

    rescueFeedback.style.color = "#FFD76A";
}
            });

            options.appendChild(button);
        });
    }

    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    showMap();
}


// ==========================================
// NAVEGACIÓN ENTRE MISIONES
// ==========================================

if (rescueNext) {

    rescueNext.addEventListener("click", () => {

        // Comenzar misión 1
        if (!rescueMissionStarted) {

            rescueCurrentMission = 1;
            startRescueMissionOne();

        }

        // Pasar de misión 1 a misión 2
        else if (
            rescueCurrentMission === 1 &&
            rescueMissionCompleted
        ) {

            startRescueMissionTwo();

        }

        // Pasar de misión 2 a misión 3
        else if (
            rescueCurrentMission === 2 &&
            rescueMissionCompleted
        ) {

            startRescueMissionThree();

        }

        // Pasar de misión 3 a misión 4
else if (
    rescueCurrentMission === 3 &&
    rescueMissionCompleted
) {

    startRescueMissionFour();

}
// Pasar de misión 4 a misión 5
else if (
    rescueCurrentMission === 4 &&
    rescueMissionCompleted
) {

    startRescueMissionFive();

}

// Pasar de misión 5 a misión 6
else if (
    rescueCurrentMission === 5 &&
    rescueMissionCompleted
) {

    startRescueMissionSix();

}

// Pasar de misión 6 a misión 7
else if (
    rescueCurrentMission === 6 &&
    rescueMissionCompleted
) {
    startRescueMissionSeven();
}

else if (
    rescueCurrentMission === 7 &&
    rescueMissionCompleted
) {
    startRescueMissionEight();
}

    });

}

// ==========================================
// MISIÓN 8: EL RETO FINAL DEL COMANDANTE
// ==========================================

function startRescueMissionEight() {

    rescueCurrentMission = 8;
    rescueMissionCompleted = false;

    const rescueWindow = document.querySelector(".rescue-window");

    if (rescueWindow) {
        rescueWindow.style.backgroundImage =
            "linear-gradient(rgba(5, 10, 35, 0.30), rgba(5, 10, 35, 0.45)), url('01_ASSETS/fondo-mision-8.jpg')";

        rescueWindow.style.backgroundSize = "cover";
        rescueWindow.style.backgroundPosition = "center";
        rescueWindow.style.backgroundRepeat = "no-repeat";
    }

    rescueProgress.textContent = "MISIÓN 8 DE 8";
    rescueTitle.textContent = "EL RETO FINAL DEL COMANDANTE";
    rescueInstructions.textContent =
        "¡Explorador Espacial! Demuestra todo lo que aprendiste en tu expedición espacial.";

    rescueFeedback.textContent = "";
    rescueNext.style.display = "none";
    rescueActivity.innerHTML = "";

    rescueScore.textContent = "⭐ Puntos: " + rescuePoints;

    
    const finalQuestions = [
        {
            question: "¿Cuál es el planeta más cercano al Sol?",
            options: ["Venus", "Mercurio", "Marte"],
            answer: "Mercurio",
            explanation: "¡Correcto! Mercurio es el planeta más cercano al Sol."
        },
        {
            question: "¿Cuál es el planeta más grande del Sistema Solar?",
            options: ["La Tierra", "Saturno", "Júpiter"],
            answer: "Júpiter",
            explanation: "¡Excelente! Júpiter es el planeta más grande."
        },
        {
            question: "¿Qué cuerpo celeste gira alrededor de la Tierra?",
            options: ["La Luna", "El Sol", "Marte"],
            answer: "La Luna",
            explanation: "¡Muy bien! La Luna es el satélite natural de la Tierra."
        },
        {
            question: "¿Qué es el Sol?",
            options: ["Un planeta", "Una estrella", "Un satélite"],
            answer: "Una estrella",
            explanation: "¡Así es! El Sol es una estrella que nos da luz y calor."
        },
        {
            question: "¿Cuántos planetas tiene nuestro Sistema Solar?",
            options: ["7", "8", "9"],
            answer: "8",
            explanation: "¡Perfecto, comandante! Nuestro Sistema Solar tiene ocho planetas."
        }
    ];

    let currentFinalQuestion = 0;

    function showFinalQuestion() {

        const question = finalQuestions[currentFinalQuestion];

        rescueInstructions.textContent =
            "PRUEBA " + (currentFinalQuestion + 1) + " DE 5";

        rescueFeedback.textContent = "";

        rescueActivity.innerHTML = `
            <div style="
                max-width:650px;
                margin:15px auto;
                padding:22px;
                background:rgba(5,15,45,0.88);
                border:2px solid #55d9ff;
                border-radius:22px;
                text-align:center;
                color:white;
                box-shadow:0 0 25px rgba(54,202,255,0.25);
            ">

                <div style="font-size:35px;margin-bottom:12px;">
                    🚀 ⭐
                </div>

                <div style="
                    color:#ffd76a;
                    font-size:13px;
                    letter-spacing:2px;
                    margin-bottom:15px;
                ">
                    RETO DEL COMANDANTE
                </div>

                <h2 style="
                    color:white;
                    font-size:21px;
                    margin-bottom:22px;
                ">
                    ${question.question}
                </h2>

                <div id="final-answer-options" style="
                    display:grid;
                    grid-template-columns:1fr;
                    gap:12px;
                "></div>

                <div style="
                    margin-top:18px;
                    color:#ffd76a;
                    font-weight:bold;
                ">
                    ⭐ 100 PUNTOS POR RESPUESTA CORRECTA
                </div>
            </div>
        `;

        const answerOptions =
            rescueActivity.querySelector("#final-answer-options");

        question.options.forEach(option => {

            const button = document.createElement("button");

            button.textContent = option;

            button.style.cssText = `
                padding:14px;
                border:2px solid #36caff;
                border-radius:13px;
                background:linear-gradient(145deg,#153b68,#102448);
                color:white;
                font-size:16px;
                font-weight:bold;
                cursor:pointer;
            `;

            button.addEventListener("click", () => {

                if (option === question.answer) {

                    rescuePoints += 100;

                    rescueScore.textContent =
                        "⭐ Puntos: " + rescuePoints;

                    rescueFeedback.textContent =
                        question.explanation;

                    rescueFeedback.style.color = "#7CFFB2";

                    currentFinalQuestion++;

                    if (currentFinalQuestion === finalQuestions.length) {

                        setTimeout(showFinalMedal, 1300);

                    } else {

                        setTimeout(showFinalQuestion, 1300);
                    }

                } else {

    rescuePoints = Math.max(0, rescuePoints - 25);

    rescueScore.textContent =
        "⭐ Puntos: " + rescuePoints;

    rescueFeedback.textContent =
        "¡Respuesta incorrecta! Pierdes 25 puntos. ¡Inténtalo otra vez, comandante! 🚀";

    rescueFeedback.style.color = "#FFD76A";
}
            });

            answerOptions.appendChild(button);
        });
    }

    function showFinalMedal() {

        rescueMissionCompleted = true;

        const rescueWindow = document.querySelector(".rescue-window");

if (rescueWindow) {
    rescueWindow.style.backgroundImage =
        "linear-gradient(rgba(5, 10, 35, 0.20), rgba(5, 10, 35, 0.35)), url('01_ASSETS/fondo-final-celebracion.jpg')";

    rescueWindow.style.backgroundSize = "cover";
    rescueWindow.style.backgroundPosition = "center";
    rescueWindow.style.backgroundRepeat = "no-repeat";
}

        rescueInstructions.textContent =
            "¡HAS CONQUISTADO EL RETO FINAL!";

        rescueFeedback.textContent =
            "¡FELICITACIONES!";

        rescueFeedback.style.color = "#FFD76A";

        rescueActivity.innerHTML = `
            <div style="
                max-width:650px;
                margin:15px auto;
                padding:25px 15px;
                background:linear-gradient(145deg,#101d3c,#25214c);
                border:2px solid #FFD76A;
                border-radius:24px;
                text-align:center;
                color:white;
                box-shadow:0 0 35px rgba(255,215,106,0.35);
            ">

                <div style="font-size:45px;">
                    ✨ 🚀 ✨
                </div>

                <h2 style="
                    color:#FFD76A;
                    letter-spacing:2px;
                ">
                    ¡MISIÓN CUMPLIDA!
                </h2>

                
<style>
@keyframes medalSpin {
    0% { transform: perspective(800px) rotateY(0deg) scale(0.9); }
    50% { transform: perspective(800px) rotateY(180deg) scale(1.05); }
    100% { transform: perspective(800px) rotateY(360deg) scale(0.9); }
}
</style>

<img
    src="01_ASSETS/medalla-thiago-space.gif"
    alt="Medalla Maestro del Sistema Solar"
    style="
        width:240px;
        max-width:80%;
        height:auto;
        display:block;
        margin:20px auto;
        animation:medalSpin 5s ease-in-out infinite;
        filter:drop-shadow(0 0 20px rgba(255,215,106,0.8));
    "
>


                <div style="
                    color:#FFD76A;
                    font-size:23px;
                    font-weight:bold;
                    margin-bottom:12px;
                ">
                    🏆 MAESTRO DEL SISTEMA SOLAR
                </div>

                <p style="font-size:16px;line-height:1.6;">
                    ¡Felicitaciones, EXPLORADOR!
                    Has superado las ocho misiones y demostrado
                    tus conocimientos sobre el universo.
                </p>

                <div style="
                    font-size:25px;
                    margin-top:18px;
                ">
                    🌞 🪐 🌎 🚀
                </div>

                <div style="
                    color:#FFD76A;
                    font-size:19px;
                    font-weight:bold;
                    margin-top:15px;
                ">
                    ⭐ PUNTUACIÓN FINAL: ${rescuePoints}
                </div>

                <p style="
                    color:#a9dfff;
                    margin-top:15px;
                    font-size:13px;
                ">
                    THIAGO SPACE · EXPLORADORES DEL SISTEMA SOLAR
                </p>

            </div>
        `;

        rescueNext.style.display = "none";
    }

    showFinalQuestion();


}




