document.addEventListener('DOMContentLoaded', () => {
  // 1. Logic chuyển đổi Tab (Đăng Nhập / Đăng Ký)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.auth-form');
  const heading = document.getElementById('auth-heading');
  const subHeading = document.getElementById('auth-subheading');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Đổi màu nút active
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Ẩn hiện Form
      const target = btn.getAttribute('data-target');
      forms.forEach(f => f.classList.remove('active'));
      document.getElementById(`${target}-form`).classList.add('active');

      // Đổi tiêu đề
      if (target === 'login') {
        heading.textContent = 'Chào mừng bạn quay lại!';
        subHeading.textContent = 'Đăng nhập tài khoản để nhận ưu đãi cá nhân và theo dõi đơn hàng';
      } else {
        heading.textContent = 'Tạo tài khoản mới!';
        subHeading.textContent = 'Trở thành hội viên Novix để nhận đặc quyền ngay hôm nay';
      }
    });
  });

  // 2. Logic Ẩn/Hiện mật khẩu
  const toggleIcons = document.querySelectorAll('.toggle-password');
  toggleIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        this.classList.replace('fa-eye-slash', 'fa-eye');
      } else {
        input.type = 'password';
        this.classList.replace('fa-eye', 'fa-eye-slash');
      }
    });
  });

  // 3. Hàm hỗ trợ Validate Form
  const showError = (input, message) => {
    const group = input.closest('.input-group');
    group.classList.add('error');
    group.querySelector('.error-msg').textContent = message;
  };

  const clearError = (input) => {
    const group = input.closest('.input-group');
    group.classList.remove('error');
    group.querySelector('.error-msg').textContent = '';
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 4. Xử lý ĐĂNG KÝ
  const registerForm = document.getElementById('register-form');
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Chống reload trang

    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const passInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm');
    
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) { showError(nameInput, 'Vui lòng nhập họ và tên'); isValid = false; } 
    else { clearError(nameInput); }

    // Validate Email
    if (!validateEmail(emailInput.value)) { showError(emailInput, 'Email không hợp lệ'); isValid = false; } 
    else { clearError(emailInput); }

    // Validate Password
    if (passInput.value.length < 6) { showError(passInput, 'Mật khẩu phải tối thiểu 6 ký tự'); isValid = false; } 
    else { clearError(passInput); }

    // Validate Confirm Password
    if (confirmInput.value !== passInput.value) { showError(confirmInput, 'Mật khẩu nhập lại không khớp'); isValid = false; } 
    else if (!confirmInput.value) { showError(confirmInput, 'Vui lòng xác nhận mật khẩu'); isValid = false; }
    else { clearError(confirmInput); }

    // Nếu hợp lệ -> Lưu vào LocalStorage
    if (isValid) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const isExist = users.some(u => u.email === emailInput.value);

      if (isExist) {
        showError(emailInput, 'Email này đã được đăng ký');
      } else {
        // Lưu user mới
        users.push({ name: nameInput.value, email: emailInput.value, password: passInput.value });
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Đăng ký thành công! Đang chuyển sang Đăng nhập...');
        // Chuyển tab sang đăng nhập
        document.querySelector('.tab-btn[data-target="login"]').click();
        document.getElementById('login-email').value = emailInput.value;
        registerForm.reset();
      }
    }
  });

  // 5. Xử lý ĐĂNG NHẬP
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    let isValid = true;

    if (!emailInput.value.trim()) { showError(emailInput, 'Vui lòng nhập email'); isValid = false; } else { clearError(emailInput); }
    if (!passInput.value.trim()) { showError(passInput, 'Vui lòng nhập mật khẩu'); isValid = false; } else { clearError(passInput); }

    if (isValid) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const validUser = users.find(u => u.email === emailInput.value && u.password === passInput.value);

      if (validUser) {
        // Lưu phiên đăng nhập
        localStorage.setItem('currentUser', JSON.stringify({ name: validUser.name, email: validUser.email }));
        window.location.href = 'index.html'; // Điều hướng về trang chủ
      } else {
        showError(passInput, 'Email hoặc mật khẩu không chính xác');
      }
    }
  });
});