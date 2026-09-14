/**
 * Component render Header dùng chung
 * @param {Object} user - Thông tin user hiện tại (nếu đã đăng nhập)
 * @param {number} cartCount - Số lượng trong giỏ hàng
 * @param {number} wishlistCount - Số lượng yêu thích
 */
export function Header(user = { name: 'Nguyễn Hưng', role: 'VIP Member' }, cartCount = 4, wishlistCount = 3) {
  return `
    <header class="site-header">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="container top-bar-inner">
          <div class="top-bar-right">
            <span class="top-bar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Giao nhanh 2H
            </span>
            <span class="top-bar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Bảo hành 24T
            </span>
            <span class="top-bar-item font-bold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Hotline: 1900-6868
            </span>
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Tất cả danh mục
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <input type="text" class="search-input" placeholder="Tìm kiếm tai nghe, điện thoại, phụ kiện công nghệ...">
            <button class="btn-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Tìm kiếm
            </button>
          </div>

          <!-- Actions -->
          <div class="header-actions">
            <a href="wishlist.html" class="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span class="badge badge-red">${wishlistCount}</span>
            </a>
            <a href="cart.html" class="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span class="badge badge-orange">${cartCount}</span>
            </a>

            <!-- User Auth -->
            <div class="user-action">
              <div class="user-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div class="user-info">
                <span class="user-name">${user ? user.name : 'Khách'}</span>
                <span class="user-role">${user ? user.role : 'Đăng nhập'}</span>
              </div>
              ${user ? '<a href="#" class="logout-link">Đăng xuất</a>' : ''}
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Bar -->
      <nav class="main-nav">
        <div class="container nav-inner">
          <a href="#" class="nav-item all-categories">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            Tất cả danh mục
          </a>
          <a href="index.html" class="nav-item active">Trang chủ</a>
          <a href="#" class="nav-item">Điện thoại & Tablet</a>
          <a href="#" class="nav-item">Laptop & Phụ kiện</a>
          <a href="#" class="nav-item">Âm thanh Hi-Res</a>
          <a href="#" class="nav-item">Blog Công nghệ</a>
        </div>
      </nav>
    </header>
  `;
}