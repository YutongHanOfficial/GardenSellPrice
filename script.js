const multipliers = {
  gold: 20,
  rainbow: 50,
  shocked: 100,
  frozen: 10,
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

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', calculatePrice);
  input.addEventListener('change', calculatePrice);
});

function calculatePrice() {
  let weight = parseFloat(document.getElementById('weight').value) || 0;
  let price = weight;

  for (const key in multipliers) {
    if (document.getElementById(key).checked) {
      price *= multipliers[key];
    }
  }

  document.getElementById('price').textContent = price.toFixed(2);
}
