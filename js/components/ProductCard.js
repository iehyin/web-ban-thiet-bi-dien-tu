/**
 * Component render Card Sản Phẩm chuẩn UI
 */
export function ProductCard(product, isWishlisted = false) {
  const { id, name, price, category, image, rating, reviewsCount = 412, isBestSeller = true } = product;
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(price) + 'đ';

  return `
    <div class="product-card" data-id="${id}">
      <!-- Thêm class 'detail-link' và xóa sự kiện onclick inline -->
      <div class="card-img-wrap detail-link" style="cursor: pointer;">
        ${isBestSeller ? '<span class="badge-bestseller">Bán Chạy</span>' : ''}
        
        <!-- Xóa sự kiện onclick="event.stopPropagation();" -->
        <button 
          class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
          data-id="${id}"
        >
          <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart" style="${isWishlisted ? 'color: #d32f2f;' : ''}"></i>
        </button>
        
        <img src="${image}" alt="${name}" loading="lazy" />
      </div>

      <div class="card-body">
        <span class="product-category">${category || 'THIẾT BỊ ĐEO'}</span>
        <h3 class="product-name">
          <a href="detail.html?id=${id}">${name}</a>
        </h3>
        
        <div class="product-rating">
          <span class="star"><i class="fa-solid fa-star"></i></span>
          <span class="rating-value">${rating ? Number(rating).toFixed(1) : '5.0'}</span>
          <span class="reviews-count">(${reviewsCount})</span>
        </div>

        <div class="product-price">${formattedPrice}</div>

        <button class="btn-add-cart" 
          data-id="${id}" 
          data-name="${name}" 
          data-price="${price}" 
          data-image="${image}"
        >
          <i class="fa-solid fa-cart-shopping"></i>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  `;
}

/**
 * Hàm phân luồng sự kiện tập trung (Event Delegation)
 */
export function bindProductCardEvents() {
  document.addEventListener('click', (e) => {
    
    // 1. NẾU CLICK VÀO NÚT YÊU THÍCH
    const btnWish = e.target.closest('.btn-wishlist');
    if (btnWish) {
      e.preventDefault(); 
      
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user) {
        alert("Vui lòng đăng nhập để sử dụng tính năng Yêu thích!");
        window.location.href = 'auth.html';
        return;
      }

      const userId = user.email;
      const wlKey = `wishlist_${userId}`;
      let wishlist = JSON.parse(localStorage.getItem(wlKey)) || [];
      const id = btnWish.dataset.id;

      if (wishlist.includes(id)) {
        // Hủy yêu thích
        wishlist = wishlist.filter(itemId => itemId !== id);
        btnWish.classList.remove('active');
        btnWish.innerHTML = '<i class="fa-regular fa-heart"></i>';
      } else {
        // Thêm yêu thích
        wishlist.push(id);
        btnWish.classList.add('active');
        btnWish.innerHTML = '<i class="fa-solid fa-heart" style="color: #d32f2f;"></i>';
      }

      localStorage.setItem(wlKey, JSON.stringify(wishlist));

      // Cập nhật số lượng trên Header
      const wishlistBadge = document.querySelector('.badge-red');
      if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
      }
      return; // Dừng lại ở đây, không chạy tiếp xuống phần chuyển trang
    }

    // 2. NẾU CLICK VÀO NÚT THÊM GIỎ HÀNG
    const btnCart = e.target.closest('.btn-add-cart');
    if (btnCart) {
      e.preventDefault();
      
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        window.location.href = 'auth.html';
        return;
      }

      const userId = user.email; 
      const cartKey = `cart_${userId}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const id = btnCart.dataset.id;
      const name = btnCart.dataset.name;
      const price = parseInt(btnCart.dataset.price);
      const image = btnCart.dataset.image;

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, image, quantity: 1 });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("Đã thêm sản phẩm vào giỏ hàng!");
      window.location.reload();
      return; // Dừng lại ở đây
    }

    // 3. NẾU CLICK VÀO HÌNH ẢNH SẢN PHẨM -> CHUYỂN SANG TRANG DETAIL
    const imgWrap = e.target.closest('.detail-link');
    if (imgWrap) {
      // Tìm id sản phẩm ở thẻ cha ngoài cùng (.product-card)
      const card = imgWrap.closest('.product-card');
      const id = card.dataset.id;
      window.location.href = `detail.html?id=${id}`;
    }
  });
}