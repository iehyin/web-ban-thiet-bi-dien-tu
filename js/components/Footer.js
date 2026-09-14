/**
 * Component render Footer dùng chung cho toàn bộ trang web
 */
export function Footer() {
  return `
    <footer class="site-footer">
      <!-- Main Footer -->
      <div class="footer-main">
        <div class="container footer-grid">
          
          <!-- Cột 1: Thông tin thương hiệu -->
          <div class="footer-col brand-info">
            <a href="index.html" class="logo-wrapper">
              <div class="logo-icon">M</div>
              <div class="logo-text">
                <div class="logo-title">Novix</div>
              </div>
            </a>
            <p class="brand-desc">
              Hệ thống bán lẻ thiết bị công nghệ chính hãng hàng đầu Việt Nam. Cam kết 100% sản phẩm nguồn gốc minh bạch và chất lượng đỉnh cao.
            </p>
            <ul class="contact-list">
              <li><strong>Địa chỉ:</strong> Hiệp Bình Chánh, Tp HCM</li>
              <li><strong>Hotline:</strong> <span class="highlight-text">1900 6868</span> (8h00 - 18h30)</li>
              <li><strong>Email:</strong> maithiyeenhi@gmail.com</li>
            </ul>
            <div class="social-icons">
              <a href="#" class="social-icon fb-icon" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              <a href="#" class="social-icon zalo-icon" aria-label="Zalo">
                <span style="font-size: 10px; font-weight: bold; color: white;">Zalo</span>
              </a>
              <a href="#" class="social-icon gmail-icon" aria-label="Gmail">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2.5 5.5l9.5 7 9.5-7v13H2.5v-13z" fill="#ea4335"/><path d="M21.5 5.5l-9.5 7-9.5-7" stroke="#4285f4" stroke-width="2"/><path d="M2.5 18.5V5.5l9.5 7" stroke="#34a853" stroke-width="2"/><path d="M21.5 18.5V5.5l-9.5 7" stroke="#fbbc04" stroke-width="2"/></svg>
              </a>
            </div>
          </div>

          <!-- Cột 2: Về Novix -->
          <div class="footer-col">
            <h4 class="footer-heading">Về Novix</h4>
            <ul class="footer-links">
              <li><a href="#">Giới thiệu thương hiệu</a></li>
              <li><a href="#">Tuyển dụng nhân tài</a></li>
              <li><a href="#">Đặc quyền Hội viên VIP</a></li>
              <li><a href="#">Khách hàng doanh nghiệp (B2B)</a></li>
            </ul>
          </div>

          <!-- Cột 3: Chính sách & Hỗ trợ -->
          <div class="footer-col">
            <h4 class="footer-heading">Chính sách & Hỗ trợ</h4>
            <ul class="footer-links">
              <li><a href="#">Bảo hành 1 đổi 1 trong 30 ngày</a></li>
              <li><a href="#">Chính sách giao nhanh 2H</a></li>
              <li><a href="#">Bảo mật thông tin khách hàng</a></li>
              <li><a href="#">Điều khoản & Điều kiện sử dụng</a></li>
              <li><a href="#">Hướng dẫn trả góp lãi suất 0%</a></li>
            </ul>
          </div>

          <!-- Cột 4: Phương thức thanh toán & Newsletter -->
          <div class="footer-col payment-col">
            <h4 class="footer-heading">Phương thức thanh toán</h4>
            
            <!-- Newsletter Form -->
            <form class="newsletter-form" onsubmit="event.preventDefault()">
              <input type="email" placeholder="Nhập email của bạn..." required>
              <button type="submit">Gửi</button>
            </form>

            <h5 class="sub-heading">Phương thức thanh toán an toàn</h5>
            <div class="payment-badges">
              <span class="badge-tag">VISA</span>
              <span class="badge-tag">MasterCard</span>
              <span class="badge-tag">MoMo</span>
              <span class="badge-tag">VNPAY-QR</span>
              <span class="badge-tag">COD</span>
            </div>

            <div class="trust-badges">
              <span class="badge-tag trust-tag">Đã đăng ký Bộ Công Thương</span>
              <span class="badge-tag secure-tag">🔒 SSL 256-bit</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="container footer-bottom-inner">
          <p class="copyright">© 2026 Novix Vietnam Co., Ltd. Tất cả các quyền được bảo lưu.</p>
          <div class="bottom-links">
            <a href="#">Quy chế hoạt động</a>
            <a href="#">Giải quyết khiếu nại</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}