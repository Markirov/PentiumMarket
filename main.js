import './style.css';
import { products } from './data.js';

console.log('REBOOT App Started');

const productsGrid = document.getElementById('products-grid');
let cart = [];

function renderProducts(items) {
  productsGrid.innerHTML = '';
  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="torn-top"></div>
      <img class="photo" src="${product.image}" alt="${product.name}">
      <div class="info">
        <span class="condition">${product.condition}</span>
        <h3>${product.name}</h3>
        <p class="desc">${product.description}</p>
        <div class="price-row">
          <span class="price">${product.price}€</span>
          ${product.oldPrice ? `<span class="price-old">${product.oldPrice}€</span>` : ''}
        </div>
        <button class="add-to-cart" data-id="${product.id}">Añadir al interés</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });

  // Attach event listeners
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const product = products.find(p => p.id === id);
      if (product && !cart.some(p => p.id === id)) {
        cart.push(product);
        updateCartUI();
        e.target.textContent = 'Añadido ✔';
        e.target.style.background = 'var(--trust-green)';
      }
    });
  });
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = `(${cart.length})`;
  
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  let total = 0;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>No has añadido ninguna pieza todavía.</p>';
  } else {
    cart.forEach(item => {
      total += item.price;
      cartItemsContainer.innerHTML += `
        <div style="display: flex; justify-content: space-between; padding: 10px; background: #fff; border: 1px solid var(--paper-2); border-radius: 4px;">
          <div>
            <strong>${item.name}</strong>
            <div style="font-size: 13px; color: var(--trust-green);">${item.condition}</div>
          </div>
          <div style="font-weight: bold;">${item.price}€</div>
        </div>
      `;
    });
  }
  
  document.getElementById('cart-total').textContent = `${total}€`;
}

// Modal logic
const cartModal = document.getElementById('cart-modal');
document.getElementById('cart-button').addEventListener('click', () => {
  cartModal.style.display = 'flex';
});

document.getElementById('close-modal').addEventListener('click', () => {
  cartModal.style.display = 'none';
});

cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) cartModal.style.display = 'none';
});

// Checkout logic
document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert('Añade alguna pieza a tu interés primero.');
    return;
  }
  
  const name = document.getElementById('name').value;
  alert(`¡Gracias ${name}! Tu solicitud por ${cart.length} piezas ha sido enviada. Nos pondremos en contacto contigo pronto.`);
  
  // Reset
  cart = [];
  updateCartUI();
  cartModal.style.display = 'none';
  e.target.reset();
  
  // Reset buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.textContent = 'Añadir al interés';
    btn.style.background = 'var(--pcb-dark)';
  });
});

renderProducts(products);
updateCartUI();

