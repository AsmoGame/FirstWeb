const PILOTOS = [
  {
    id: "pilot1",
    nombre: "Raleigh Becket",
    rango: "Capitán",
    pais: "EE.UU.",
    estado: "Activo",
    thumb: "https://via.placeholder.com/500x260?text=Raleigh+Becket",
    codigo: "RB-001",
    avanzado: {
      edad: 32,
      altura: "1.85 m",
      experiencia: "Veterano de 3 despliegues",
      especialidad: "Mark-5 & Mark-6",
      notas: "Alta compatibilidad con Gipsy Avenger"
    }
  },
  {
    id: "pilot2",
    nombre: "Mako Mori",
    rango: "Teniente",
    pais: "Japón",
    estado: "Activo",
    thumb: "https://via.placeholder.com/500x260?text=Mako+Mori",
    codigo: "MM-002",
    avanzado: {
      edad: 28,
      altura: "1.68 m",
      experiencia: "Veterana de 2 despliegues",
      especialidad: "Mark-6",
      notas: "Alta coordinación con Raleigh Becket"
    }
  },
  {
    id: "pilot3",
    nombre: "Herc Hansen",
    rango: "Sargento",
    pais: "Dinamarca",
    estado: "Activo",
    thumb: "https://via.placeholder.com/500x260?text=Herc+Hansen",
    codigo: "HH-003",
    avanzado: {
      edad: 35,
      altura: "1.90 m",
      experiencia: "Veterano de 4 despliegues",
      especialidad: "Mark-5 & Mark-7",
      notas: "Especialista en cañones de plasma"
    }
  },
  {
    id: "pilot4",
    nombre: "Amara Namani",
    rango: "Teniente",
    pais: "India",
    estado: "En entrenamiento",
    thumb: "https://via.placeholder.com/500x260?text=Amara+Namani",
    codigo: "AN-004",
    avanzado: {
      edad: 26,
      altura: "1.70 m",
      experiencia: "1 despliegue",
      especialidad: "Mark-7",
      notas: "Rápida adaptación a nuevos sistemas"
    }
  }
];

const carousel = document.getElementById("carousel");
let angle = 0;

// Crear cartas
let currentPilot = null;
PILOTOS.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="thumb"><img src="${p.thumb}" alt="${p.nombre}"></div>
    <h3>${p.nombre}</h3>
    <div class="badge">${p.rango}</div>
    <div class="meta">${p.pais} | Estado: ${p.estado}</div>
  `;
  card.addEventListener("click", () => {
    document.getElementById("modal").classList.add("show");
    document.getElementById("modalTitle").textContent = p.nombre;
    document.getElementById("details").hidden = true;
    document.getElementById("codeInput").value = "";
    document.getElementById("err").textContent = "";
    currentPilot = p;
  });
  carousel.appendChild(card);
});

// Posicionar en círculo 3D
function rotateCarousel() {
  const cards = document.querySelectorAll(".carousel .card");
  const num = cards.length;
  const theta = 360 / num;
  cards.forEach((card, i) => {
    const a = (i * theta + angle) % 360;
    card.style.transform = `rotateY(${a}deg) translateZ(500px)`;
  });
}
rotateCarousel();

document.getElementById("prev").addEventListener("click", () => {
  angle -= 180;
  rotateCarousel();
});
document.getElementById("next").addEventListener("click", () => {
  angle += 180;
  rotateCarousel();
});

// Modal y validación
const modal = document.getElementById("modal");
const scrim = document.getElementById("scrim");
const closeX = document.getElementById("closeX");
const codeInput = document.getElementById("codeInput");
const btnValidar = document.getElementById("btnValidar");
const err = document.getElementById("err");
const details = document.getElementById("details");

closeX.addEventListener("click", () => modal.classList.remove("show"));
scrim.addEventListener("click", () => modal.classList.remove("show"));

btnValidar.addEventListener("click", () => {
  if (currentPilot && codeInput.value === currentPilot.codigo) {
    details.hidden = false;
    details.innerHTML = `<strong>Edad:</strong> ${currentPilot.avanzado.edad} años<br>
                       <strong>Altura:</strong> ${currentPilot.avanzado.altura}<br>
                       <strong>Experiencia:</strong> ${currentPilot.avanzado.experiencia}<br>
                       <strong>Especialidad:</strong> ${currentPilot.avanzado.especialidad}<br>
                       <strong>Notas:</strong> ${currentPilot.avanzado.notas}`;
    err.textContent = "";
  } else {
    err.textContent = "Código incorrecto";
    details.hidden = true;
  }
});
