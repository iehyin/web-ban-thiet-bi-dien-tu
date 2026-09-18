import { Header, bindHeaderEvents } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { bindProductCardEvents } from './components/ProductCard.js'; // <-- Import hàm bắt sự kiện

document.addEventListener('DOMContentLoaded', () => {
  const appHeader = document.getElementById('app-header');
  
  if (appHeader) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let cartCount = 0;
    let wishlistCount = 0;

    // Chỉ đếm số lượng giỏ hàng/yêu thích nếu user ĐÃ ĐĂNG NHẬP
    if (user) {
      const userId = user.email;
      const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      const wishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || [];
      
      cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      wishlistCount = wishlist.length;
    }
    
    // Render HTML Header
    appHeader.innerHTML = Header(user, cartCount, wishlistCount);

    // Kích hoạt nút Đăng xuất trên Header
    bindHeaderEvents();
  }

  const appFooter = document.getElementById('app-footer');
  if (appFooter) {
    appFooter.innerHTML = Footer();
  }

  // KHỞI ĐỘNG LẮNG NGHE SỰ KIỆN CHO TẤT CẢ PRODUCT CARD (Giỏ hàng, Yêu thích)
  bindProductCardEvents();
});