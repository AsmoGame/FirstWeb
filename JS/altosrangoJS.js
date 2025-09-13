const ALTOSMANDOS = [
  {cargo:"Mariscal", nombre:"Stacker Pentecost", edad:"57", nacionalidad:"Estadounidense", codigo:"PX-ADM-1001", info:"Líder supremo del PPDC, experiencia en combate Jaeger y estrategia global."},
  {cargo:"Comandante", nombre:"Herc Hansen", edad:"48", nacionalidad:"Estadounidense", codigo:"PX-ADM-1002", info:"Responsable de operaciones terrestres y marítimas, coordinación de misiones Jaeger."},
  {cargo:"Jefa Área Científica", nombre:"Dr. Newton Geiszler", edad:"39", nacionalidad:"Estadounidense", codigo:"PX-ADM-1003", info:"Experta en Kaiju y tecnología Jaeger, lidera investigaciones y desarrollo de armas."},
  {cargo:"Jefe Mecánicos", nombre:"Chuck Hansen", edad:"41", nacionalidad:"Estadounidense", codigo:"PX-ADM-1004", info:"Encargado del mantenimiento y mejoras de Jaegers, supervisión de taller mecánico."},
  {cargo:"Coordinador Comunicaciones", nombre:"Miles", edad:"34", nacionalidad:"Estadounidense", codigo:"PX-ADM-1005", info:"Responsable de comunicaciones y coordinación de pilotos durante misiones."},
  {cargo:"Oficial Inteligencia", nombre:"Hannibal Chau", edad:"42", nacionalidad:"Chino", codigo:"PX-ADM-1006", info:"Manejo de información Kaiju, análisis de amenazas y seguridad estratégica."}
];

const carousel=document.getElementById('carousel');
let angle=0;

ALTOSMANDOS.forEach((mando,i)=>{
  const card=document.createElement('div');
  card.className='card';
  card.innerHTML=`
    <div class="thumb"><img src="https://via.placeholder.com/300x140?text=${encodeURIComponent(mando.nombre)}" alt="${mando.nombre}"></div>
    <h3>${mando.nombre}</h3>
    <div class="badge">${mando.cargo}</div>
    <div class="meta">${mando.nacionalidad} | Edad: ${mando.edad}</div>
  `;
  card.addEventListener('click',()=>{
    document.getElementById('modal').classList.add('show');
    document.getElementById('modalTitle').textContent=mando.nombre;
    document.getElementById('details').innerHTML=`
      <strong>Cargo:</strong> ${mando.cargo}<br>
      <strong>Edad:</strong> ${mando.edad}<br>
      <strong>Nacionalidad:</strong> ${mando.nacionalidad}<br>
      <strong>Información adicional:</strong> ${mando.info}<br>
      <strong>Código de acceso:</strong> ${mando.codigo}
    `;
  });
  carousel.appendChild(card);
});

function rotateCarousel(){
  const cards=document.querySelectorAll('.carousel .card');
  const num=cards.length;
  const theta=360/num;
  cards.forEach((card,i)=>{
    const a=(i*theta + angle)%360;
    card.style.transform=`rotateY(${a}deg) translateZ(500px)`;
  });
}
rotateCarousel();

document.getElementById('prev').addEventListener('click',()=>{
  angle-=60;
  rotateCarousel();
});
document.getElementById('next').addEventListener('click',()=>{
  angle+=60;
  rotateCarousel();
});

const modal=document.getElementById('modal');
document.getElementById('closeX').addEventListener('click',()=>modal.classList.remove('show'));
document.getElementById('scrim').addEventListener('click',()=>modal.classList.remove('show'));