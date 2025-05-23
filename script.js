// Base price per kg for each crop (adjust these to in-game values)
const basePrices = {
  carrot:      1.00,  // unused by carrot special code
  strawberry:  1.00,
  blueberry:   1.50,
  orangeTulip: 1.50,
  tomato:      2.00,
  corn:        2.00,
  daffodil:    2.00,
  raspberry:   2.00,
  watermelon:  3.00,
  pumpkin:     3.00,
  apple:       3.00,
  bamboo:      3.00,
  coconut:     4.00,
  cactus:      4.00,
  dragonFruit: 4.00,
  mango:       4.00,
  peach:       4.00,
  pineapple:   4.00,
  grape:       5.00,
  mushroom:    5.00,
  pepper:      5.00,
  cacao:       5.00,
  beanstalk:   10.00
};

const multipliers = {
  gold:     20,
  rainbow:  50,
  shocked:  100,
  frozen:   10,
  bloodlit: 4
};

function handleExclusive(selected) {
  if (selected === 'gold' && gold.checked) rainbow.checked = false;
  if (selected === 'rainbow' && rainbow.checked) gold.checked = false;
  calculatePrice();
}

// Grab elements once
const cropSelect  = document.getElementById('crop');
const weightInput = document.getElementById('weight');
const priceOutput = document.getElementById('price');
const gold        = document.getElementById('gold');
const rainbow     = document.getElementById('rainbow');

// Listen for any changes
Array.from(document.querySelectorAll('input, select'))
     .forEach(el => {
       el.addEventListener('input', calculatePrice);
       el.addEventListener('change', calculatePrice);
     });

function calculatePrice() {
  const crop   = cropSelect.value;
  const weight = parseFloat(weightInput.value) || 0;
  let price;

  if (crop === 'carrot') {
    // piecewise carrot pricing:
    if (weight < 0.27) {
      price = 18;
    } else {
      const raw = 172.7 * weight - 26.6;
      price = Math.floor(raw + 0.5);
    }
  } else {
    // simple linear rule for others:
    price = basePrices[crop] * weight;
    price = Math.floor(price + 0.5);
  }

  // apply mutations
  for (let mut in multipliers) {
    if (document.getElementById(mut).checked) {
      price *= multipliers[mut];
    }
  }

  // final is whole sheckles
  priceOutput.textContent = Math.round(price);
}

// initialize
calculatePrice();
