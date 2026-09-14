import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Header và lấy dữ liệu thật từ LocalStorage
  const appHeader = document.getElementById('app-header');
  if (appHeader) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Tính tổng số lượng sản phẩm trong giỏ
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    appHeader.innerHTML = Header(user, cartCount, wishlist.length);
  }

  // 2. Render Footer
  const appFooter = document.getElementById('app-footer');
  if (appFooter) {
    appFooter.innerHTML = Footer();
  }
});