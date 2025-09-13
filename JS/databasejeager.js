const JAEGERS = [
  {
    id: "jaeger1",
    nombre: "Gipsy Danger",
    modelo: "Mark-3",
    pais: "EE.UU.",
    estado: "Activo",
    thumb: "https://via.placeholder.com/500x260?text=Gipsy+Danger",
    codigo: "GD-001",
    avanzado: {
      altura: "79 m",
      peso: "1,980 toneladas",
      armamento: "Cañones de plasma, puños reforzados",
      notas: "Sincronización óptima con Raleigh Becket & Mako Mori"
    }
  },
  {
    id: "jaeger2",
    nombre: "Striker Eureka",
    modelo: "Mark-5",
    pais: "Australia",
    estado: "Activo",
    thumb: "https://via.placeholder.com/500x260?text=Striker+Eureka",
    codigo: "SE-002",
    avanzado: {
      altura: "76 m",
      peso: "1,850 toneladas",
      armamento: "Cañones de plasma, espada de energía",
      notas: "Pilotos experimentados: Herc Hansen & Chuck Hansen"
    }
  },
  {
    id: "jaeger3",
    nombre: "Crimson Typhoon",
    modelo: "Mark-4",
    pais: "China",
    estado: "Activo",
    thumb: "https://via.placeholder.com/500x260?text=Crimson+Typhoon",
    codigo: "CT-003",
    avanzado: {
      altura: "76 m",
      peso: "1,720 toneladas",
      armamento: "Tres brazos, cañón rotativo",
      notas: "Piloto: Mei & hermanas gemelas"
    }
  },
  {
    id: "jaeger4",
    nombre: "Cherno Alpha",
    modelo: "Mark-1",
    pais: "Rusia",
    estado: "Activo",
    thumb: "https://via.placeholder.com/500x260?text=Cherno+Alpha",
    codigo: "CA-004",
    avanzado: {
      altura: "85 m",
      peso: "2,000 toneladas",
      armamento: "Puños reforzados, blindaje pesado",
      notas: "Pilotos: Sasha & Aleksis Kaidanovsky"
    }
  }
];

const carousel = document.getElementById("carousel");
let angle = 0;
let currentJaeger = null;

// Crear cartas
JAEGERS.forEach((j, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="thumb"><img src="${j.thumb}" alt="${j.nombre}"></div>
    <h3>${j.nombre}</h3>
    <div class="badge">${j.modelo}</div>
    <div class="meta">${j.pais} | Estado: ${j.estado}</div>
  `;
  card.addEventListener("click", () => {
    document.getElementById("modal").classList.add("show");
    document.getElementById("modalTitle").textContent = j.nombre;
    document.getElementById("details").hidden = true;
    document.getElementById("codeInput").value = "";
    document.getElementById("err").textContent = "";
    currentJaeger = j;
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
  if (currentJaeger && codeInput.value === currentJaeger.codigo) {
    details.hidden = false;
    details.innerHTML = `<strong>Altura:</strong> ${currentJaeger.avanzado.altura}<br>
                       <strong>Peso:</strong> ${currentJaeger.avanzado.peso}<br>
                       <strong>Armamento:</strong> ${currentJaeger.avanzado.armamento}<br>
                       <strong>Notas:</strong> ${currentJaeger.avanzado.notas}`;
    err.textContent = "";
  } else {
    err.textContent = "Código incorrecto";
    details.hidden = true;
  }
});
