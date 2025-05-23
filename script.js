// Per-kg rates (š per kg), plus the special carrot piecewise
const PRICE_PER_KG = {
  carrot:      null,   // handled by piecewise below
  strawberry:  65,
  blueberry:   120,
  orangeTulip: 19000,
  daffodil:    5800,
  // all others fall back to basePrices if you prefer, or you can add more here
  tomato:      2000,   // example: 2 š/g → 2000 š/kg
  corn:        2000,
  raspberry:   2000,
  watermelon:  3000,
  pumpkin:     3000,
  apple:       3000,
  bamboo:      3000,
  coconut:     4000,
  cactus:      4000,
  dragonFruit: 4000,
  mango:       4000,
  peach:       4000,
  pineapple:   4000,
  grape:       5000,
  mushroom:    5000,
  pepper:      5000,
  cacao:       5000,
  beanstalk:   10000
};

const multipliers = {
  gold:     20,
  rainbow:  50,
  shocked:  100,
  frozen:   10,
  bloodlit: 4
};

// grab elements
const cropSelect  = document.getElementById('crop');
const weightInput = document.getElementById('weight');
const priceOutput = document.getElementById('price');
const gold        = document.getElementById('gold');
const rainbow     = document.getElementById('rainbow');

// mutually-exclusive gold/rainbow
function handleExclusive(selected) {
  if (selected === 'gold'   && gold.checked)    rainbow.checked = false;
  if (selected === 'rainbow'&& rainbow.checked) gold.checked    = false;
  calculatePrice();
}

// listen for changes
Array.from(document.querySelectorAll('input, select')).forEach(el => {
  el.addEventListener('input', calculatePrice);
  el.addEventListener('change', calculatePrice);
});

function calculatePrice() {
  const crop   = cropSelect.value;
  const w      = parseFloat(weightInput.value) || 0;
  let price;

  if (crop === 'carrot') {
    // carrot piecewise rule
    if (w < 0.27) {
      price = 18;
    } else {
      const raw = 172.7 * w - 26.6;
      price = Math.floor(raw + 0.5);
    }
  } else {
    // linear per-kg for everything else
    const rate = PRICE_PER_KG[crop] ?? 0;
    price = Math.floor(rate * w + 0.5);
  }

  // apply mutations
  for (let mut in multipliers) {
    if (document.getElementById(mut).checked) {
      price *= multipliers[mut];
    }
  }

  // final integer
  priceOutput.textContent = Math.round(price);
}

// init
calculatePrice();
