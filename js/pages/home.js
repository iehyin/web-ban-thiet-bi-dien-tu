import { ProductCard } from '../components/ProductCard.js';

async function loadHomeProducts() {
  const bestsellerContainer = document.getElementById('bestseller-products');
  const newestContainer = document.getElementById('newest-products');

  try {
    const response = await fetch('../db.json');
    
    if (!response.ok) {
      throw new Error('Lỗi fetch API');
    }

    const products = await response.json();
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const renderList = (container) => {
      if (container) {
        container.innerHTML = products
          .map(item => ProductCard(item, wishlist.includes(item.id)))
          .join('');
      }
    };

    renderList(bestsellerContainer);
    renderList(newestContainer);

  } catch (error) {
    console.error('Không thể tải sản phẩm:', error);
    const errorMsg = '<p style="grid-column: 1/-1; color: red;">⚠️ Vui lòng bật JSON Server (http://localhost:3000/products) để xem sản phẩm!</p>';
    if (bestsellerContainer) bestsellerContainer.innerHTML = errorMsg;
    if (newestContainer) newestContainer.innerHTML = errorMsg;
  }
}

document.addEventListener('DOMContentLoaded', loadHomeProducts);  