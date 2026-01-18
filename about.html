// NameSpinTool — app.js (safe + robust)

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

// Helpers
const $ = (id) => document.getElementById(id);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const elGender = $("gender");
const elRegion = $("region");
const elFormat = $("format");
const nameOut = $("nameOut");
const metaOut = $("metaOut");
const toast = $("toast");

function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"), 1400);
}

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
  if(!elGender || !elRegion || !elFormat || !nameOut || !metaOut) return;

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

async function copy(){
  if(!nameOut) return;

  const text = nameOut.textContent.trim();
  if(!text || text === "—") return;

  // Prefer modern clipboard API
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
      return;
    }
  } catch (_) {}

  // Fallback copy method
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("Copied to clipboard");
  } catch (e) {
    showToast("Copy failed");
  }
}

function shuffleAll(){
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  ["female","male"].forEach(g=>{
    ["us","uk","latam","afr"].forEach(r=>shuffle(pools.first[g][r]));
  });
  ["us","uk","latam","afr"].forEach(r=>shuffle(pools.last[r]));

  showToast("Name pool shuffled");
}

// Wire up buttons safely
const btnSpin = $("btnSpin");
const btnAgain = $("btnAgain");
const btnCopy = $("btnCopy");
const btnRandomizeList = $("btnRandomizeList");

if(btnSpin) btnSpin.addEventListener("click", spin);
if(btnAgain) btnAgain.addEventListener("click", spin);
if(btnCopy) btnCopy.addEventListener("click", copy);
if(btnRandomizeList) btnRandomizeList.addEventListener("click", shuffleAll);

// Footer year
const yearEl = $("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

// First render
spin();
