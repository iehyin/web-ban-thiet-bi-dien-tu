/**
 * Component render Header dùng chung
 * @param {Object|null} user - Thông tin user (null nếu chưa đăng nhập)
 * @param {number} cartCount - Số lượng trong giỏ hàng
 * @param {number} wishlistCount - Số lượng yêu thích
 */
export function Header(user = null, cartCount = 0, wishlistCount = 0) {
  const isAuth = !!user;

  return `
    <header class="site-header">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="container top-bar-inner">
          <div class="top-bar-right">
            <span class="top-bar-item"><i class="fa-solid fa-bolt"></i> Giao nhanh 2H</span>
            <span class="top-bar-item"><i class="fa-solid fa-shield-halved"></i> Bảo hành 24T</span>
            <span class="top-bar-item font-bold"><i class="fa-solid fa-phone"></i> Hotline: 1900-6868</span>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <div class="main-header">
        <div class="container main-header-inner">
          <!-- Logo -->
          <a href="index.html" class="logo-wrapper">
            <div class="logo-icon">M</div>
            <div class="logo-text">
              <div class="logo-title">Novix</div>
              <div class="logo-subtitle">CHÍNH HÃNG 100%</div>
            </div>
          </a>

          <!-- Search Bar -->
          <div class="search-wrapper">
            <div class="search-category">
              <i class="fa-solid fa-border-all"></i>
              Tất cả danh mục
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <input type="text" class="search-input" placeholder="Tìm kiếm tai nghe, điện thoại, phụ kiện công nghệ...">
            <button class="btn-search"><i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm</button>
          </div>

          <!-- Actions -->
          <div class="header-actions">
            <a href="wishlist.html" class="action-btn">
              <i class="fa-regular fa-heart"></i>
              <span class="badge badge-red">${wishlistCount}</span>
            </a>
            <a href="cart.html" class="action-btn">
              <i class="fa-solid fa-bag-shopping"></i>
              <span class="badge badge-orange">${cartCount}</span>
            </a>

            <!-- User Auth Box -->
            <div class="user-action">
              ${
                isAuth 
                ? `
                  <div class="user-avatar"><i class="fa-solid fa-user"></i></div>
                  <div class="user-info">
                    <span class="user-name">${user.name || 'Thành viên'}</span>
                    <span class="user-role">VIP Member</span>
                  </div>
                  <button id="btn-logout" class="logout-link" title="Đăng xuất">
                    <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                  </button>
                `
                : `
                  <a href="auth.html" class="user-action">
                    <div class="user-avatar"><i class="fa-regular fa-user"></i></div>
                    <div class="user-info">
                      <span class="user-name">Tài khoản</span>
                      <span class="user-role">Đăng nhập / Đăng ký</span>
                    </div>
                  </a>
                `
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Bar -->
      <nav class="main-nav">
        <div class="container nav-inner">
          <a href="products.html" class="nav-item all-categories"><i class="fa-solid fa-bars"></i> Tất cả danh mục</a>
          <a href="index.html" class="nav-item active">Trang chủ</a>
          <a href="products.html" class="nav-item">Điện thoại & Tablet</a>
          <a href="products.html" class="nav-item">Laptop & Phụ kiện</a>
        </div>
      </nav>
    </header>
  `;
}

/**
 * Gắn sự kiện cho các nút tương tác trên Header (Ví dụ: Đăng xuất)
 */
export function bindHeaderEvents() {
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Xóa phiên đăng nhập khỏi LocalStorage
      localStorage.removeItem('currentUser');
      // Reload lại trang để cập nhật giao diện
      window.location.reload();
    });
  }
}