document.addEventListener('DOMContentLoaded', () => {
    const chocolatesContainer = document.getElementById('chocolates-container');
    const totalPriceElement = document.getElementById('total-price');
  
    async function fetchChocolates() {
      const response = await fetch('/api/chocolates');
      const chocolates = await response.json();
      displayChocolates(chocolates);
    }
  
    function displayChocolates(chocolates) {
      chocolates.forEach((chocolate) => {
        const card = createChocolateCard(chocolate);
        chocolatesContainer.appendChild(card);
      });
    }
  
    function createChocolateCard(chocolate) {
      const card = document.createElement('div');
      card.classList.add('chocolate-card');
  
      const name = document.createElement('h3');
      name.textContent = chocolate.name;
      card.appendChild(name);
  
      const price = document.createElement('p');
      price.textContent = `$${chocolate.price.toFixed(2)}`;
      card.appendChild(price);
  
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = 0;
      quantityInput.value = 0;
      quantityInput.addEventListener('input', () => calculateTotalPrice());
      card.appendChild(quantityInput);
  
      return card;
    }
  
    async function calculateTotalPrice() {
      const selectedChocolates = getSelectedChocolates();
      const response = await fetch('/api/calculatePrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedChocolates }),
      });
      const { totalPrice } = await response.json();
      totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
  
    function getSelectedChocolates() {
      const chocolateCards = document.getElementsByClassName('chocolate-card');
      const selectedChocolates = [];
  
      for (const card of chocolateCards) {
        const quantityInput = card.querySelector('input');
        const quantity = parseInt(quantityInput.value, 10);
  
        if (quantity > 0) {
          const chocolateId = card.dataset.chocolateId;
          selectedChocolates.push({ id: chocolateId, quantity });
        }
      }
  
      return selectedChocolates;
    }
  
    fetchChocolates();
  });
  