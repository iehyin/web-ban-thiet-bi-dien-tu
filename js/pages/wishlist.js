import { ProductCard } from '../components/ProductCard.js';

document.addEventListener('DOMContentLoaded', async () => {
  const wishlistGrid = document.getElementById('wishlist-grid');
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // Kiểm tra đăng nhập
  if (!user) {
    renderEmptyWishlist("Vui lòng đăng nhập để xem Sản phẩm yêu thích.");
    return;
  }

  const userId = user.email;
  const wlKey = `wishlist_${userId}`;
  let wishlistIds = JSON.parse(localStorage.getItem(wlKey)) || [];

  if (wishlistIds.length === 0) {
    renderEmptyWishlist("Bạn chưa lưu sản phẩm nào vào mục Yêu thích.");
    return;
  }

  let favoritedProducts = [];

  try {
    // Gọi API lấy toàn bộ sản phẩm
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) throw new Error('Không thể tải dữ liệu');
    const allProducts = await response.json();

    // Lọc ra các sản phẩm có ID nằm trong danh sách wishlistIds
    favoritedProducts = allProducts.filter(p => wishlistIds.includes(p.id));

    renderWishlistProducts();

  } catch (error) {
    wishlistGrid.innerHTML = `<h3 style="color:red; grid-column:1/-1; text-align:center;">Lỗi tải dữ liệu. Vui lòng bật JSON Server!</h3>`;
  }

  // --- HÀM RENDER ---
  function renderWishlistProducts() {
    document.getElementById('bc-wishlist-count').textContent = favoritedProducts.length;

    if (favoritedProducts.length === 0) {
      renderEmptyWishlist("Bạn chưa lưu sản phẩm nào vào mục Yêu thích.");
      return;
    }

    // Render bằng ProductCard (truyền tham số isWishlisted = true để tim đỏ bừng lên)
    wishlistGrid.innerHTML = favoritedProducts.map(item => ProductCard(item, true)).join('');
  }

  // --- SỰ KIỆN NÚT "XÓA TẤT CẢ" ---
  document.getElementById('btn-clear-wishlist').addEventListener('click', () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ sản phẩm yêu thích?")) {
      localStorage.setItem(wlKey, JSON.stringify([]));
      favoritedProducts = [];
      renderWishlistProducts();
      
      // Update badge Header
      const headerBadge = document.querySelector('.badge-red');
      if (headerBadge) headerBadge.textContent = 0;
    }
  });

  // --- SỰ KIỆN NÚT "THÊM TẤT CẢ VÀO GIỎ" ---
  document.getElementById('btn-add-all-cart').addEventListener('click', () => {
    if (favoritedProducts.length === 0) return;

    const cartKey = `cart_${userId}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Lặp qua từng sản phẩm yêu thích để thêm vào giỏ
    favoritedProducts.forEach(prod => {
      const existingItem = cart.find(item => item.id === prod.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: prod.id,
          name: prod.name,
          price: prod.price,
          image: prod.image,
          quantity: 1
        });
      }
    });

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`Đã thêm thành công ${favoritedProducts.length} sản phẩm vào Giỏ hàng!`);
    window.location.reload(); // Reload để update badge giỏ hàng trên Header
  });

  // --- HÀM RENDER KHI TRỐNG ---
  function renderEmptyWishlist(message) {
    document.getElementById('bc-wishlist-count').textContent = "0";
    wishlistGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-regular fa-heart fa-3x" style="color: #cbd5e1; margin-bottom: 16px;"></i>
        <h3 style="color: #475569; margin-bottom: 24px;">${message}</h3>
        <a href="products.html" class="btn-action primary" style="display:inline-flex; text-decoration:none;">Bắt đầu khám phá</a>
      </div>
    `;
  }
});