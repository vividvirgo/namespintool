// NameSpinTool — app.js (supports custom list + single-name variations)

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

// Elements
const elGender = document.getElementById("gender");
const elRegion = document.getElementById("region");
const elFormat = document.getElementById("format");
const nameOut = document.getElementById("nameOut");
const metaOut = document.getElementById("metaOut");
const toast = document.getElementById("toast");

const customNamesEl = document.getElementById("customNames");
const baseNameEl = document.getElementById("baseName");
const variationListEl = document.getElementById("variationList");

const btnSpin = document.getElementById("btnSpin");
const btnAgain = document.getElementById("btnAgain");
const btnCopy = document.getElementById("btnCopy");
const btnRandomizeList = document.getElementById("btnRandomizeList");

const btnVariations = document.getElementById("btnVariations");
const btnUseVariation = document.getElementById("btnUseVariation");

function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }

// Toast
function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"), 1400);
}

// Custom list parsing
function parseCustomNames(){
  if(!customNamesEl) return [];
  const raw = customNamesEl.value || "";
  return raw
    .split(/[\n,]+/g)
    .map(s => s.trim())
    .filter(Boolean);
}

function pickCustomName(customList, format){
  const full = pick(customList);

  if(format === "full") return full;

  const parts = full.split(/\s+/).filter(Boolean);
  if(parts.length === 1) return full;

  if(format === "first") return parts[0];
  if(format === "last") return parts[parts.length - 1];
  return full;
}

// Built-in pools
function getFirstPool(gender, region){
  const g = gender === "any" ? (Math.random() < 0.5 ? "female" : "male") : gender;
  const r = region === "any" ? pick(["us","uk","latam","afr"]) : region;
  return { g, r, arr: pools.first[g][r] };
}

function getLastPool(region){
  const r = region === "any" ? pick(["us","uk","latam","afr"]) : region;
  return { r, arr: pools.last[r] };
}

// Main spin
function spin(){
  if(!elGender || !elRegion || !elFormat || !nameOut || !metaOut) return;

  const gender = elGender.value;
  const region = elRegion.value;
  const format = elFormat.value;

  // 1) Prefer custom list if provided
  const customList = parseCustomNames();
  if(customList.length > 0){
    const out = pickCustomName(customList, format);
    nameOut.textContent = out;
    metaOut.textContent = `Custom list • Format: ${format}`;
    return;
  }

  // 2) Fall back to built-in pools
  const first = getFirstPool(gender, region);
  const last = getLastPool(region);

  let out = "";
  if(format === "first") out = pick(first.arr);
  else if(format === "last") out = pick(last.arr);
  else out = `${pick(first.arr)} ${pick(last.arr)}`;

  nameOut.textContent = out;
  metaOut.textContent = `Gender: ${first.g} • Region: ${first.r.toUpperCase()} • Format: ${format}`;
}

// Clipboard copy with fallback
async function copy(){
  const text = (nameOut?.textContent || "").trim();
  if(!text || text === "—") return;

  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
      return;
    }
  }catch(e){
    // continue to fallback
  }

  // Fallback
  try{
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
  }catch(e){
    showToast("Copy failed");
  }
}

// Shuffle built-in pools (for variety)
function shuffleAll(){
  const shuffle = (arr) => arr.sort(()=>Math.random()-0.5);

  ["female","male"].forEach(g=>{
    ["us","uk","latam","afr"].forEach(r=>shuffle(pools.first[g][r]));
  });

  ["us","uk","latam","afr"].forEach(r=>shuffle(pools.last[r]));
  showToast("Name pool shuffled");
}

// ====== Single-name variations ======

function buildVariationsFromBase(base){
  const clean = (base || "").trim().replace(/\s+/g," ");
  if(!clean) return [];

  const parts = clean.split(" ");
  const first = parts[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1] : "";

  const f0 = first ? first[0].toUpperCase() : "";
  const l0 = last ? last[0].toUpperCase() : "";

  const combos = [];

  // Simple variations
  combos.push(clean);
  if(first && last) combos.push(`${first} ${last[0].toUpperCase()}.`);
  if(first && last) combos.push(`${f0}. ${last}`);
  if(first && last) combos.push(`${last}, ${first}`);
  if(first && last) combos.push(`${first}-${last}`);
  if(first && last) combos.push(`${first}_${last}`);
  if(first && last) combos.push(`${first}.${last}`);
  if(first && last) combos.push(`${first}${last}`);
  if(first && last) combos.push(`${first} ${last} Jr.`);
  if(first && last) combos.push(`${first} ${last} Sr.`);

  // “Gamer tag” style
  if(first) combos.push(`${first}X`);
  if(first) combos.push(`x${first}`);
  if(first && last) combos.push(`${first}${l0}`);
  if(first && last) combos.push(`${f0}${last}`);
  if(first && last) combos.push(`${first}_${l0}`);
  if(first) combos.push(`${first}_Official`);
  if(first) combos.push(`${first}_HQ`);
  if(first) combos.push(`Real${first}`);

  // Add a small number suffix (common style)
  const suffix = String(Math.floor(Math.random() * 900) + 100);
  if(first) combos.push(`${first}${suffix}`);
  if(first && last) combos.push(`${first}${last}${suffix}`);

  // De-dupe + cap
  const uniq = [...new Set(combos)].filter(Boolean);
  return uniq.slice(0, 18);
}

function renderVariations(list){
  if(!variationListEl) return;
  variationListEl.innerHTML = "";

  if(list.length === 0){
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "— No variations yet —";
    variationListEl.appendChild(opt);
    return;
  }

  list.forEach(v=>{
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    variationListEl.appendChild(opt);
  });
}

function generateVariations(){
  const base = (baseNameEl?.value || "").trim();
  if(!base){
    showToast("Type a name first");
    renderVariations([]);
    return;
  }
  const list = buildVariationsFromBase(base);
  renderVariations(list);
  showToast("Variations generated");
}

function useSelectedVariation(){
  const v = variationListEl?.value || "";
  if(!v){
    showToast("Select a variation");
    return;
  }
  if(nameOut) nameOut.textContent = v;
  if(metaOut) metaOut.textContent = "From variations • You can Copy it";
  showToast("Loaded into result");
}

// Wire up buttons safely
btnSpin?.addEventListener("click", spin);
btnAgain?.addEventListener("click", spin);
btnCopy?.addEventListener("click", copy);
btnRandomizeList?.addEventListener("click", shuffleAll);

btnVariations?.addEventListener("click", generateVariations);
btnUseVariation?.addEventListener("click", useSelectedVariation);

// Footer year
const yearEl = document.getElementById("year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

// First render
spin();

