import { ProductCard } from '../components/ProductCard.js';

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 8; // Hiển thị 8 sản phẩm/trang theo thiết kế

document.addEventListener('DOMContentLoaded', async () => {
  const productsGrid = document.getElementById('products-grid');
  
  try {
    // 1. Lấy dữ liệu API
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) throw new Error('Không thể tải dữ liệu');
    
    allProducts = await response.json();
    filteredProducts = [...allProducts]; // Khởi tạo mảng hiển thị

    // 2. Render lần đầu
    applyFilters();
    
    // 3. Gắn sự kiện cho các bộ lọc
    bindFilterEvents();

  } catch (error) {
    console.error(error);
    productsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-triangle-exclamation fa-2x" style="color:#ef4444; margin-bottom:12px;"></i>
        <p>Lỗi kết nối JSON Server. Đảm bảo bạn đã chạy <b>json-server --watch db.json</b></p>
      </div>`;
  }
});

// Hàm gắn sự kiện lắng nghe bộ lọc
function bindFilterEvents() {
  // Tìm kiếm Text
  document.getElementById('filter-search').addEventListener('input', applyFilters);

  // Danh mục (Radio)
  document.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener('change', applyFilters);
  });

  // Giá (Radio)
  document.querySelectorAll('input[name="price"]').forEach(radio => {
    radio.addEventListener('change', applyFilters);
  });

  // Sắp xếp (Select)
  document.getElementById('sort-select').addEventListener('change', applyFilters);

  // Nút xóa bộ lọc
  document.getElementById('btn-clear-filters').addEventListener('click', () => {
    document.getElementById('filter-search').value = '';
    document.querySelector('input[name="category"][value="all"]').checked = true;
    document.querySelector('input[name="price"][value="all"]').checked = true;
    document.getElementById('sort-select').value = 'default';
    applyFilters();
  });

  // =========================================================
  // XỬ LÝ ẨN/HIỆN THU GỌN (ACCORDION TOGGLE) CHO TIÊU ĐỀ LỌC
  // =========================================================
  document.querySelectorAll('.filter-title').forEach(title => {
    title.style.cursor = 'pointer'; // Tạo hiệu ứng con trỏ tay
    title.addEventListener('click', function () {
      const group = this.closest('.filter-group');
      group.classList.toggle('collapsed');
    });
  });
}

// Hàm thực thi Lọc & Sắp xếp mảng
function applyFilters() {
  const searchTerm = document.getElementById('filter-search').value.toLowerCase();
  const activeCategory = document.querySelector('input[name="category"]:checked').value;
  const activePrice = document.querySelector('input[name="price"]:checked').value;
  const sortOption = document.getElementById('sort-select').value;

  // 1. Lọc theo Keyword & Category
  filteredProducts = allProducts.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm);
    const matchCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchSearch && matchCategory;
  });

  // 2. Lọc theo Khoảng giá
  filteredProducts = filteredProducts.filter(product => {
    if (activePrice === 'under-1m') return product.price < 1000000;
    if (activePrice === '1m-5m') return product.price >= 1000000 && product.price <= 5000000;
    if (activePrice === 'over-5m') return product.price > 5000000;
    return true; // all
  });

  // 3. Sắp xếp mảng
  if (sortOption === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Cập nhật nhãn trạng thái lọc trên Toolbar
  let labelText = document.querySelector('input[name="category"]:checked').nextElementSibling.textContent;
  document.getElementById('current-filter-label').textContent = labelText;

  // Reset về trang 1 và Render
  currentPage = 1;
  renderGrid();
}

// Hàm tính toán Phân trang & Render ra HTML
function renderGrid() {
  const productsGrid = document.getElementById('products-grid');
  const paginationControls = document.getElementById('pagination-controls');
  const paginationInfo = document.getElementById('pagination-info');

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-box-open fa-2x" style="margin-bottom:12px;"></i>
        <p>Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
      </div>`;
    paginationControls.innerHTML = '';
    paginationInfo.textContent = 'Trang 0 trên 0 • Tổng số 0 sản phẩm';
    return;
  }

  // Lấy danh sách Wishlist từ LocalStorage để highlight trái tim
  const user = JSON.parse(localStorage.getItem('currentUser'));
  let wishlist = [];
  if (user) {
    wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];
  }

  // Tính toán vị trí cắt mảng cho Trang hiện tại
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  // Render Danh sách
  productsGrid.innerHTML = currentItems.map(item => ProductCard(item, wishlist.includes(item.id))).join('');

  // Render Phân trang
  paginationInfo.textContent = `Trang ${currentPage} trên ${totalPages} • Tổng số ${filteredProducts.length} sản phẩm`;
  
  let pgHTML = '';
  // Nút Prev
  pgHTML += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})"><i class="fa-solid fa-chevron-left"></i></button>`;
  // Các nút số
  for (let i = 1; i <= totalPages; i++) {
    pgHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
  }
  // Nút Next
  pgHTML += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})"><i class="fa-solid fa-chevron-right"></i></button>`;
  
  paginationControls.innerHTML = pgHTML;
}

// Bộc lộ hàm changePage ra biến toàn cục để gắn vào thuộc tính onclick của chuỗi HTML
window.changePage = function(page) {
  currentPage = page;
  renderGrid();
  // Cuộn mượt mà lên đầu danh sách sản phẩm
  document.querySelector('.store-layout').scrollIntoView({ behavior: 'smooth' });
}