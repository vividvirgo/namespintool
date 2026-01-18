const pools = {
  first: {
    female: {
      us: ["Ava","Mia","Olivia","Harper","Sofia","Ella","Chloe","Amelia"],
      uk: ["Isla","Freya","Evie","Poppy","Ruby","Millie","Elsie","Daisy"],
      latam: ["Camila","Valentina","Isabella","Sofía","Lucía","Mariana","Daniela","Renata"],
      afr: ["Amina","Zuri","Imani","Nia","Ayana","Sade","Kemi","Thandi"]
    },
    male: {
      us: ["Liam","Noah","Ethan","Mason","Logan","Lucas","Elijah","James"],
      uk: ["Oliver","George","Harry","Jack","Charlie","Alfie","Leo","Oscar"],
      latam: ["Mateo","Santiago","Sebastián","Nicolás","Diego","Emiliano","Julián","Adrián"],
      afr: ["Kwame","Kofi","Tariq","Idris","Jabari","Amari","Chike","Zuberi"]
    }
  },
  last: {
    us: ["Carter","Brooks","Morgan","Reed","Parker","Hayes","Bennett","Collins"],
    uk: ["Hughes","Clarke","Bennett","Taylor","Wright","Fletcher","Cooper","Harris"],
    latam: ["García","Rodríguez","López","Martínez","Hernández","Ramírez","Santos","Vega"],
    afr: ["Okafor","Mensah","Diallo","Ndlovu","Abebe","Mwangi","Kamara","Biko"]
  }
};

const elGender = document.getElementById("gender");
const elRegion = document.getElementById("region");
const elFormat = document.getElementById("format");
const nameOut = document.getElementById("nameOut");
const metaOut = document.getElementById("metaOut");
const toast = document.getElementById("toast");

function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

function getFirstPool(gender, region){
  const g = gender === "any" ? (Math.random() < 0.5 ? "female" : "male") : gender;
  const r = region === "any" ? pick(["us","uk","latam","afr"]) : region;
  return { g, r, arr: pools.first[g][r] };
}

function getLastPool(region){
  const r = region === "any" ? pick(["us","uk","latam","afr"]) : region;
  return { r, arr: pools.last[r] };
}

function spin(){
  const gender = elGender.value;
  const region = elRegion.value;
  const format = elFormat.value;

  const first = getFirstPool(gender, region);
  const last = getLastPool(region);

  let out = "";
  if(format === "first") out = pick(first.arr);
  else if(format === "last") out = pick(last.arr);
  else out = `${pick(first.arr)} ${pick(last.arr)}`;

  nameOut.textContent = out;
  metaOut.textContent = `Gender: ${first.g} • Region: ${first.r.toUpperCase()} • Format: ${format}`;
}

function copy(){
  const text = nameOut.textContent.trim();
  if(!text || text === "—") return;
  navigator.clipboard.writeText(text).then(() => showToast("Copied to clipboard"));
}

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"), 1400);
}

function shuffleAll(){
  const shuffle = (arr) => arr.sort(()=>Math.random()-0.5);
  ["female","male"].forEach(g=>{
    ["us","uk","latam","afr"].forEach(r=>shuffle(pools.first[g][r]));
  });
  ["us","uk","latam","afr"].forEach(r=>shuffle(pools.last[r]));
  showToast("Name pool shuffled");
}

document.getElementById("btnSpin").addEventListener("click", spin);
document.getElementById("btnAgain").addEventListener("click", spin);
document.getElementById("btnCopy").addEventListener("click", copy);
document.getElementById("btnRandomizeList").addEventListener("click", shuffleAll);

const yearEl = document.getElementById("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

// delightful first render
spin();
