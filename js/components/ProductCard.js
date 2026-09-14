/**
 * Component render Card Sản Phẩm chuẩn UI
 * @param {Object} product - Đối tượng sản phẩm từ JSON Server (hoặc API)[cite: 1]
 * @param {boolean} isWishlisted - Trạng thái đã thêm vào yêu thích hay chưa[cite: 1]
 */
export function ProductCard(product, isWishlisted = false) {
  const { id, name, price, category, image, rating, reviewsCount = 412, isBestSeller = true } = product;

  // Định dạng giá tiền VNĐ (VD: 1.490.000đ)
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(price) + 'đ';

  return `
    <div class="product-card" data-id="${id}">
      <!-- Phần Hình ảnh & Badges -->
      <div class="card-img-wrap">
        ${isBestSeller ? '<span class="badge-bestseller">Bán Chạy</span>' : ''}
        <button 
          class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
          data-id="${id}" 
          aria-label="Yêu thích"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? '#d32f2f' : 'none'}" stroke="${isWishlisted ? '#d32f2f' : '#666'}" stroke-width="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        <img src="${image}" alt="${name}" loading="lazy" />
      </div>

      <!-- Phần Nội dung -->
      <div class="card-body">
        <span class="product-category">${category || 'THIẾT BỊ ĐEO'}</span>
        <h3 class="product-name">
          <a href="detail.html?id=${id}">${name}</a>[cite: 1]
        </h3>
        
        <div class="product-rating">
          <span class="star">★</span>
          <span class="rating-value">${rating ? Number(rating).toFixed(1) : '5.0'}</span>
          <span class="reviews-count">(${reviewsCount})</span>
        </div>

        <div class="product-price">${formattedPrice}</div>

        <button class="btn-add-cart" data-id="${id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  `;
}