document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const cartContainer = document.getElementById('cart-list');

  // Kiểm tra đăng nhập
  if (!user) {
    renderEmptyCart("Vui lòng đăng nhập để xem giỏ hàng của bạn.");
    return;
  }

  const userId = user.email;
  const cartKey = `cart_${userId}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (cart.length === 0) {
    renderEmptyCart("Giỏ hàng của bạn đang trống.");
    return;
  }

  // Mặc định cho tất cả sản phẩm đều được tick chọn khi mới vào
  cart = cart.map(item => ({ ...item, selected: true }));

  // Render HTML Danh sách sản phẩm
  function renderCart() {
    if (cart.length === 0) {
      renderEmptyCart("Giỏ hàng của bạn đang trống.");
      localStorage.setItem(cartKey, JSON.stringify([]));
      updateTotals();
      return;
    }

    cartContainer.innerHTML = cart.map((item, index) => {
      const priceFmt = new Intl.NumberFormat('vi-VN').format(item.price) + 'đ';
      const oldPrice = new Intl.NumberFormat('vi-VN').format(item.price * 1.25) + 'đ';
      const totalFmt = new Intl.NumberFormat('vi-VN').format(item.price * item.quantity) + 'đ';
      
      return `
        <div class="cart-item">
          <div class="col-checkbox">
            <input type="checkbox" class="item-checkbox" data-index="${index}" ${item.selected ? 'checked' : ''}>
            <div class="item-info">
              <div class="item-img">
                <span class="item-badge">-25%</span>
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="item-details">
                <span class="item-category">Sản phẩm công nghệ</span>
                <h4><a href="detail.html?id=${item.id}" style="color:inherit; text-decoration:none;">${item.name}</a></h4>
                <span class="item-variant">Bản tiêu chuẩn</span>
                <span class="item-warranty">Bảo hành: 12T chính hãng</span>
              </div>
            </div>
          </div>
          
          <div class="col-price">
            <span class="price-current">${priceFmt}</span>
            <span class="price-old">${oldPrice}</span>
          </div>
          
          <div class="col-qty">
            <div class="qty-selector">
              <button class="qty-btn btn-decrease" data-index="${index}"><i class="fa-solid fa-minus"></i></button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly>
              <button class="qty-btn btn-increase" data-index="${index}"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
          
          <div class="col-total">
            <span class="total-price">${totalFmt}</span>
            <button class="btn-remove-item" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      `;
    }).join('');

    bindCartEvents();
    updateTotals();
  }

  // Hàm gắn sự kiện cho các nút trong giỏ hàng
  function bindCartEvents() {
    // Tăng số lượng
    document.querySelectorAll('.btn-increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.dataset.index;
        cart[idx].quantity += 1;
        saveAndRender();
      });
    });

    // Giảm số lượng
    document.querySelectorAll('.btn-decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.dataset.index;
        if (cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
          saveAndRender();
        }
      });
    });

    // Xóa từng sản phẩm
    document.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.dataset.index;
        cart.splice(idx, 1);
        saveAndRender();
      });
    });

    // Checkbox từng item
    document.querySelectorAll('.item-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const idx = e.target.dataset.index;
        cart[idx].selected = e.target.checked;
        
        // Cập nhật trạng thái check-all
        const allChecked = cart.every(item => item.selected);
        document.getElementById('check-all').checked = allChecked;
        
        updateTotals();
      });
    });
  }

  // Checkbox Chọn tất cả
  document.getElementById('check-all').addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    cart = cart.map(item => ({ ...item, selected: isChecked }));
    
    document.querySelectorAll('.item-checkbox').forEach(chk => chk.checked = isChecked);
    updateTotals();
  });

  // Xóa tất cả sản phẩm đã chọn
  document.getElementById('btn-delete-selected').addEventListener('click', () => {
    cart = cart.filter(item => !item.selected);
    saveAndRender();
  });

  // Áp dụng Voucher (Mô phỏng cứng mã TECH2025)
  let discountApplied = false;
  document.getElementById('btn-apply-voucher').addEventListener('click', () => {
    const code = document.getElementById('voucher-input').value.trim().toUpperCase();
    if (code === 'TECH2025') {
      discountApplied = true;
      document.getElementById('applied-voucher').classList.remove('hidden');
      document.getElementById('discount-row').classList.remove('hidden');
      document.getElementById('voucher-input').value = '';
      updateTotals();
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  });

  // Xóa Voucher
  document.getElementById('btn-remove-voucher').addEventListener('click', () => {
    discountApplied = false;
    document.getElementById('applied-voucher').classList.add('hidden');
    document.getElementById('discount-row').classList.add('hidden');
    updateTotals();
  });

  // Tính toán Tổng Tiền
  function updateTotals() {
    const selectedItems = cart.filter(item => item.selected);
    const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = (discountApplied && subtotal > 0) ? 100000 : 0;
    const total = Math.max(0, subtotal - discount);
    const points = Math.floor(total * 0.005); // Tích lũy 0.5%

    // Cập nhật DOM
    document.getElementById('bc-cart-count').textContent = `${cart.length} sản phẩm`;
    document.getElementById('selected-count').textContent = selectedCount;
    document.getElementById('sum-count').textContent = selectedCount;
    document.getElementById('checkout-count').textContent = selectedCount;
    
    document.getElementById('sum-subtotal').textContent = new Intl.NumberFormat('vi-VN').format(subtotal) + 'đ';
    document.getElementById('sum-discount').textContent = '-' + new Intl.NumberFormat('vi-VN').format(discount) + 'đ';
    document.getElementById('sum-total').textContent = new Intl.NumberFormat('vi-VN').format(total) + 'đ';
    document.getElementById('sum-points').textContent = `+${new Intl.NumberFormat('vi-VN').format(points)} điểm`;

    // Khóa nút thanh toán nếu không chọn SP nào
    const btnCheckout = document.getElementById('btn-checkout');
    if (selectedCount === 0) {
      btnCheckout.disabled = true;
    } else {
      btnCheckout.disabled = false;
    }
  }

  // Lưu lại vào LocalStorage & Render lại (loại bỏ key 'selected' để không bị rác DB)
  function saveAndRender() {
    const cartToSave = cart.map(item => {
      const { selected, ...rest } = item;
      return rest;
    });
    localStorage.setItem(cartKey, JSON.stringify(cartToSave));
    
    // Cập nhật số lượng trên Header
    const appHeader = document.getElementById('app-header');
    if (appHeader) {
      const cartBadge = document.querySelector('.badge-orange');
      if (cartBadge) {
        cartBadge.textContent = cartToSave.reduce((sum, item) => sum + item.quantity, 0);
      }
    }
    
    renderCart();
  }

  function renderEmptyCart(message) {
    document.getElementById('bc-cart-count').textContent = `0 sản phẩm`;
    cartContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <i class="fa-solid fa-cart-shopping fa-3x" style="color: #cbd5e1; margin-bottom: 16px;"></i>
        <h3 style="color: #475569; margin-bottom: 24px;">${message}</h3>
        <a href="products.html" style="background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Khám phá ngay</a>
      </div>
    `;
    updateTotals(); // reset về 0
  }

  // Gọi lần đầu
  renderCart();
});