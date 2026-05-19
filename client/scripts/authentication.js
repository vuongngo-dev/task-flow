// ============================================================
// FILE: authentication.js
// DESCRIPTION: Xử lý xác thực người dùng cho web tĩnh
//              Dữ liệu lưu hoàn toàn trong localStorage
// ============================================================

// Key lưu trữ trong localStorage
const KEY_USERS    = 'taskflow_users';    // Danh sách tài khoản đã đăng ký
const KEY_SESSION  = 'taskflow_session';  // Phiên đăng nhập hiện tại

// ----- Công cụ nội bộ -----

// Lấy danh sách tài khoản đã đăng ký
function getUsers() {
    return JSON.parse(localStorage.getItem(KEY_USERS) || '[]');
}

// Lưu danh sách tài khoản
function saveUsers(users) {
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
}

// ----- API xác thực -----

/**
 * Đăng ký tài khoản mới
 * @returns { ok: boolean, error?: string }
 */
function registerUser(username, password, confirmPassword) {
    // Kiểm tra các trường bắt buộc
    if (!username || !password || !confirmPassword) {
        return { ok: false, error: 'Vui lòng điền đầy đủ thông tin.' };
    }
    if (username.length < 3) {
        return { ok: false, error: 'Tên đăng nhập phải có ít nhất 3 ký tự.' };
    }
    if (password.length < 6) {
        return { ok: false, error: 'Mật khẩu phải có ít nhất 6 ký tự.' };
    }
    if (password !== confirmPassword) {
        return { ok: false, error: 'Mật khẩu xác nhận không khớp.' };
    }

    const users = getUsers();

    // Kiểm tra tên đăng nhập đã tồn tại chưa
    const exists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
        return { ok: false, error: 'Tên đăng nhập đã được sử dụng.' };
    }

    // Tạo tài khoản mới
    const newUser = {
        id: 'user-' + Date.now(),
        username: username.trim(),
        password: password, // Web tĩnh không có server → không hash được, chấp nhận plain text
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);

    return { ok: true, user: { id: newUser.id, username: newUser.username } };
}

/**
 * Đăng nhập
 * @returns { ok: boolean, error?: string }
 */
function loginUser(username, password) {
    if (!username || !password) {
        return { ok: false, error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' };
    }

    const users = getUsers();
    const user = users.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (!user) {
        return { ok: false, error: 'Sai tên đăng nhập hoặc mật khẩu.' };
    }

    // Lưu phiên đăng nhập
    const session = {
        userId: user.id,
        username: user.username,
        loginAt: new Date().toISOString()
    };
    localStorage.setItem(KEY_SESSION, JSON.stringify(session));

    return { ok: true, user: { id: user.id, username: user.username } };
}

/**
 * Đăng xuất — xóa phiên hiện tại
 */
function logoutUser() {
    localStorage.removeItem(KEY_SESSION);
}

/**
 * Kiểm tra xem người dùng đang đăng nhập không
 * @returns { loggedIn: boolean, user?: object }
 */
function getCurrentSession() {
    const session = localStorage.getItem(KEY_SESSION);
    if (!session) return { loggedIn: false };
    return { loggedIn: true, user: JSON.parse(session) };
}

/**
 * Bảo vệ trang — nếu chưa đăng nhập thì chuyển về login
 * Gọi hàm này ở đầu các trang yêu cầu xác thực (như dashboard)
 * @param {string} redirectPath - Đường dẫn trang login
 */
function requireAuth(redirectPath) {
    const { loggedIn } = getCurrentSession();
    if (!loggedIn) {
        window.location.href = redirectPath || '../pages/login.html';
    }
}

// Export ra window để các trang khác dùng được
window.Auth = {
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    getSession: getCurrentSession,
    requireAuth: requireAuth
};