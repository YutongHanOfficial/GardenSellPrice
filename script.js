// Base price per kg for each crop (YOU: adjust these values to the real in-game rates)
const basePrices = {
  carrot:      1.00,
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
  if (selected === 'gold' && document.getElementById('gold').checked) {
    document.getElementById('rainbow').checked = false;
  }
  if (selected === 'rainbow' && document.getElementById('rainbow').checked) {
    document.getElementById('gold').checked = false;
  }
  calculatePrice();
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', calculatePrice);
  el.addEventListener('change', calculatePrice);
});

function calculatePrice() {
  const crop   = document.getElementById('crop').value;
  const weight = parseFloat(document.getElementById('weight').value) || 0;
  let price    = basePrices[crop] * weight;

  for (let mut in multipliers) {
    if (document.getElementById(mut).checked) {
      price *= multipliers[mut];
    }
  }

  document.getElementById('price').textContent = price.toFixed(2);
}

// Initialize display
calculatePrice();
