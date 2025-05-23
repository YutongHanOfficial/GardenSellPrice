// Per-kg rates (š per kg) and carrot piecewise
const PRICE_PER_KG = {
  carrot:      null,
  strawberry:  65,
  blueberry:   120,
  orangeTulip: 19000,
  daffodil:    5800,
  tomato:      2000,
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

// all mutation multipliers
const multipliers = {
  gold:       20,
  rainbow:    50,
  shocked:   100,
  wet:         2,
  chilled:     2,
  frozen:     10,
  bloodlit:    4,
  chocolate:   2,
  moonlit:     2,
  zombified:  25,
  celestial: 120,
  disco:     125
};

// groups for mutual-exclusivity
const exclusives = {
  // only one of these at a time
  gold:    ['gold','rainbow'],
  rainbow: ['gold','rainbow'],
  // only one of wet, chilled, frozen
  wet:     ['wet','chilled','frozen'],
  chilled: ['wet','chilled','frozen'],
  frozen:  ['wet','chilled','frozen']
};

// grab elements
const cropSelect  = document.getElementById('crop');
const weightInput = document.getElementById('weight');
const priceOutput = document.getElementById('price');

// handler to enforce exclusivity
function handleExclusive(selected) {
  const group = exclusives[selected];
  if (!group) return;
  const me = document.getElementById(selected).checked;
  if (!me) return;
  group.forEach(id => {
    if (id !== selected) {
      document.getElementById(id).checked = false;
    }
  });
  calculatePrice();
}

// listen for changes
document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input',  calculatePrice);
  el.addEventListener('change', calculatePrice);
});

function calculatePrice() {
  const crop = cropSelect.value;
  const w    = parseFloat(weightInput.value) || 0;
  let price;

  if (crop === 'carrot') {
    // carrot piecewise
    price = w < 0.27
      ? 18
      : Math.floor(172.7 * w - 26.6 + 0.5);
  } else {
    const rate = PRICE_PER_KG[crop] || 0;
    price = Math.floor(rate * w + 0.5);
  }

  // apply every checked mutation
  for (let mut in multipliers) {
    if (document.getElementById(mut).checked) {
      price *= multipliers[mut];
    }
  }

  priceOutput.textContent = Math.round(price);
}

// initialize
calculatePrice();
