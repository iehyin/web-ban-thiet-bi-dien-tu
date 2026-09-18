import { ProductCard } from '../components/ProductCard.js';

document.addEventListener('DOMContentLoaded', async () => {
  const detailContainer = document.getElementById('product-detail-container');
  
  // 1. Lấy ID sản phẩm từ URL Parameter
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    detailContainer.innerHTML = '<h3 style="text-align:center; padding: 40px; color: red;">⚠️ Không tìm thấy ID sản phẩm. Vui lòng quay lại Trang chủ.</h3>';
    return;
  }

  try {
    // 2. Fetch toàn bộ dữ liệu từ JSON Server[cite: 10]
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) throw new Error('Lỗi fetch dữ liệu');
    const products = await response.json();

    // 3. Tìm sản phẩm theo ID[cite: 10]
    const product = products.find(p => p.id === productId);

    if (!product) {
      detailContainer.innerHTML = '<h3 style="text-align:center; padding: 40px;">⚠️ Sản phẩm không tồn tại!</h3>';
      return;
    }

    // 4. Khởi tạo giá trị bổ sung[cite: 9]
    const originalPrice = product.price * 1.26;
    const fmtPrice = new Intl.NumberFormat('vi-VN').format(product.price) + 'đ';
    const fmtOldPrice = new Intl.NumberFormat('vi-VN').format(originalPrice.toFixed(0)) + 'đ';
    
    // Cập nhật Breadcrumb
    document.getElementById('bc-category').textContent = product.category;
    document.getElementById('bc-name').textContent = product.name;

    // Render HTML chi tiết[cite: 9]
    detailContainer.innerHTML = `
      <!-- TOP SECTION -->
      <div class="detail-top">
        <!-- Cột Trái: Ảnh -->
        <div class="product-gallery">
          <div class="main-image-wrap">
            <span class="badge-top-left"><i class="fa-solid fa-check-circle"></i> CHÍNH HÃNG 100% HI-RES</span>
            <span class="badge-discount">-26% OFF</span>
            <div class="action-top-right">
              <button class="icon-btn"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
              <button class="icon-btn" id="btn-toggle-wishlist"><i class="fa-regular fa-heart"></i></button>
            </div>
            <img src="${product.image}" alt="${product.name}">
          </div>
          <!-- Thumbnails -->
          <div class="thumbnail-list">
            <div class="thumb-item active"><img src="${product.image}"></div>
            <div class="thumb-item"><img src="${product.image}?rnd=1"></div>
            <div class="thumb-item"><img src="${product.image}?rnd=2"></div>
            <div class="thumb-item"><img src="${product.image}?rnd=3"></div>
          </div>
        </div>

        <!-- Cột Phải: Thông tin -->
        <div class="product-info-wrap">
          <div class="info-header">
            <span class="brand-tag">${product.category.toUpperCase()} HI-RES</span>
            <span class="share-btn"><i class="fa-solid fa-share-nodes"></i> Chia sẻ</span>
          </div>

          <h1 class="pd-title">${product.name} - Đỉnh cao công nghệ 2026</h1>
          
          <div class="pd-rating">
            <span class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></span>
            <strong>${product.rating || '4.9'}</strong>
            <span class="divider-dot"></span>
            <span>348 đánh giá thực tế</span>
            <span class="divider-dot"></span>
            <span>1.2k đã bán thành công</span>
          </div>

          <div class="pd-price-box">
            <span class="price-current">${fmtPrice}</span>
            <span class="price-old">${fmtOldPrice}</span>
            <div class="reward-text"><i class="fa-solid fa-circle-check"></i> Tích lũy +4.250 điểm ElectroPoint cho tài khoản VIP</div>
          </div>

          <p class="pd-desc">
            Trang bị công nghệ chống ồn chủ động Hybrid Active Noise Cancellation loại bỏ đến 98% tiếng ồn xung quanh. Màng loa Titanium cao cấp cho âm trầm uy lực. Thời lượng pin cực khủng lên đến 65 giờ liên tục cùng tính năng sạc nhanh.
          </p>

          <!-- Options -->
          <div>
            <span class="option-label">Màu sắc: <strong>Xanh Indigo</strong></span>
            <div class="option-group">
              <div class="opt-box active"><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-check"></i> Xanh Indigo</div>
              <div class="opt-box"><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-check"></i> Đen Nhám</div>
              <div class="opt-box"><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-check"></i> Bạc Ánh Kim</div>
            </div>
            
            <span class="option-label">Gói bảo hành ElectroCare:</span>
            <div class="option-group">
              <div class="opt-box active" style="flex-direction:column; align-items:flex-start;">
                <div><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-check"></i> <strong>Gói Cơ Bản (12 Tháng)</strong></div>
                <span style="font-size:11px; font-weight:400;">Bảo hành linh kiện miễn phí</span>
              </div>
              <div class="opt-box" style="flex-direction:column; align-items:flex-start;">
                <div><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-check"></i> <strong>Gói VIP Care (24 Tháng)</strong></div>
                <span style="font-size:11px; font-weight:400; color:#ea580c;">+99.000đ</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="action-row">
            <div class="qty-selector">
              <button class="qty-btn" id="btn-minus"><i class="fa-solid fa-minus"></i></button>
              <input type="number" class="qty-input" id="input-qty" value="1" min="1" max="10">
              <button class="qty-btn" id="btn-plus"><i class="fa-solid fa-plus"></i></button>
            </div>
            <span class="stock-status"><i class="fa-solid fa-box-open"></i> Còn 48 sản phẩm sẵn sàng bàn giao</span>
          </div>

          <div class="btn-group">
            <button class="btn-add" id="btn-add-cart"><i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng</button>
            <button class="btn-buy"><i class="fa-solid fa-bolt"></i> MUA NGAY (Giao nhanh 2H)</button>
          </div>

          <!-- Quà tặng & Giao hàng -->
          <div class="promo-box">
            <i class="fa-solid fa-gift promo-icon"></i>
            <div class="promo-text">
              <strong>Ưu đãi quà tặng kèm VIP: Trị giá 350.000đ</strong>
              <p><i class="fa-solid fa-circle-dot" style="font-size:8px;"></i> Tặng ngay: Bao da chống sốc cao cấp & Dây cáp audio 3.5mm mạ vàng 24K truyền dẫn không nén.</p>
            </div>
          </div>
          
          <div class="delivery-box">
            <div><span><i class="fa-solid fa-location-dot"></i> Giao đến: <strong>Hoàn Kiếm, Hà Nội</strong></span> <a href="#" style="color:#1e3a8a;">Thay đổi</a></div>
            <div><span>Dự kiến nhận hàng: Hôm nay, trước 17:30</span> <strong style="color:#16a34a;">Miễn phí 100%</strong></div>
          </div>
        </div>
      </div>

      <!-- BOTTOM SECTION (TABS CÓ THỂ CHUYỂN ĐỔI) -->
      <div class="detail-bottom">
        <div class="tabs-header">
          <div class="tab-link active" data-tab="specs"><i class="fa-solid fa-sliders"></i> Thông số kỹ thuật</div>
          <div class="tab-link" data-tab="description"><i class="fa-regular fa-file-lines"></i> Mô tả chi tiết & Tính năng</div>
          <div class="tab-link" data-tab="reviews"><i class="fa-regular fa-star"></i> Đánh giá khách hàng (348)</div>
        </div>
        
        <!-- Tab 1: Thông số kỹ thuật -->
        <div class="tab-pane active" id="tab-specs">
          <h3 style="margin-bottom:16px;">Bảng đặc tả kỹ thuật chi tiết</h3>
          <table class="specs-table">
            <tr><td>Chuẩn kết nối Bluetooth</td><td>Bluetooth 5.4 Ultra-Low Latency (38ms)</td></tr>
            <tr><td>Màng loa (Driver Size)</td><td>40mm Dynamic Titanium Driver</td></tr>
            <tr><td>Hiệu suất chống ồn ANC</td><td>Hybrid ANC lên đến -42dB</td></tr>
            <tr><td>Thời lượng pin phát nhạc</td><td>65 giờ (ANC Off) / 45 giờ (ANC On)</td></tr>
            <tr><td>Cổng sạc & Thời gian sạc</td><td>USB Type-C (Sạc đầy trong 1.5 giờ)</td></tr>
            <tr><td>Trọng lượng</td><td>250g (Siêu nhẹ, không mỏi)</td></tr>
          </table>
        </div>

        <!-- Tab 2: Mô tả chi tiết -->
        <div class="tab-pane" id="tab-description">
          <h3 style="margin-bottom:16px;">Mô tả sản phẩm & Tính năng nổi bật</h3>
          <div class="tab-content-text">
            <p><strong>${product.name}</strong> mang đến trải nghiệm âm thanh chân thực đỉnh cao nhờ trang bị chip xử lý âm thanh thế hệ mới nhất 2026.</p>
            <ul>
              <li><strong>Công nghệ chống ồn ANC chủ động:</strong> Tự động điều chỉnh mức độ lọc ồn theo môi trường xung quanh.</li>
              <li><strong>Thiết kế ergonomic công thái học:</strong> Đệm tai bằng bọt nhớ bọc da cao cấp giúp đeo liên tục trong nhiều giờ mà không bị đau hay nóng tai.</li>
              <li><strong>Kết nối đa thiết bị:</strong> Dễ dàng chuyển đổi linh hoạt giữa điện thoại, laptop và máy tính bảng chỉ với một nút bấm.</li>
            </ul>
          </div>
        </div>

        <!-- Tab 3: Đánh giá khách hàng -->
        <div class="tab-pane" id="tab-reviews">
          <h3 style="margin-bottom:16px;">Đánh giá từ người mua hàng (348 lượt)</h3>
          <div class="reviews-container">
            <div class="review-item">
              <div class="review-header">
                <strong>Nguyễn Văn A</strong>
                <span class="review-stars">⭐⭐⭐⭐⭐</span>
              </div>
              <p class="review-text">Sản phẩm dùng rất êm, chống ồn đỉnh cao đúng như quảng cáo. Giao hàng 2H siêu nhanh luôn!</p>
              <span class="review-date">Đã mua ngày 10/05/2026</span>
            </div>
            <div class="review-item">
              <div class="review-header">
                <strong>Trần Thị B</strong>
                <span class="review-stars">⭐⭐⭐⭐⭐</span>
              </div>
              <p class="review-text">Pin trâu thật sự, mình dùng cả tuần chưa cần sạc lại. Rất đáng tiền trong tầm giá.</p>
              <span class="review-date">Đã mua ngày 02/05/2026</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // 5. XỬ LÝ SỰ KIỆN CHUYỂN TABS (Thông số / Mô tả / Đánh giá)
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
      link.addEventListener('click', function() {
        const targetTab = this.dataset.tab;

        // Bỏ active ở tất cả các tab-link & tab-pane
        tabLinks.forEach(l => l.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Thêm active cho tab được bấm
        this.classList.add('active');
        document.getElementById(`tab-${targetTab}`).classList.add('active');
      });
    });

    // 6. XỬ LÝ NÚT TĂNG GIẢM SỐ LƯỢNG & OPTION SELECT
    const qtyInput = document.getElementById('input-qty');
    document.getElementById('btn-plus').addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    document.getElementById('btn-minus').addEventListener('click', () => {
      if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    });

    document.querySelectorAll('.opt-box').forEach(box => {
      box.addEventListener('click', function() {
        Array.from(this.parentNode.children).forEach(sibling => sibling.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // 7. XỬ LÝ THÊM VÀO GIỎ HÀNG (Yêu cầu đăng nhập & lưu theo user)
    document.getElementById('btn-add-cart').addEventListener('click', () => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (!user) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        window.location.href = 'auth.html';
        return;
      }

      const userId = user.email;
      const cartKey = `cart_${userId}`;
      const quantity = parseInt(qtyInput.value);
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        });
      }
      
      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
      window.location.reload();
    });

    // 8. RENDER SẢN PHẨM TƯƠNG TỰ (LẤY ĐỦ 4 SẢN PHẨM)
    const relatedContainer = document.getElementById('related-products');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let wishlist = [];
    if (user) {
      wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];
    }
    
    // Lấy 4 sản phẩm cùng Category (loại trừ chính nó)
    let relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);
    
    // Nếu không đủ 4 sản phẩm cùng danh mục thì lấy thêm các sản phẩm khác cho đủ 4
    if (relatedProducts.length < 4) {
      const remaining = products.filter(p => p.id !== product.id && !relatedProducts.includes(p));
      relatedProducts = [...relatedProducts, ...remaining];
    }

    const displayProducts = relatedProducts.slice(0, 4);

    relatedContainer.innerHTML = displayProducts
      .map(item => ProductCard(item, wishlist.includes(item.id)))
      .join('');

  } catch (error) {
    console.error('Lỗi trang Detail:', error);
    detailContainer.innerHTML = `<h3 style="color:red; text-align:center;">Lỗi kết nối Server: ${error.message}</h3>`;
  }
});