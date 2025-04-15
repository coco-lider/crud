let products = JSON.parse(localStorage.getItem('products')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const totalDisplay = document.getElementById('total');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = +document.getElementById('price').value;
  const quantity = +document.getElementById('quantity').value;
  const image = document.getElementById('image').value || 'https://via.placeholder.com/200';

  const product = { id: Date.now(), name, price, quantity, image };
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  form.reset();
  renderProducts();
});

function renderProducts() {
  productList.innerHTML = '';
  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>💵 ${prod.price} | 📦 ${prod.quantity} ta</p>
      <button onclick="addToCart(${prod.id})">Savatchaga qo‘shish</button>
      <button class="edit-btn" onclick="editProduct(${prod.id})">✏️</button>
      <button class="delete-btn" onclick="deleteProduct(${prod.id})">🗑️</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const prod = products.find(p => p.id === id);
  const item = cart.find(c => c.id === id);
  if (item) item.quantity++;
  else cart.push({ ...prod, quantity: 1 });

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} = $${item.price * item.quantity}`;
    cartList.appendChild(li);
  });
  totalDisplay.textContent = `Umumiy: $${total}`;
}

function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

function editProduct(id) {
  const prod = products.find(p => p.id === id);
  document.getElementById('name').value = prod.name;
  document.getElementById('price').value = prod.price;
  document.getElementById('quantity').value = prod.quantity;
  document.getElementById('image').value = prod.image;

  deleteProduct(id); // remove old one, add as new on submit
}

renderProducts();
renderCart();
