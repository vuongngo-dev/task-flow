// --- CÀI ĐẶT TOÀN CỤC (CHẠY Ở MỌI TRANG) ---
// Script này tự động áp dụng giao diện (Dark/Light) từ localStorage
// hoặc từ cài đặt hệ thống của trình duyệt

(function applyTheme() {
    // Ưu tiên 1: Người dùng đã tự chọn trong Cài đặt
    const savedTheme = localStorage.getItem('taskflow_theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        return;
    }
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        return;
    }
    // Ưu tiên 2: Theo cài đặt hệ thống (prefers-color-scheme)
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();